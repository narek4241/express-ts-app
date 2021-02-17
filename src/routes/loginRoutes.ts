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

  if (email && password) {
    // #note not sensitive data opt
    if (email === 'test@gmail.com' && password === 'test1111') {
      req.session = { isLoggedIn: true };
      res.redirect('/');
    } else {
      res.send('invalid email or password');
    }
  } else {
    res.send('email and password are required');
  }

  res.send('test');
});

export { router };
