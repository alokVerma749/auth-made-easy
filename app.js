import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';

const app = express();

app.set('view engine', 'ejs');

app.use(express.json())
app.use(cors())
app.use(cookieParser());

import test_route from './routes/v1/testRoute.js';
import view_route from './routes/v1/view.js';

app.use('/test', test_route)
app.use('/api/v1/view', view_route)

export default app;
