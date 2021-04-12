import {Singleton} from 'typescript-ioc';


@Singleton
export class PostRequestMutation {

  public async create(body: string): Promise<boolean> {
    return true;
  }


  public async update(postId: number, body: string): Promise<boolean> {
    return true;
  }


  public async delete(postId: number): Promise<boolean> {
    return true;
  }
}
