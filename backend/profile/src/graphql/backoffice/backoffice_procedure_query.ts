import {Inject, Singleton} from "typescript-ioc";
import {BackofficeProcedure, BackofficeProcedureList, BackofficeStage} from "../../view/backoffice/backoffice_procedure";
import {ProcedureService} from "../../service/procedure_service";
import {mergeAsync, mergeListAsync} from "../../mapping/mapping";
import {mappingProcedureEntityToBackofficeProcedureView} from "../../mapping/backoffice/backoffice_procedure_mapping";
import {Base64} from "js-base64";
import {StageEnumEntity} from "../../model/stage_enum_entity";
import {VersionService} from "../../service/version_service";
import {MOCK_USER_ID} from "../../mock";

@Singleton
export class BackofficeProcedureQuery {

    public constructor(@Inject private readonly procedureService: ProcedureService,
                       @Inject private readonly versionService: VersionService) {
    }

    public async get(id: string): Promise<BackofficeProcedure> {
        await this.versionService.getOrCreateDraft(MOCK_USER_ID);

        return mergeAsync(this.procedureService.get(Number(id)), mappingProcedureEntityToBackofficeProcedureView);
    }

    public async list(q?: string, stage?: BackofficeStage, offset: number = 0, size: number = 20): Promise<BackofficeProcedureList> {
        let draftVersion = await this.versionService.getOrCreateDraft(MOCK_USER_ID);

        let request = {q, stage, size, versionId: draftVersion.id || 0};
        return this.listProcedures(request, offset);
    }

    public select(cursor: string, offset: number): BackofficeProcedureList {
        let request = JSON.parse(Base64.decode(cursor));
        return this.listProcedures(request, offset);
    }

    private listProcedures(request: {q?: string, stage?: BackofficeStage, size: number, versionId: number}, offset: number): BackofficeProcedureList {
        return new BackofficeProcedureList(
            Base64.encode(JSON.stringify(request)),
            () => this.procedureService.count(request.q, request.stage ? StageEnumEntity[request.stage] : undefined, request.versionId),
            () => {
                let entities = this.procedureService.list(request.q, request.stage ? StageEnumEntity[request.stage] : undefined, offset, request.size, request.versionId);
                return mergeListAsync(entities, mappingProcedureEntityToBackofficeProcedureView);
            }
        );
    }

}
