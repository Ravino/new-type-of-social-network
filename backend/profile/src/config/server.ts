import express from 'express';
import {apolloRegistrationAuthorization} from './ApolloRegistrationAuthorization';


export const server: express.Application = express();

apolloRegistrationAuthorization(server);
