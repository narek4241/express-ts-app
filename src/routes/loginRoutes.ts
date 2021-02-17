import { Router, Request, Response } from 'express';

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

router.post('/login', (req: Request, res: Response) => {
  const { email, password } = req.body;
  res.send(`${email} ${password}`);
});

export { router };
