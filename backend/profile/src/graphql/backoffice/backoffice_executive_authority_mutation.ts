import {Singleton, Inject} from "typescript-ioc";
import {BackofficeExecutiveAuthority} from "../../view/backoffice/backoffice_executive_authority";
import {ExecutiveAuthorityService} from "../../service/executive_authority_service";
import {mappingExecutiveAuthorityEntityToBackofficeExecutiveAuthority} from "../../mapping/backoffice/backoffice_executive_authority_mapping";
import {OivEntity} from "../../model/oiv_entity";
import {mappingBackofficeExecutiveAuthorityToExecutiveAuthorityEntity} from "../../mapping/backoffice/backoffice_executive_authority_mapping";
import {merge} from "object-mapper";
import {mergeAsync} from "../../mapping/mapping";

@Singleton
export class BackofficeExecutiveAuthorityMutation {

    constructor(
        @Inject private readonly executiveAuthorityService: ExecutiveAuthorityService
    ) {}

    public create(executiveAuthority: BackofficeExecutiveAuthority): Promise<BackofficeExecutiveAuthority> {
        const oivEntity = merge(executiveAuthority, mappingBackofficeExecutiveAuthorityToExecutiveAuthorityEntity);

        const createdExecutiveAuthority = this.executiveAuthorityService.create(<OivEntity>oivEntity);

        return mergeAsync(createdExecutiveAuthority, mappingExecutiveAuthorityEntityToBackofficeExecutiveAuthority);
    }

    public update(executiveAuthority: BackofficeExecutiveAuthority): Promise<BackofficeExecutiveAuthority> {
        const id = parseInt(<string>executiveAuthority.id);
        const oivEntity = merge(executiveAuthority, mappingBackofficeExecutiveAuthorityToExecutiveAuthorityEntity);

        const updatedExecutiveAuthority = this.executiveAuthorityService.update(id, <OivEntity>oivEntity);

        return mergeAsync(updatedExecutiveAuthority, mappingExecutiveAuthorityEntityToBackofficeExecutiveAuthority);
    }

    public delete(id: string): Promise<boolean> {
        return this.executiveAuthorityService.delete(parseInt(id));
    }

}
