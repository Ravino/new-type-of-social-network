import {Inject, Singleton} from "typescript-ioc";
import {BackofficeInboxMessage, BackofficeRequestProcedure, BackofficeRequestProcedureList} from "../../view/backoffice/backoffice_request_procedure";
import {RequestProcedureService} from "../../service/request_procedure_service";
import {mergeAsync, mergeListTypedAsync} from "../../mapping/mapping";
import {
    mappingExecutiveAuthorityInboxEntityToBackofficeInboxMessageView,
    mappingRequestProcedureEntityToBackofficeRequestProcedureView
} from "../../mapping/backoffice/backoffice_request_procedure_mapping";
import {Base64} from "js-base64";
import {ExecutiveAuthorityInboxService} from "../../service/executive_authority_inbox_service";

@Singleton
export class BackofficeRequestProcedureQuery {

    public constructor(@Inject private readonly requestProcedureService: RequestProcedureService,
                       @Inject private readonly executiveAuthorityInboxService: ExecutiveAuthorityInboxService) {
    }

    public async get(id: string): Promise<BackofficeRequestProcedure> {
        return await mergeAsync(this.requestProcedureService.get(Number(id)), mappingRequestProcedureEntityToBackofficeRequestProcedureView);
    }

    public list(executiveAuthorityId?: string, inProgress?: boolean, size: number = 20, offset: number = 0): Promise<BackofficeRequestProcedureList> {
        const request = {
            executiveAuthorityId: executiveAuthorityId ? Number(executiveAuthorityId) : undefined,
            inProgress,
            size
        };

        return this.listRequestProcedures(request, offset);
    }

    public select(cursor: string, offset: number): Promise<BackofficeRequestProcedureList> {
        return this.listRequestProcedures(JSON.parse(Base64.decode(cursor)), offset);
    }

    private async listRequestProcedures(request: {executiveAuthorityId?: number, inProgress?: boolean, size: number}, offset: number): Promise<BackofficeRequestProcedureList> {
        return new BackofficeRequestProcedureList(
            Base64.encode(JSON.stringify(request)),
            (s, o) => mergeListTypedAsync(this.executiveAuthorityInboxService.listUnprocessed(request.executiveAuthorityId, s, o), BackofficeInboxMessage, mappingExecutiveAuthorityInboxEntityToBackofficeInboxMessageView),
            await this.executiveAuthorityInboxService.countUnprocessed(request.executiveAuthorityId),
            (s, o) => mergeListTypedAsync(this.requestProcedureService.list(request.executiveAuthorityId, request.inProgress, s, o), BackofficeRequestProcedure, mappingRequestProcedureEntityToBackofficeRequestProcedureView),
            await this.requestProcedureService.count(request.executiveAuthorityId, request.inProgress),
            request.size, offset
        );
    }

    public async getInbox(id: string): Promise<BackofficeInboxMessage> {
        return await mergeAsync(this.executiveAuthorityInboxService.get(Number(id)), mappingExecutiveAuthorityInboxEntityToBackofficeInboxMessageView);
    }
}
