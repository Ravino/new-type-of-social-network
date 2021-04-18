import {ShareView} from "./shareView";


export class ShareListView {

  constructor (
    public cursor: string,
    private countFn: () => Promise<number>,
    private itemsFn: () => Promise<ShareView[]>
  ) {}


  public async count (): Promise<number> {
    return await this.countFn();
  }


  public async items (): Promise<ShareView[]> {
    return await this.itemsFn ();
  }
}
