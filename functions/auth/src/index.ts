import serverless from 'serverless-http'
import express from "express";
import bodyParser from "body-parser";
import cors from 'cors'
import helmet from 'helmet'
import authRouter from './authRouter.js';
import csrfLucia from '../../../lib/middlewares/csrf.js';
import verifyLucia from '../../../lib/middlewares/verify.js';
import { ALLOWED_DOMAINS } from '../../../lib/constants.js';

const app: express.Application = express();

app.disable('x-powered-by')
app.use(cors({
  origin: ALLOWED_DOMAINS,
  credentials: true
}))
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({ strict: false }))
app.use(csrfLucia)
app.use(verifyLucia)
app.use('/auth', authRouter)


export const handler = serverless(app);
