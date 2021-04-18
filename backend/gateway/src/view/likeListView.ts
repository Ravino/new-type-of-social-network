import {LikeView} from "./likeView";


export class LikeListView {

  constructor (
    public cursor: string,
    private countFn: () => Promise<number>,
    private itemsFn: () => Promise<LikeView[]>
  ) {}


  public async count (): Promise<number> {
    return await this.countFn();
  }


  public async items (): Promise<LikeView[]> {
    return await this.itemsFn ();
  }
}
