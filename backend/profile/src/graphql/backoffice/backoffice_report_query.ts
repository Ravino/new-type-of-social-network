import {Inject, Singleton} from "typescript-ioc";
import {
    BackofficeReportProcedure,
    BackofficeReportRequestsByStatus,
    BackofficeReportRequestsByStatusCounts,
    BackofficeReportRequestsByStatusExecutiveAuthority,
    BackofficeReportRequestsByStatusProcedure,
    BackofficeReportRequestsByWaitTimeout,
    BackofficeReportRequestsByWaitTimeoutCounts,
    BackofficeReportRequestsByWaitTimeoutExecutiveAuthority,
    BackofficeReportRequestsByWaitTimeoutProcedure
} from "../../view/backoffice/backoffice_report";
import {ReportService} from "../../service/report_service";
import {BackofficeExecutiveAuthorityName} from "../../view/backoffice/backoffice_executive_authority";
import {RequestProcedureStateEnumEntity} from "../../model/request_procedure_entity";

@Singleton
export class BackofficeReportQuery {

    public constructor(@Inject private readonly reportService: ReportService) {
    }

    public async requestsByStatus(from?: string, to?: string): Promise<BackofficeReportRequestsByStatus> {
        const toNormal = this.addDays(this.fromGraphQLDate(to, new Date()), 1);
        const fromNormal = this.fromGraphQLDate(from, this.addDays(toNormal, -30));

        const data = await this.reportService.reportByStatus(fromNormal, toNormal);
        const totals = new BackofficeReportRequestsByStatusCounts();
        const items: BackofficeReportRequestsByStatusExecutiveAuthority[] = [];
        let currentExecutiveAuthority: BackofficeReportRequestsByStatusExecutiveAuthority | undefined;
        let currentProcedure: BackofficeReportRequestsByStatusProcedure | undefined;
        for (let dataItem of data) {
            if (!currentExecutiveAuthority || currentExecutiveAuthority.executiveAuthority?.id != dataItem.executiveAuthorityId.toString()) {
                currentExecutiveAuthority = new BackofficeReportRequestsByStatusExecutiveAuthority(
                    new BackofficeReportRequestsByStatusCounts(),
                    <BackofficeExecutiveAuthorityName> {id: dataItem.executiveAuthorityId.toString(), name: dataItem.executiveAuthority},
                    []
                )
                items.push(currentExecutiveAuthority);
            }
            if (!currentProcedure || currentProcedure.procedure?.code != dataItem.procedureCode) {
                currentProcedure = new BackofficeReportRequestsByStatusProcedure(
                    new BackofficeReportProcedure(dataItem.procedureCode, dataItem.procedureName),
                    new BackofficeReportRequestsByStatusCounts()
                )
                currentExecutiveAuthority.procedures.push(currentProcedure);
            }

            switch (dataItem.requestState) {
                case RequestProcedureStateEnumEntity.APPROVED:
                    currentProcedure.totals.approved += Number(dataItem.count);
                    currentExecutiveAuthority.totals.approved += Number(dataItem.count);
                    totals.approved += Number(dataItem.count);
                    break;
                case RequestProcedureStateEnumEntity.RETURNED:
                    currentProcedure.totals.returned += Number(dataItem.count);
                    currentExecutiveAuthority.totals.returned += Number(dataItem.count);
                    totals.returned += Number(dataItem.count);
                    break;
                case RequestProcedureStateEnumEntity.REJECTED:
                    currentProcedure.totals.rejected += Number(dataItem.count);
                    currentExecutiveAuthority.totals.rejected += Number(dataItem.count);
                    totals.rejected += Number(dataItem.count);
                    break;
            }
        }

        return new BackofficeReportRequestsByStatus(this.toGraphQLDate(fromNormal), this.toGraphQLDate(toNormal), totals, items);
    }

