import {tarantool} from '../config/tarantool';
import {v4 as uuidV4} from 'uuid';


export class MessageService{

  public constructor() {}


  public async get(): Promise<any> {}


  public async create(): Promise<any> {}


  public async update(messageId: number, body: string): Promise<boolean> {

    const currentAt: number = Date.now();


    const bindParams: any[] = [
      body,
      currentAt,
      messageId
    ];


    let result: any;
    try {
      result = await tarantool.sql('update messages set body = ?, updated_at = ? where message_id = ?', bindParams);
    }
    catch(err) {
      console.log(err);
        return false;
    }


    return true;
  }


  public async del(messageId: number): Promise<boolean> {

    const currentAt: number = Date.now();


    const bindParams: any[] = [
      messageId
    ];


    let result: any;
    try {
      result = await tarantool.sql('delete from messages where message_id = ?', bindParams);
    }
    catch(err) {
      console.log(err);
        return false;
    }


    return true;
  }
}
