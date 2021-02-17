import { Router, Request, Response, NextFunction } from 'express';

interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined };
}

const router = Router();

function requireAuth(req: Request, res: Response, next: NextFunction): void {
  if (req.session && req.session.isLoggedIn) {
    next();
    return;
  } else {
    res.send(`
      <div>
        <h1>Access Denied</h1>
        <p>(You're logged out.)</p>
        <a href="/login">Login</a>
      </div>
    `);
  }
}

router.get('/', (req: Request, res: Response) => {
  if (req.session && req.session.isLoggedIn) {
    res.send(`
      <div>
        <h1>You're logged in.</h1>
        <a href="/protected">Protected Data</a>
        <a href="/logout">Logout</a>
      </div>
    `);
  } else {
    res.send(`
      <div>
        <h1>You're logged out.</h1>
        <a href="/login">Login</a>
      </div>
    `);
  }
});

router.get('/login', (req: Request, res: Response) => {
  if (req.session && req.session.isLoggedIn) {
    res.redirect('/');
  } else {
    res.send(`
    <div>
      <form method="POST">
        <label>Email</label>
        <input name="email" type="text" />
        <label>Password</label>
        <input name="password" type="password" />
        <button>Submit</button>
      </form>
      <a href="/">Back to Home</a>
    </div>
  `);
  }
});

router.post('/login', (req: RequestWithBody, res: Response) => {
  const { email, password } = req.body;

  if (email && password) {
    // #note not sensitive data opt
    if (email === 'test@gmail.com' && password === 'test1111') {
      req.session = { isLoggedIn: true };
      res.redirect('/');
    } else {
      res.send(`
        <div>
          <h2>Invalid email or password</h2>
          <a href="/login">Login</a>
        </div>
      `);
    }
  } else {
    res.send(`
        <div>
          <h2>Email and password are required</h2>
          <a href="/login">Login</a>
        </div>
      `);
  }
});

router.get('/logout', (req: Request, res: Response) => {
  if (req.session && req.session.isLoggedIn) {
    req.session = null;
    res.redirect('/');
  } else {
    res.redirect('/');
  }
});

router.get('/protected', requireAuth, (req: Request, res: Response) => {
  res.send(`
      <div>
        <h2>Welcome to protected route</h2>
        <p>(You're logged in user)</p>
        <a href="/">Back to Home</a>
      </div>
    `);
});

export { router };
