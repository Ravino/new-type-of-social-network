const listEnvVar: Array<string> = [
  'VKONTAKTE_CLIENT_ID',
  'VKONTAKTE_CLIENT_SECRET',
  'VKONTAKTE_CALLBACK_URL',
  'VKONTAKTE_SCOPE',
  'VKONTAKTE_PROFILE_FIELDS',
];

export function environmentInitialization() {

  let status: string = 'success';
  for(let i of listEnvVar) {
    if(!global.process.env[i]) {
      console.log(`Empty env var ${ i }`);
      status = 'notSuccess';
    }
  }


  if(status == 'notSuccess') {
    global.process.exit();
  }
}
