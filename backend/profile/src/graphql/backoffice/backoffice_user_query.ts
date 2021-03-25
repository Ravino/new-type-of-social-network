import {Singleton} from "typescript-ioc";
import {BackofficeUser, BackofficeUserList, BackofficeUserRole} from "../../view/backoffice/backoffice_user";

@Singleton
export class BackofficeUserQuery {

    public get(id: string): BackofficeUser {
        return <BackofficeUser> {
            id: "123",
            name: "Vasya Pupkin",
            email: "vasya.pupkin@gmail.com",
            role: BackofficeUserRole.APPLICANT,
            enabled: true
        };
    }

    public list(name?: string, size?: number): BackofficeUserList {
        return <BackofficeUserList> {
            cursor: "asasa",
            total: 123,
            items: [
                {
                    id: "123",
                    name: "Vasya Pupkin",
                    email: "vasya.pupkin@gmail.com",
                    role: BackofficeUserRole.APPLICANT,
                    enabled: true
                }
            ]
        }
    }

    public select(cursor: string, offset: number): BackofficeUserList {
        return this.list();
    }
}