    public async requestsByWaitTimeout(from?: string, to?: string): Promise<BackofficeReportRequestsByWaitTimeout> {
        const toNormal = this.addDays(this.fromGraphQLDate(to, new Date()), 1);
        const fromNormal = this.fromGraphQLDate(from, this.addDays(toNormal, -30));

        const data = await this.reportService.reportByWaitTimeout(fromNormal, toNormal);

        const totals = new BackofficeReportRequestsByWaitTimeoutCounts();
        const items: BackofficeReportRequestsByWaitTimeoutExecutiveAuthority[] = [];
        let currentExecutiveAuthority: BackofficeReportRequestsByWaitTimeoutExecutiveAuthority | undefined;
        let currentProcedure: BackofficeReportRequestsByWaitTimeoutProcedure | undefined;
        for (let dataItem of data) {
            if (!currentExecutiveAuthority || currentExecutiveAuthority.executiveAuthority?.id != dataItem.executiveAuthorityId.toString()) {
                currentExecutiveAuthority = new BackofficeReportRequestsByWaitTimeoutExecutiveAuthority(
                    new BackofficeReportRequestsByWaitTimeoutCounts(),
                    <BackofficeExecutiveAuthorityName> {id: dataItem.executiveAuthorityId.toString(), name: dataItem.executiveAuthority},
                    []
                )
                items.push(currentExecutiveAuthority);
            }
            if (!currentProcedure || currentProcedure.procedure?.code != dataItem.procedureCode) {
                currentProcedure = new BackofficeReportRequestsByWaitTimeoutProcedure(
                    new BackofficeReportProcedure(dataItem.procedureCode, dataItem.procedureName),
                    new BackofficeReportRequestsByWaitTimeoutCounts()
                )
                currentExecutiveAuthority.procedures.push(currentProcedure);
            }

            currentProcedure.totals.min = currentProcedure.totals.count == 0 ? Number(dataItem.min) : Math.min(currentProcedure.totals.min, Number(dataItem.min));
            currentProcedure.totals.max = currentProcedure.totals.count == 0 ? Number(dataItem.max) : Math.max(currentProcedure.totals.max, Number(dataItem.max));
            currentProcedure.totals.sum += Number(dataItem.sum);
            currentProcedure.totals.count += Number(dataItem.count);

            currentExecutiveAuthority.totals.min = currentExecutiveAuthority.totals.count == 0 ? Number(dataItem.min) : Math.min(currentExecutiveAuthority.totals.min, Number(dataItem.min));
            currentExecutiveAuthority.totals.max = currentExecutiveAuthority.totals.count == 0 ? Number(dataItem.max) : Math.max(currentExecutiveAuthority.totals.max, Number(dataItem.max));
            currentExecutiveAuthority.totals.sum += Number(dataItem.sum);
            currentExecutiveAuthority.totals.count += Number(dataItem.count);

            totals.min = totals.count == 0 ? Number(dataItem.min) : Math.min(totals.min, Number(dataItem.min));
            totals.max = totals.count == 0 ? Number(dataItem.max) : Math.max(totals.max, Number(dataItem.max));
            totals.sum += Number(dataItem.sum);
            totals.count += Number(dataItem.count);
        }

        return new BackofficeReportRequestsByWaitTimeout(this.toGraphQLDate(fromNormal), this.toGraphQLDate(toNormal), totals, items);

    }

    private addDays(date: Date, days: number): Date {
        return new Date(date.getTime() + days * 24 * 3600 * 1000);
    }

    private fromGraphQLDate(value: string | undefined, def: Date): Date {
        let result;
        if (value) {
            const parts = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
            if (parts) {
                result = new Date(Number(parts[1]), Number(parts[2])-1, Number(parts[3]));
            }
        }
        if (!result) {
            result = def;
        }
        return result;
    }

    private toGraphQLDate(value: Date): string {
        const year = value.getFullYear();
        const month = value.getMonth() < 9 ? '0' + (value.getMonth() + 1)  : value.getMonth() + 1;
        const day = value.getDate() < 10 ? '0' + value.getDate() : value.getDate();
        return `${year}-${month}-${day}`;
    }

}
