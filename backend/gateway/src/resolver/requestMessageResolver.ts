import {Inject, Singleton} from 'typescript-ioc';
import {MessageView} from '../view/messageView';
import {MessageListView} from '../view/messageListView';


@Singleton
export class RequestMessageResolver {

  public async getList(): Promise<MessageListView> {
    return await this.createMessageList();
  }


  private async createMessageList(): Promise<MessageListView> {

    const cursor: string = 'cursor';
    const count = async () => 1;
    const items = async () => [
      <MessageView>{
        messageId: 1,
        chatId: 1,
        senderId: 1,
        avatar: '',
        displayName: 'Vasya Ivanov',
        body: 'Klenin faggot',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];


    const messageListView: MessageListView = new MessageListView(
      cursor,
      count,
      items
    );


    return messageListView;
  }
}
