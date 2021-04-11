import {Inject, Singleton} from "typescript-ioc";
import {decode, encode} from "js-base64";
import {PostCommentView} from "../view/postCommentView";
import {PostCommentListView} from "../view/postCommentListView";
import {PostCursorView} from "../view/postCursorView";


@Singleton
export class ResolverComment {

  public async common(postId?: number, offset?: number, cursor?: string): Promise<PostCommentListView> {

    if(!cursor) {
      return await this.get(1);
    }


    return await this.select(1, cursor);
  }


  private async get(size?: number, textSearch?: string): Promise<PostCommentListView> {
    return await this.getList(1, 0, size, textSearch);
  }


  private async select(offset: number, cursor: string): Promise<PostCommentListView> {
    const cursorObj = JSON.parse(decode(cursor));
    return await this.getList(1, offset, cursorObj.size, cursorObj.textSearch);
  }


  private async createCursor(size: number, textSearch: string): Promise<string> {

    const cursorObj: PostCursorView = <PostCursorView>{
      textSearch,
      size
    };

    const cursorStr: string = JSON.stringify(cursorObj);
    const cursor: string = encode(cursorStr);

    return cursor;
  }


  private async getList(userId: number, offset: number, size: number = 40, textSearch: string = ""): Promise<PostCommentListView> {

    const cursor: string = await this.createCursor(size, textSearch);
    const count = async () => 1;
    const items = async () => [<PostCommentView>{
      commentId: 2,
      postId: 2,
      userId: 2,
      displayName: 'Nikita Savchuk',
      body: 'this is fuck'
    }];

        const postCommentListView: PostCommentListView = new PostCommentListView(
            cursor,
            count,
            items
        );

        return postCommentListView;
    }
}
