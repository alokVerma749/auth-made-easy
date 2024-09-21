import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';

import { ROLES } from './enums/roles.js';

const app = express();

app.set('view engine', 'ejs');

app.use(express.json())
app.use(cors())
app.use(cookieParser());

import test_route from './routes/v1/testRoute.js';
import view_route from './routes/v1/view.js';
import auth_route from './routes/v1/auth.js';

const { USER } = ROLES;

app.use('/test', test_route)
app.use('/api/v1/view', view_route)
// app.use('/api/v1/view', authoriseRoute({ role: USER }), view_route)
app.use('/api/v1/auth', auth_route)

export default app;
