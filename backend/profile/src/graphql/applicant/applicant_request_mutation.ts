import { MOCK_USER_ID } from "../../mock";
import { Singleton, Inject  } from "typescript-ioc";
import { ApplicantProcedureRequestFile } from "../../view/applicant_procedure_request_file";
import { ApplicantProcedureRequest } from "../../view/applicant_procedure_request";
import { ApplicantProcedureRequestInput } from "../../view/applicant_procedure_request_input";
import { RequestService } from "../../service/request_service";


@Singleton
export class ApplicantRequestMutation {

  constructor (
    @Inject private readonly requestService: RequestService
  ) {}


  public async delete (id: string): Promise<number> {
    return await this. requestService.delById(Number (id), MOCK_USER_ID);
  }


  public send (request: ApplicantProcedureRequestInput) {

    const procedureRequestFile = <ApplicantProcedureRequestFile> {
      id: 1,
      title: "Title",
      file: "file"
    };


    const procedureRequest = <ApplicantProcedureRequest> {
      id: "123",
      timeLeft: 123,
      requestedAt: new Date (),
      files: [procedureRequestFile],
      notes: "Примечание"
    };


    return procedureRequest;
  }
};
