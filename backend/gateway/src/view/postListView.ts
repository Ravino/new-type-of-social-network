import {PostView} from "./postView";


export class PostListView {

  constructor (
    public cursor: string,
    private countFn: () => Promise<number>,
    private itemsFn: () => Promise<PostView[]>
  ) {}


  public async count (): Promise<number> {
    return await this.countFn();
  }


  public async items (): Promise<PostView[]> {
    return await this.itemsFn ();
  }
}
