import {Inject, Singleton} from "typescript-ioc";
import {BackofficeUserMutation} from "./backoffice_user_mutation";
import {BackofficeExecutiveAuthorityMutation} from "./backoffice_executive_authority_mutation";
import {BackofficeQuestionnaireMutation} from "./backoffice_questionnaire_mutation";
import {BackofficeRequestProcedureMutation} from "./backoffice_request_procedure_mutation";

@Singleton
export class BackofficeMutation {

    constructor(
        @Inject public readonly user: BackofficeUserMutation,
        @Inject public readonly executiveAuthority: BackofficeExecutiveAuthorityMutation,
        @Inject public readonly questionnaire: BackofficeQuestionnaireMutation,
        @Inject public readonly requestProcedure: BackofficeRequestProcedureMutation
    ) {}


}
