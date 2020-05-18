import express from 'express';
import mongoose from 'mongoose';
import jwt from 'express-jwt';
import dotenv from 'dotenv';
import routes from './routes/index';

let cluster = require('cluster');

if (cluster.isMaster) {
    let cpuCount = require('os').cpus().length;
    for (let i = 0; i < cpuCount; i += 1) {
        cluster.fork();
    }
} else {
    mongoose.Promise = global.Promise;
    const app = express();
    dotenv.config();

    app.use(jwt({ secret: process.env.JWT_SECRET}));
    app.use('/', routes);

    mongoose.connect(`mongodb://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@${process.env.MONGO_DB_HOST}:${process.env.MONGO_DB_PORT}/${process.env.MONGO_DB_DATABASE}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log('mongodb started.');
        app.listen(process.env.APP_PORT, () => {
            console.log(`Server started on ${process.env.APP_PORT}`);
        });
    }).catch(() => {
        console.log('Mongodb connection failed.');
    })
}
