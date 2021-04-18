import {Singleton} from 'typescript-ioc';
import {PostView} from '../view/postView';
import {PostListView} from '../view/postListView';


@Singleton
export class RequestPostResolver {

  public async getList(): Promise<PostListView> {
    return await this.createPostList();
  }


  private async createPostList(): Promise<PostListView> {

    const cursor: string = 'cursor';
    const count = async () => 1;
    const items = async () => [
      <PostView>{
        postId: 1,
        authorId: 1,
        displayName: 'Fuck of fuck',
        body: 'My first post',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];


    const postListView: PostListView = new PostListView(
      cursor,
      count,
      items
    );


    return postListView;
  }
}
