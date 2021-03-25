import {Inject, Singleton} from "typescript-ioc";
import {BackofficeProcedure, BackofficeProcedureInput} from "../../view/backoffice/backoffice_procedure";
import {ProcedureService} from "../../service/procedure_service";
import {VersionService} from "../../service/version_service";
import {MOCK_USER_ID} from "../../mock";
import {Model} from "objection";
import {merge} from "object-mapper";
import {ProcedureEntity} from "../../model/procedure_entity";
import {
    mappingBackofficeProcedureInputViewToProcedureEntity,
    mappingProcedureEntityToBackofficeProcedureView
} from "../../mapping/backoffice/backoffice_procedure_mapping";
import {UserInputError} from "apollo-server-express";

@Singleton
export class BackofficeProcedureMutation {

    public constructor(@Inject private readonly procedureService: ProcedureService,
                       @Inject private readonly versionService: VersionService) {
    }


    public async create(procedure: BackofficeProcedureInput): Promise<BackofficeProcedure> {
        if (!procedure.rules || !procedure.rules.length) {
            throw new UserInputError("Procedure rules are required.");
        }
        if (procedure.rules.filter(x => !x.answers || !x.answers.length).length) {
            throw new UserInputError("Procedure rules should contain at least one answer.");
        }

        return Model.transaction(async tx => {
            let draftVersion = await this.versionService.getOrCreateDraft(MOCK_USER_ID, tx);

            let procedureEntity = merge(procedure, new ProcedureEntity(), mappingBackofficeProcedureInputViewToProcedureEntity);
            procedureEntity.versionId = draftVersion.id;
            procedureEntity = await this.procedureService.create(procedureEntity, tx);

            return merge(procedureEntity, mappingProcedureEntityToBackofficeProcedureView);
        });
    }

    public async update(procedure: BackofficeProcedureInput): Promise<BackofficeProcedure> {
        if (!procedure.rules || !procedure.rules.length) {
            throw new UserInputError("Procedure rules are required.");
        }
        if (procedure.rules.filter(x => !x.answers || !x.answers.length).length) {
            throw new UserInputError("Procedure rules should contain at least one answer.");
        }

        return Model.transaction(async tx => {
            let draftVersion = await this.versionService.getOrCreateDraft(MOCK_USER_ID, tx);

            let procedureEntity = await this.procedureService.get(Number(procedure.id), tx);
            if (procedureEntity.versionId != draftVersion.id) {
                throw new UserInputError("Could not find procedure.");
            }

            procedureEntity = merge(procedure, procedureEntity, mappingBackofficeProcedureInputViewToProcedureEntity);
            procedureEntity.versionId = draftVersion.id;
            procedureEntity = await this.procedureService.update(procedureEntity, tx);

            return merge(procedureEntity, mappingProcedureEntityToBackofficeProcedureView);
        });
    }

    public async delete(id: string): Promise<boolean> {
        let draftVersion = await this.versionService.getOrCreateDraft(MOCK_USER_ID);

        return await this.procedureService.remove(Number(id), draftVersion.id || 0);
    }

}
