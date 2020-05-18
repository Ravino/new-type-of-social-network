import mongoose from 'mongoose';
import dotenv from 'dotenv';
import ChatController from "./controllers/ChatController.js";
import ff from "fastify";
import fastifyJWT from "fastify-jwt";
import os from 'os';
import cluster from 'cluster';
const fastify = ff();

if (cluster.isMaster) {
    let cpuCount = os.cpus().length;
    for (let i = 0; i < cpuCount; i += 1) {
        cluster.fork();
    }
} else {
    mongoose.Promise = global.Promise;
    dotenv.config();

    fastify.register(fastifyJWT, {
        secret: process.env.JWT_SECRET
    });

    fastify.addHook("onRequest", async (request, reply) => {
        try {
            await request.jwtVerify()
        } catch (err) {
            reply.send(err)
        }
    });

    fastify.post('/api/chat/send', ChatController.sendMessage)

    const start = async () => {
        try {
            await fastify.listen(process.env.APP_PORT, '0.0.0.0');
            fastify.log.info(`server listening on ${fastify.server.address().port}`)
        } catch (err) {
            fastify.log.error(err)
            process.exit(1)
        }
    };
    mongoose.connect(`mongodb://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@${process.env.MONGO_DB_HOST}:${process.env.MONGO_DB_PORT}/${process.env.MONGO_DB_DATABASE}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log('connected')
        start()
    }).catch((ex) => {
        console.error('Exception ' + ex)
    });
}
