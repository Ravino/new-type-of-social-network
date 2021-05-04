import {connect as ConnectNats} from 'nats';


const server = {
  servers: `${String(global.process.env.NATS_HOST)}:${String(global.process.env.NATS_PORT)}`
};


export async function natsInitialization() {
  const connectNats = await ConnectNats(server);
  return connectNats;
}
