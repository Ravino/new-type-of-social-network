import {Singleton} from 'typescript-ioc';
import {ShareView} from '../view/shareView';
import {ShareListView} from '../view/shareListView';


@Singleton
export class RequestShareResolver {

  public async getList(): Promise<ShareListView> {
    return await this.createPostList();
  }


  private async createPostList(): Promise<ShareListView> {

    const cursor: string = 'cursor';
    const count = async () => 1;
    const items = async () => [
      <ShareView>{
        shareId: 1,
        postId: 1,
        authorId: 1,
        displayName: 'Fuck of fuck',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];


    const shareListView: ShareListView = new ShareListView(
      cursor,
      count,
      items
    );


    return shareListView;
  }
}
