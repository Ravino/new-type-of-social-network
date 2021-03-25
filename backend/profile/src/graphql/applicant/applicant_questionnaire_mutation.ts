import {Singleton, Inject} from 'typescript-ioc';
import {ApplicantQuestion} from "../../view/applicant_question";
import {ApplicantRequest} from "../../view/applicant_request";

import {RequestService} from "../../service/request_service";
import {RequestAnswersService} from "../../service/request_answers_service";
import {VersionService} from "../../service/version_service";
import {QuestionService} from "../../service/question_service";
import {AnswerService} from "../../service/answer_service";
import {ApplicantQuestionKind} from "../../view/applicant_question_kind";
import {mergeAsync} from "../../mapping/mapping";
import {merge} from "object-mapper";

import {MOCK_USER_ID} from "../../mock";

import {mappingRequestEntityToApplicantRequestView} from "../../mapping/applicant/applicant_request_mapping";
import {mappingQuestionEntityToApplicantQuestionView} from "../../mapping/applicant/applicant_request_answer_mapping";

@Singleton
export class ApplicantQuestionnaireMutation {

  constructor (
      @Inject private readonly answerService: AnswerService,
      @Inject private readonly requestService: RequestService,
      @Inject private readonly requestAnswerService: RequestAnswersService,
      @Inject private readonly versionService: VersionService,
      @Inject private readonly questionService: QuestionService,
  ) {}

  public async start(): Promise<number> {
    const idVersion = await this. versionService. getLatestId (false);
    const idRequest = await this. requestService. create(idVersion);
    return idRequest;
  }

  public async next(id: string, qId?: string, answerId?: number, answer?: string): Promise<ApplicantQuestion|null> {
    const requestId = parseInt(id);

    let question: ApplicantQuestion;

    if (!qId) {
      // если не указан questionId, то получить и вернуть первый вопрос
      question = await this.questionService.getFirst(requestId);
    } else {
      // иначе - получить следующий вопрос
      const questionId = parseInt(<string>qId);

      // сначала сохранить ответ
      await this.requestAnswerService.save(requestId, questionId, answerId, answer);

      // и теперь получить следующий вопрос
      question = await this.questionService.getNext(requestId, questionId);
    }

    // если больше нет вопросов
    if (!question) {
      return null;
    }

    return merge(question, mappingQuestionEntityToApplicantQuestionView);
  }

  public async save(id: string, name: string): Promise<boolean> {
    // данный метод просто апдейтит имя
    const requestId = parseInt(id);

    await this.requestService.saveName(requestId, name);

    return Promise.resolve(true);
  }

  public build(id: string): Promise<ApplicantRequest> {

    const requestId = parseInt(id);

    return mergeAsync(this.requestService.buildData(requestId, MOCK_USER_ID),mappingRequestEntityToApplicantRequestView);
  }

}
