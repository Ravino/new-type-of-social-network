import {Singleton, Inject} from "typescript-ioc";
import {encode, decode} from "js-base64";
import {mergeAsync, mergeListAsync} from "../../mapping/mapping";

import {OivCursor} from "../../view/backoffice/oiv_cursor";

import {BackofficeExecutiveAuthority, BackofficeExecutiveAuthorityList} from "../../view/backoffice/backoffice_executive_authority";
import {ExecutiveAuthorityService} from "../../service/executive_authority_service";
import {mappingExecutiveAuthorityEntityToBackofficeExecutiveAuthority} from "../../mapping/backoffice/backoffice_executive_authority_mapping";


@Singleton
export class BackofficeExecutiveAuthorityQuery {

    constructor(
       @Inject private readonly executiveAuthorityService: ExecutiveAuthorityService
    ) {}

    private createCursor (name: string, size: number) : string {
        const cursor = <OivCursor> {
            name,
            size
        }
        return encode(JSON.stringify(cursor));
    }

    private async getListPrivate(searchName: string, searchSize: number, offset: number = 0): Promise<BackofficeExecutiveAuthorityList> {

        const total = await this.executiveAuthorityService.countOivs(searchName);

        const itemsListAsync = this.executiveAuthorityService.getList(searchName, searchSize, offset);
        const items = await mergeListAsync(itemsListAsync, mappingExecutiveAuthorityEntityToBackofficeExecutiveAuthority)

        return {
            cursor: this.createCursor(searchName, searchSize),
            total,
            items
        }
    }

    public get(id: string): Promise<BackofficeExecutiveAuthority> {
        const oiv = this.executiveAuthorityService.get(parseInt(id));

        return mergeAsync(oiv, mappingExecutiveAuthorityEntityToBackofficeExecutiveAuthority);
    }

    public list(name?: string, size?: number): Promise<BackofficeExecutiveAuthorityList> {
        const searchName = name || '';
        const searchSize = size || 20;

        return this.getListPrivate(searchName, searchSize);
    }

    public select(cursorString: string, offset: number): Promise<BackofficeExecutiveAuthorityList> {
        const cursor: OivCursor = JSON.parse(decode(cursorString));

        return this.getListPrivate(<string>cursor.name, <number>cursor.size, offset);
    }
}
