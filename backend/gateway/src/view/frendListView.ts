import {FrendView} from "./frendView";


export class FrendListView {

  constructor (
    public cursor: string,
    private countFn: () => Promise<number>,
    private itemsFn: () => Promise<FrendView[]>
  ) {}


  public async count (): Promise<number> {
    return await this.countFn();
  }


  public async items (): Promise<FrendView[]> {
    return await this.itemsFn ();
  }
}
