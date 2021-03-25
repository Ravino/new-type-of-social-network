import {Singleton} from "typescript-ioc";
import {BackofficeUser, BackofficeUserInput} from "../../view/backoffice/backoffice_user";

@Singleton
export class BackofficeUserMutation {

    public create(user: BackofficeUserInput): BackofficeUser {
        return <BackofficeUser>{...user};
    }

    public update(user: BackofficeUserInput): BackofficeUser {
        return <BackofficeUser>{...user};
    }

    public delete(id: string): boolean {
        return true;
    }
}
