import {Inject, Singleton} from "typescript-ioc";
import {BackofficeUserQuery} from "./backoffice_user_query";
import {BackofficeExecutiveAuthorityQuery} from "./backoffice_executive_authority_query";
import {BackofficeQuestionnaireQuery} from "./backoffice_questionnaire_query";
import {BackofficeReportQuery} from "./backoffice_report_query";
import {BackofficeRequestProcedureQuery} from "./backoffice_request_procedure_query";

@Singleton
export class BackofficeQuery {

    constructor(
        @Inject public readonly user: BackofficeUserQuery,
        @Inject public readonly executiveAuthority: BackofficeExecutiveAuthorityQuery,
        @Inject public readonly questionnaire: BackofficeQuestionnaireQuery,
        @Inject public readonly requestProcedure: BackofficeRequestProcedureQuery,
        @Inject public readonly report: BackofficeReportQuery
    ) {
    }

}
