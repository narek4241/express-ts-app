import { Router, Request, Response } from 'express';

interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined };
}

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.send(`
    <div>Entry</div>
  `);
});

router.get('/login', (req: Request, res: Response) => {
  res.send(`
    <div>
      <form method="POST">
        <label>Email</label>
        <input name="email" type="text" />
        <label>Password</label>
        <input name="password" type="password" />
        <button>Submit</button>
      </form>
    </div>
  `);
});

router.post('/login', (req: RequestWithBody, res: Response) => {
  const { email, password } = req.body;
  if (email) {
    res.send(email.toUpperCase());
  } else {
    res.send('You must provide an email');
  }
});

export { router };
