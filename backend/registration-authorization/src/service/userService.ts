import { tarantool } from '../config/tarantool';
import { v4 as uuidV4 } from 'uuid';


export class UserService {

  public async getByEmail(email: string): Promise<any> {

    const params = [
      email
    ];


    let usersList: any[] = [];
    try {
      usersList = await tarantool.sql("select * from users where email = ?", params);
    }
    catch(err) {
      console.log(err);
    }


    let user: any = usersList[0];
    return user;
  }


  public async create(firstname: string, lastname: string, password: string, confirmed: boolean, email?: string|null, vkontakteProfileId?: number|null): Promise<any> {

    const currentAt: number = Date.now();
    const uuid: string = uuidV4();


    const params = [
      email,
      firstname,
      lastname,
      currentAt,
      currentAt,
      password,
      uuid,
      confirmed,
      vkontakteProfileId
    ];


    let result: any = null;
    try {
      result = await tarantool.sql('insert into users (email, firstname, lastname, created_at, updated_at, password, uuid, confirmed, vkontakte_profile_id) values(?, ?, ?, ?, ?, ?, ?, ?, ?)', params);
    }
    catch(err) {
      console.log(err);
//      throw err;
    }


    console.log(result);
    return result;
  }
}
