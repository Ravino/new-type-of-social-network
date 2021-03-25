import {Inject, Singleton} from "typescript-ioc";
import {RequestProcedureService} from "../../service/request_procedure_service";
import {BackofficeRequestProcedure, BackofficeRequestProcedureStatus} from "../../view/backoffice/backoffice_request_procedure";
import {RequestProcedureStateEnumEntity} from "../../model/request_procedure_entity";
import {mergeTypedAsync} from "../../mapping/mapping";
import {mappingRequestProcedureEntityToBackofficeRequestProcedureView} from "../../mapping/backoffice/backoffice_request_procedure_mapping";

@Singleton
export class BackofficeRequestProcedureIncomingMutation {

    public constructor(@Inject private readonly requestProcedureService: RequestProcedureService) {
    }

    public async assignInboxAndMark(id: string, inboxId: string, status: BackofficeRequestProcedureStatus): Promise<BackofficeRequestProcedure> {
        await this.requestProcedureService.assignInboxAndMark(Number(id), Number(inboxId), RequestProcedureStateEnumEntity[status]);
        return await mergeTypedAsync(this.requestProcedureService.get(Number(id)), BackofficeRequestProcedure, mappingRequestProcedureEntityToBackofficeRequestProcedureView);
    }

    public async mark(id: string, status: BackofficeRequestProcedureStatus): Promise<BackofficeRequestProcedure> {
        await this.requestProcedureService.mark(Number(id), RequestProcedureStateEnumEntity[status]);
        return await mergeTypedAsync(this.requestProcedureService.get(Number(id)), BackofficeRequestProcedure, mappingRequestProcedureEntityToBackofficeRequestProcedureView);
    }

}
