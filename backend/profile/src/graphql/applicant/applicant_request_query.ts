import {MOCK_USER_ID} from "../../mock";
import {Inject, Singleton} from "typescript-ioc";
import {decode, encode} from "js-base64";
import {RequestService} from "../../service/request_service";
import {mergeAsync, mergeListAsync} from "../../mapping/mapping";
import {mappingRequestEntityToApplicantRequestView} from "../../mapping/applicant/applicant_request_mapping";
import {ApplicantRequest} from "../../view/applicant_request";
import {ApplicantRequestList} from "../../view/applicant_request_list";
import {ApplicantCursor} from "../../view/applicant_cursor";


@Singleton
export class ApplicantRequestQuery {

    constructor(
        @Inject private readonly requestService: RequestService
    ) {
    }

    public async get(id: string): Promise<ApplicantRequest> {
        const entity = this.requestService.getById(Number(id), MOCK_USER_ID);
        const result = await mergeAsync(entity, mappingRequestEntityToApplicantRequestView);
        return result;
    }

    public async requests(name?: string, size?: number): Promise<ApplicantRequestList> {
        return await this.getList(name, size, 0, false, MOCK_USER_ID);
    }

    public async drafts(name?: string, size?: number): Promise<ApplicantRequestList> {
        return await this.getList(name, size, 0, true, MOCK_USER_ID);
    }

    public async select(cursor: string, offset: number): Promise<ApplicantRequestList> {

        const request = JSON.parse(decode(cursor));
        return await this.getList(request.name, request.size, offset, request.draft, MOCK_USER_ID);
    }

    private async createCursor(name: string, size: number, draft: boolean): Promise<string> {

        const cursorObj = <ApplicantCursor>{
            name: name,
            size: size,
            draft: draft
        };

        const cursorStr: string = JSON.stringify(cursorObj);
        const cursor: string = encode(cursorStr);

        return cursor;
    }

    private async getList(name: string = "", size: number = 20, offset: number, draft: boolean, idUser: number): Promise<ApplicantRequestList> {

        const cursor = await this.createCursor(name, size, draft);
        const count = () => this.requestService.count(name, draft, idUser);
        const items = () => {
            const result = this.requestService.getList(name, size, offset, draft, idUser);
            return mergeListAsync(result, mappingRequestEntityToApplicantRequestView);
        };

        const applicantRequestList = new ApplicantRequestList(
            cursor,
            count,
            items
        );

        return applicantRequestList;
    }
}
