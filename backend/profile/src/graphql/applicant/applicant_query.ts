import {Inject, Singleton} from "typescript-ioc";
import {ApplicantRequestQuery} from "./applicant_request_query";

@Singleton
export class ApplicantQuery {

  constructor (
    @Inject public readonly request: ApplicantRequestQuery
  ) {}

}
