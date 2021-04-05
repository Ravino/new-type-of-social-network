import { Singleton } from 'typescript-ioc';
import { createTestAccount, createTransport } from 'nodemailer';


@Singleton
export class MailerService {

  private account?: any;
  private transfer?: any;
  private mailer?: any;


  public constructor(){}


  private async initialization(): Promise<any> {

    this.mailer = {};
    this.account = {};
    this.mailer.smtpAddress = <string>global.process.env.MAILER_SMTP_ADDRESS || '';
    this.mailer.smtpPort = <string>global.process.env.MAILER_SMTP_PORT || 465;
    this.account.user = <string>global.process.env.MAILER_EMAIL_ADDRESS || '';
    this.account.pass = <string>global.process.env.MAILER_EMAIL_PASSWORD || '';


console.log(this.mailer);
    this.transfer = createTransport({
      host: this.mailer.smtpAddress,
      port: this.mailer.smtpPort,
      secure: true,
      auth: {
        user: this.account.user,
        pass: this.account.pass
      }
    });


    console.log('Success create user test for email service');
    return undefined;
  }


  private generatorMessage(password: string, verificationToken: string): any {

    const text: string = `Добро пожаловать!
    Вы зарегистрировались в социальной сети Plizi.fun
    Для завершения регистрации Вам нужно подтвердить почту по ссылке ${verificationToken} и войти с паролем: ${ password }
    Вы можете изменить этот пароль на странице в настройках.`;


    const message = {
      from: this.account.user,
      subject: `PLIZI: Регистрация`,
      text: text
    };


    return message;
  }


  private async senderMessage(message: any): Promise<any> {

    let info: any;
    try {
      info = await this.transfer.sendMail(message);
    }
    catch(err) {
      console.log(err);
    }

    console.log(info);
    return undefined;
  }


  public async sender(toEmail: string, password: string, verificationToken: string): Promise<any> {

    if(!this.account) {
      await this.initialization();
    }


    const message: any = this.generatorMessage(password, verificationToken);
    message.to = toEmail;


console.log(message);

    try {
      await this.senderMessage(message);
    }
    catch(err) {
      console.log(err);
    }


    return undefined;
  }
}
