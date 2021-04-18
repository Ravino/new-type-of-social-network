import {Singleton} from 'typescript-ioc';
import {FrendView} from '../view/frendView';
import {FrendListView} from '../view/frendListView';


@Singleton
export class RequestFrendResolver {

  public async getList(): Promise<FrendListView> {
    return await this.createPostList();
  }


  private async createPostList(): Promise<FrendListView> {

    const cursor: string = 'cursor';
    const count = async () => 1;
    const items = async () => [
      <FrendView>{
        frendId: 1,
        profileId: 1,
        displayName: 'Fuck of fuck',
        avatar: '',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];


    const frendListView: FrendListView = new FrendListView(
      cursor,
      count,
      items
    );


    return frendListView;
  }
}
