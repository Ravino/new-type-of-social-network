const listEnvVar: Array<string> = [
  'NATS_PORT',
  'NATS_HOST',
  'TARANTOOL_PORT',
  'TARANTOOL_HOST',
  'TARANTOOL_USER_NAME',
  'TARANTOOL_USER_PASSWORD'
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
