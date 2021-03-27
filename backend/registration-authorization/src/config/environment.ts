export function environmentInitialization() {

  if(!global.process.env.VKONTAKTE_CLIENT_ID) {
    console.log('Empty env var VKONTAKTE_CLIENT_ID');
    global.process.exit();
  }


  if(!global.process.env.VKONTAKTE_CLIENT_SECRET) {
    console.log('Empty env var VKONTAKTE_CLIENT_SECRET');
    global.process.exit();
  }
}
