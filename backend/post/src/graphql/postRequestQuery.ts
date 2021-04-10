import {Inject, Singleton} from "typescript-ioc";
import {decode, encode} from "js-base64";
import {PostRequestView} from "../view/postRequestView";
import {PostRequestListView} from "../view/postRequestListView";
import {PostCursorView} from "../view/postCursorView";


@Singleton
export class PostRequestQuery {

  public async get(postId: string): Promise<PostRequestView> {

    const result: PostRequestView = <PostRequestView>{
      postId: 1,
      userId: 1,
      displayName: 'Ravino Doul',
      body: 'Hello world',
      createdAt: new Date(),
      updatedAt: new Date()
    };


    return result;
  }


  public async requests(size?: number, textSearch?: string): Promise<PostRequestListView> {
    return await this.getList(1, 0, size, textSearch);
  }


  public async select(cursor: string, offset: number): Promise<PostRequestListView> {
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


  private async getList(userId: number, offset: number, size: number = 40, textSearch: string = ""): Promise<PostRequestListView> {

    const cursor: string = await this.createCursor(size, textSearch);
    const count = async () => 1;
    const items = async () => [new PostRequestView];

        const postRequestListView: PostRequestListView = new PostRequestListView(
            cursor,
            count,
            items
        );

        return postRequestListView;
    }
}
