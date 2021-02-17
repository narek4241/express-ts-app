import express from 'express';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import { router } from './routes/loginRoutes';

const app = express();

// #note syntax
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({ keys: ['someRandomKey'] }));
app.use(router);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
