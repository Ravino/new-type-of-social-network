import {Inject, Singleton} from "typescript-ioc";
import {BackofficeQuestion, BackofficeQuestionInput, BackofficeQuestionKind} from "../../view/backoffice/backoffice_question";
import {VersionService} from "../../service/version_service";
import {MOCK_USER_ID} from "../../mock";
import {QuestionService} from "../../service/question_service";
import {
    mappingBackofficeQuestionInputViewToQuestionEntity,
    mappingQuestionEntityToBackofficeQuestionView
} from "../../mapping/backoffice/backoffice_question_mapping";
import {merge} from "object-mapper";
import {QuestionEntity} from "../../model/question_entity";
import {Model} from "objection";
import {AnswerService} from "../../service/answer_service";
import {UserInputError} from "apollo-server-express";

@Singleton
export class BackofficeQuestionMutation {

    public constructor(@Inject private readonly versionService: VersionService,
                       @Inject private readonly questionService: QuestionService,
                       @Inject private readonly answerService: AnswerService) {
    }

    public async create(question: BackofficeQuestionInput): Promise<BackofficeQuestion> {
        if (question.kind == BackofficeQuestionKind.SINGLE_OPTION && (!question.answers || !question.answers.length)) {
            throw new UserInputError("Question should contain at least one answer.");
        }

        return Model.transaction(async tx => {
            let draftVersion = await this.versionService.getOrCreateDraft(MOCK_USER_ID, tx);

            let questionEntity = merge(question, new QuestionEntity(), mappingBackofficeQuestionInputViewToQuestionEntity);
            questionEntity.versionId = draftVersion.id;
            questionEntity = await this.questionService.create(questionEntity, tx);

            return merge(questionEntity, mappingQuestionEntityToBackofficeQuestionView);
        });
    }

    public update(question: BackofficeQuestionInput): Promise<BackofficeQuestion> {
        if (!question.id) {
            throw new UserInputError("The id field is required.");
        }
        if (question.kind == BackofficeQuestionKind.SINGLE_OPTION && (!question.answers || !question.answers.length)) {
            throw new UserInputError("Question should contain at least one answer.");
        }

        return Model.transaction(async tx => {
            let draftVersion = await this.versionService.getOrCreateDraft(MOCK_USER_ID, tx);

            let questionEntity = merge(question, new QuestionEntity(), mappingBackofficeQuestionInputViewToQuestionEntity);
            questionEntity.versionId = draftVersion.id;
            questionEntity = await this.questionService.update(questionEntity, tx);

            return merge(questionEntity, mappingQuestionEntityToBackofficeQuestionView);
        });
    }

    public async moveUp(id: string): Promise<boolean> {
        let draftVersion = await this.versionService.getOrCreateDraft(MOCK_USER_ID);

        return await this.questionService.moveDown(Number(id), draftVersion.id || 0);
    }

    public async moveDown(id: string): Promise<boolean> {
        let draftVersion = await this.versionService.getOrCreateDraft(MOCK_USER_ID);

        return await this.questionService.moveUp(Number(id), draftVersion.id || 0);
    }

    public async delete(id: string): Promise<boolean> {
        let draftVersion = await this.versionService.getOrCreateDraft(MOCK_USER_ID);

        return await this.questionService.removeById(Number(id), draftVersion.id || 0);
    }
}
