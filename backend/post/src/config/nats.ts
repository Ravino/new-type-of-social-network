import {connect as ConnectNats} from 'nats';


const config: any = {
  servers: [
    `${global.process.env.NATS_HOST}:${global.process.env.NATS_PORT}`
  ]
};



export async function nats() {
  const ns = await ConnectNats(config);
  return ns;
}
