import express, { Request, Response } from 'express';

const app = express();

app.get('/', (req: Request, res: Response) => {
  res.send(`
    <div>Hello there</div>
  `);
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
