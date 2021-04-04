import { tarantool } from '../config/tarantool';
import { v4 as uuidV4 } from 'uuid';


export class SessionService {

  public async getByNameField(nameField: string, selector: string|number): Promise<any> {

    const params = [
      selector
    ];


    let sessionsList: any[] = [];
    try {
      sessionsList = await tarantool.sql(`select * from sessions where ${ nameField } = ?`, params);
    }
    catch(err) {
      console.log(err);
    }


    return sessionsList[0];
  }

  public async create(firstname: string, lastname: string, password: string, confirmed: boolean, email?: string|null, vkontakteProfileId?: number|null): Promise<any> {

    const currentAt: number = Date.now();
    const uuid: string = uuidV4();
    const displayName = `${ firstname } ${ lastname }`;


    const params = [
      email,
      firstname,
      lastname,
      displayName,
      currentAt,
      currentAt,
      password,
      uuid,
      confirmed,
      vkontakteProfileId
    ];


    let result: any = null;
    try {
      result = await tarantool.sql('insert into users (email, firstname, lastname, display_name, created_at, updated_at, password, uuid, confirmed, vkontakte_profile_id) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', params);
    }
    catch(err) {
      console.log(err);
//      throw err;
    }


    console.log(result);
    return result;
  }
}
