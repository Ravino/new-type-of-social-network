import {tarantool} from '../config/tarantool';
import {v4 as uuidV4} from 'uuid';


export class MessageService{

  public constructor() {}


  public async get(): Promise<any> {}


  public async create(chatId: number, senderId: number, body: string): Promise<boolean> {

    const currentAt: number = Date.now();
    const uuid = uuidV4();


    const bindParams: any[] = [
      chatId,
      senderId,
      body,
      currentAt,
      currentAt,
      uuid,
      true,
      true,
      false,
      false
    ];


    let result: any;
    try {
      result = await tarantool.sql(`insert into chat_messages (chat_id, sender_id, body, created_at, updated_at, uuid, sended, delivered, readed, readed_notification) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, bindParams);
    }
    catch(err) {
      console.log(err);
      return false;
    }


    return true;
  }


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
