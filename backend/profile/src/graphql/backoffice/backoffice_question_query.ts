import {Inject, Singleton} from "typescript-ioc";
import {BackofficeQuestion, BackofficeQuestionList} from "../../view/backoffice/backoffice_question";
import {QuestionService} from "../../service/question_service";
import {mappingQuestionEntityToBackofficeQuestionView} from "../../mapping/backoffice/backoffice_question_mapping";
import {mergeAsync, mergeListAsync} from "../../mapping/mapping";
import {UserInputError} from "apollo-server-express";
import {Base64} from "js-base64";
import {VersionService} from "../../service/version_service";
import {MOCK_USER_ID} from "../../mock";

@Singleton
export class BackofficeQuestionQuery {

    public constructor(
        @Inject private questionService: QuestionService,
        @Inject private versionService: VersionService
    ) {}

    public async get(id: string): Promise<BackofficeQuestion> {
        await this.versionService.getOrCreateDraft(MOCK_USER_ID);

        let entity = this.questionService.get(Number(id));
        return mergeAsync(entity, mappingQuestionEntityToBackofficeQuestionView, () => new UserInputError("Question not found."));
    }

    public async list(name?: string, beforeId?: string, offset: number = 0, size: number = 20): Promise<BackofficeQuestionList> {
        let draftVersion = await this.versionService.getOrCreateDraft(MOCK_USER_ID);

        let request = {
            name: name || undefined,
            beforeId: beforeId ? Number(beforeId) : undefined,
            size,
            versionId: draftVersion.id || 0
        };

        return this.listQuestions(request, offset);
    }

    public async select(cursor: string, offset: number): Promise<BackofficeQuestionList> {
        return this.listQuestions(JSON.parse(Base64.decode(cursor)), offset);
    }

    private listQuestions(request: { name?: string; beforeId?: number; size: number, versionId: number }, offset: number): BackofficeQuestionList {
        return new BackofficeQuestionList(
            Base64.encode(JSON.stringify(request)),
            () => this.questionService.count(request.name, request.beforeId, request.versionId),
            () => mergeListAsync(this.questionService.list(request.name, request.beforeId, offset, request.size, request.versionId), mappingQuestionEntityToBackofficeQuestionView)
        );
    }
}
