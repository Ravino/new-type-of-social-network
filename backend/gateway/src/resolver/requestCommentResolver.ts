import {Singleton} from 'typescript-ioc';
import {CommentView} from '../view/commentView';
import {CommentListView} from '../view/commentListView';


@Singleton
export class RequestCommentResolver {

  public async getList(): Promise<CommentListView> {
    return await this.createPostList();
  }


  private async createPostList(): Promise<CommentListView> {

    const cursor: string = 'cursor';
    const count = async () => 1;
    const items = async () => [
      <CommentView>{
        commentId: 1,
        postId: 1,
        authorId: 1,
        displayName: 'Fuck of fuck',
        body: 'My first comment',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];


    const commentListView: CommentListView = new CommentListView(
      cursor,
      count,
      items
    );


    return commentListView;
  }
}
