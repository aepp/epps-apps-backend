import {NextFunction, Request, Response, Router} from 'express';
import passport from 'passport';
import {api} from '../api';
import {Globals} from '../globals';

const router = Router();

// when login is successful, retrieve user info
router.get(api.auth.twitter.loginSuccess, (req: Request, res: Response) => {
  if (req.user) {
    res.json({
      success: true,
      message: 'user has successfully authenticated',
      user: req.user,
      cookies: req.cookies
    });
  } else {
    res.json({
      success: false,
      message: 'no user object in request; please (re-)authenticate.',
      user: null,
      cookies: req.cookies
    });
  }
});

// when login failed, send failed msg
router.get(api.auth.twitter.loginFailed, (req: Request, res: Response) => {
  res.status(401).json({
    success: false,
    message: 'user failed to authenticate.'
  });
});

// When logout, redirect to client
router.get(api.auth.twitter.logout, async (req: Request, res: Response) => {
  await req.logout();
  res.json({
    success: true,
    message: 'user has been successfully logged out',
    user: null,
    cookies: undefined
  });
});

// auth with twitter
router.get(api.auth.twitter.authenticate, [
  (req: Request, res: Response, next: NextFunction) => {
    const {returnTo} = req.query;
    if (req.session && returnTo) {
      req.session.returnTo = decodeURIComponent(returnTo);
    }
    const authenticator = passport.authenticate('twitter', {
      scope: []
    });
    authenticator(req, res, next);
  }
  // passport.authenticate('twitter')
]);

// redirect to home page after successfully login via twitter
router.get(
  api.auth.twitter.redirect,
  passport.authenticate('twitter', {
    failureRedirect: `${api.auth.root}${api.auth.twitter.loginFailed}`
  }),
  (req: Request, res: Response) => {
    try {
      let returnTo = null;
      if (req.session) {
        returnTo = req.session.returnTo;
      }
      if (typeof returnTo === 'string' && returnTo.startsWith('/')) {
        return res.redirect(`${process.env.CLIENT_HOME_PAGE_URL}/#${returnTo}`);
      }
    } catch (error) {
      console.error(error);
    }
    res.redirect(Globals.clientHomePageUrl);
  }
);

export default router;
