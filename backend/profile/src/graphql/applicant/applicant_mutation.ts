import {Inject, Singleton} from 'typescript-ioc';
import {ApplicantRequestMutation} from "./applicant_request_mutation";
import {ApplicantQuestionnaireMutation} from "./applicant_questionnaire_mutation";


@Singleton
export class ApplicantMutation {

  constructor(
    @Inject public readonly request: ApplicantRequestMutation,
    @Inject public readonly questionnaire: ApplicantQuestionnaireMutation
  ) {}

}
