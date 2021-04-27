import {ChatMemberView} from "./chatMemberView";


export class ChatMemberListView {

  constructor (
    public cursor: string,
    private countFn: () => Promise<number>,
    private itemsFn: () => Promise<ChatMemberView[]>
  ) {}


  public async count (): Promise<number> {
    return await this.countFn();
  }


  public async items (): Promise<ChatMemberView[]> {
    return await this.itemsFn ();
  }
}
