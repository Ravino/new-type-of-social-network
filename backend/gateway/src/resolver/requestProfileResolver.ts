import {Inject, Singleton} from 'typescript-ioc';
import {ProfileView} from '../view/profileView';


@Singleton
export class RequestProfileResolver {

  public async get(): Promise<ProfileView> {
    return <ProfileView>{
      profileId: 1,
      firstname: 'Fuck',
      lastname: 'fuckof',
      displayName: 'fuck of fuckof',
      age: 65,
      country: 'RU',
      city: 'Moscow',
      avatar: ''
    };
  }
}
