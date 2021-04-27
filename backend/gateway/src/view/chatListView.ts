import {ChatView} from "./chatView";


export class ChatListView {

  constructor (
    public cursor: string,
    private countFn: () => Promise<number>,
    private itemsFn: () => Promise<ChatView[]>
  ) {}


  public async count (): Promise<number> {
    return await this.countFn();
  }


  public async items (): Promise<ChatView[]> {
    return await this.itemsFn ();
  }
}
