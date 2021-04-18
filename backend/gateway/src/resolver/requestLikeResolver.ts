import {Singleton} from 'typescript-ioc';
import {LikeView} from '../view/likeView';
import {LikeListView} from '../view/likeListView';


@Singleton
export class RequestLikeResolver {

  public async getList(): Promise<LikeListView> {
    return await this.createPostList();
  }


  private async createPostList(): Promise<LikeListView> {

    const cursor: string = 'cursor';
    const count = async () => 1;
    const items = async () => [
      <LikeView>{
        likeId: 1,
        authorId: 1,
        displayName: 'Fuck of fuck',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];


    const likeListView: LikeListView = new LikeListView(
      cursor,
      count,
      items
    );


    return likeListView;
  }
}
