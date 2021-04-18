import {CommentView} from "./commentView";


export class CommentListView {

  constructor (
    public cursor: string,
    private countFn: () => Promise<number>,
    private itemsFn: () => Promise<CommentView[]>
  ) {}


  public async count (): Promise<number> {
    return await this.countFn();
  }


  public async items (): Promise<CommentView[]> {
    return await this.itemsFn ();
  }
}
