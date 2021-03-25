import {Inject, Singleton} from "typescript-ioc";
import {RequestProcedureService} from "../../service/request_procedure_service";
import {BackofficeRequestProcedure} from "../../view/backoffice/backoffice_request_procedure";
import {UserInputError} from "apollo-server-express";
import {mergeAsync} from "../../mapping/mapping";
import {mappingRequestProcedureEntityToBackofficeRequestProcedureView} from "../../mapping/backoffice/backoffice_request_procedure_mapping";

@Singleton
export class BackofficeRequestProcedureModerationMutation {

    public constructor(@Inject private readonly requestProcedureService: RequestProcedureService) {
    }

    public async return(id: string, notes?: string): Promise<BackofficeRequestProcedure> {
        try {
            await this.requestProcedureService.returnOnModeration(Number(id), notes);
        } catch (e) {
            if (typeof e == 'string') {
                throw new UserInputError(e);
            } else {
                throw e;
            }
        }
        return mergeAsync(this.requestProcedureService.get(Number(id)), mappingRequestProcedureEntityToBackofficeRequestProcedureView);
    }

    public async approve(id: string): Promise<BackofficeRequestProcedure> {
        try {
            await this.requestProcedureService.approveOnModeration(Number(id));
        } catch (e) {
            if (typeof e == 'string') {
                throw new UserInputError(e);
            } else {
                throw e;
            }
        }
        return mergeAsync(this.requestProcedureService.get(Number(id)), mappingRequestProcedureEntityToBackofficeRequestProcedureView);
    }
}
