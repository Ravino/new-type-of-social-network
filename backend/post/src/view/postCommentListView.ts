import {PostCommentView} from "./postCommentView";


export class PostCommentListView {

  public constructor (
    public cursor: string,
    private countFn: () => Promise<number>,
    private itemsFn: () => Promise<PostCommentView[]>
  ) {}


  public async count (): Promise<number> {
    return await this.countFn();
  }


  public async items (): Promise<PostCommentView[]> {
    return await this.itemsFn ();
  }
}
