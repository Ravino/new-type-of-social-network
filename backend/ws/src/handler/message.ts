export function preWorkMessage(data: any, user?: any): any {

  const chatId: number = data.chatId;
  const senderId: number = user.id;
  const body: string = data.body


  const message: any = {
    chatId,
    senderId,
    body
  };


  return message;
}


export function postWorkMessage(data: any): any {

  const eventType: string = 'newMessage';;


  const message: any = {
    data,
    eventType
  };


  return message;
}
