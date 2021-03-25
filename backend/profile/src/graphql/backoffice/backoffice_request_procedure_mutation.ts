import {Inject, Singleton} from "typescript-ioc";
import {BackofficeRequestProcedureModerationMutation} from "./backoffice_request_procedure_moderation_mutation";
import {BackofficeRequestProcedureIncomingMutation} from "./backoffice_request_procedure_incoming_mutation";

@Singleton
export class BackofficeRequestProcedureMutation {

    public constructor(@Inject public readonly incomingMutation: BackofficeRequestProcedureIncomingMutation,
                       @Inject public readonly moderationMutation: BackofficeRequestProcedureModerationMutation) {
    }

}
