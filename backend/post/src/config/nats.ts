import {createHash} from 'crypto';
import {connect as ConnectNats} from 'nats';


const nodeName: string = createHash('md5').update(Math.random() + '').digest('hex');
const config: any = {
  name: nodeName,
  servers: [
    `${global.process.env.NATS_HOST}:${global.process.env.NATS_PORT}`
  ]
};



export async function nats() {
  const ns = await ConnectNats(config);
  return ns;
}
