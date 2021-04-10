import {PostRequestView} from "./postRequestView";


export class PostRequestListView {

  public constructor (
    public cursor: string,
    private countFn: () => Promise<number>,
    private itemsFn: () => Promise<PostRequestView[]>
  ) {}


  public async count (): Promise<number> {
    return await this.countFn();
  }


  public async items (): Promise<PostRequestView[]> {
    return await this.itemsFn ();
  }
}
