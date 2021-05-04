import { Singleton } from 'typescript-ioc';
import { createTransport } from 'nodemailer';


@Singleton
export class MailerService {

  private account?: any;
  private transfer?: any;
  private mailer?: any;


  private templates?: any = {
    registration: {
      subject: `Plizi: регистрация`,
    body: (password: string, verificationToken: string) => `Добро пожаловать!
      Вы зарегистрировались в социальной сети Plizi.fun
      Для завершения регистрации Вам нужно подтвердить почту по  <a href="https://dev.plizi.fun/registration-authorization/verification/email?token=${verificationToken}">ссылке</a> и войти с паролем: ${ password }
      Вы можете изменить этот пароль на странице в настройках.`
    },

    recoveryPassword: {
      subject: `Plizi: сброс пароля`,
      body: (password: string, verificationToken: string) => `Здравствуйте!
      Вами был запрошен сброс пароля. Для подтверждения, перейдите по <a href="https://dev.plizi.fun/registration-authorization/verification/password?token=${verificationToken}">ссылке</a> и войдите с новым паролем: ${password}
      Если это были не вы, пропустите данное письмо.
      Действие ссылки 15 минут, после она не будет действительна.`
    }
  };


  public constructor(){}


  private async initialization(): Promise<any> {

    this.mailer = {};
    this.account = {};
    this.mailer.smtpAddress = <string>global.process.env.MAILER_SMTP_ADDRESS || '';
    this.mailer.smtpPort = <string>global.process.env.MAILER_SMTP_PORT || 465;
    this.account.user = <string>global.process.env.MAILER_EMAIL_ADDRESS || '';
    this.account.pass = <string>global.process.env.MAILER_EMAIL_PASSWORD || '';


    this.transfer = createTransport({
      host: this.mailer.smtpAddress,
      port: this.mailer.smtpPort,
      secure: true,
      auth: {
        user: this.account.user,
        pass: this.account.pass
      }
    });


    return undefined;
  }


  private generatorMessage(typeTemplate: string, password: string, verificationToken: string): any {

    const template = this.templates[typeTemplate];


    const message = {
      from: this.account.user,
      subject: template.subject,
      html: template.body(password, verificationToken)
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


  public async sender(typeTemplate: string, toEmail: string, password: string, verificationToken: string): Promise<any> {

    if(!this.account) {
      await this.initialization();
    }


    const message: any = this.generatorMessage(typeTemplate, password, verificationToken);
    message.to = toEmail;


    try {
      await this.senderMessage(message);
    }
    catch(err) {
      console.log(err);
    }


    return undefined;
  }
}
