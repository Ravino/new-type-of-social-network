import {Inject, Singleton} from "typescript-ioc";
import {BackofficeQuestionQuery} from "./backoffice_question_query";
import {BackofficeProcedureQuery} from "./backoffice_procedure_query";

@Singleton
export class BackofficeQuestionnaireQuery {

    constructor(
        @Inject public readonly question: BackofficeQuestionQuery,
        @Inject public readonly procedure: BackofficeProcedureQuery
    ) {}

}
