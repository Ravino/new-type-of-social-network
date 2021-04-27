import {MessageView} from "./messageView";


export class MessageListView {

  constructor (
    public cursor: string,
    private countFn: () => Promise<number>,
    private itemsFn: () => Promise<MessageView[]>
  ) {}


  public async count (): Promise<number> {
    return await this.countFn();
  }


  public async items (): Promise<MessageView[]> {
    return await this.itemsFn ();
  }
}
