import {Inject, Singleton} from "typescript-ioc";
import {BackofficeQuestionMutation} from "./backoffice_question_mutation";
import {BackofficeProcedureMutation} from "./backoffice_procedure_mutation";
import {VersionService} from "../../service/version_service";
import {MOCK_USER_ID} from "../../mock";

@Singleton
export class BackofficeQuestionnaireMutation {

    constructor(
        @Inject public readonly question: BackofficeQuestionMutation,
        @Inject public readonly procedure: BackofficeProcedureMutation,
        @Inject private readonly versionService: VersionService
    ) {}

    public publish(): Promise<boolean> {
        return this.versionService.publishDraft(MOCK_USER_ID);
    }
}
