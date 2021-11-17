import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';

import { errorHandler, NotFoundError } from '@aonautilus/ticketingcommon';
import { indexRouter } from './routes/index.route'
import { complaintRouter } from './routes/complaint.route';

const app = express();

app.set('trust proxy', true);

app.use(json());

app.use(indexRouter);
app.use(complaintRouter);

app.all('*', () => {
  throw new NotFoundError();
})

app.use(errorHandler);

export { app };
