import { createHash } from 'crypto';
import { redis } from '../config/redis';


export class LinkService {

  public generatorLink(): string {
    const link: string = createHash('sha512').update(Math.random() + '').digest('hex');
    return link;
  }


  public async save(key: string, payload: string): Promise<boolean> {

    let result: boolean = true;
    try {
      await redis.set(key, payload);
    }
    catch(err) {
      console.log(err);
      result = false;
    }


    return result;
  }


  public async create(namespace: string, payload: string, ttl?: number): Promise<string|undefined> {

    const token: string = this.generatorLink();
    const key: string = `${namespace}:${token}`;


    let result: boolean = true;
    try {
      result = await this.save(key, payload);
    }
    catch(err) {
      console.log(err);
      result = false;
    }


    if(!result) {
      return undefined;
    }


    if(!ttl) {
      return token;
    }


    try {
      await redis.expire(key, ttl);
    }
    catch(err) {
      console.log(err);
      return undefined;
    }


    return token;
  }
}
