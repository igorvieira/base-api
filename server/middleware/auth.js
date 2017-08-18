import passport from 'passport';
import passportJWT from 'passport-jwt';
import cfg from './jwt_verify';


const ExtractJwt = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;
const params = {
  secretOrKey: cfg.jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

module.exports = (app) => {
  const users = app.models.user;

  const strategy = new Strategy(params, (payload, done) => {
    const user = users[payload.id] || null;
    if (user) {
      done(null, { id: user.id });
    } else {
      done(new Error('User not found'), null);
    }
  });
  passport.use(strategy);
  return {
    initialize: () => passport.initialize(),
    authenticate: () => passport.authenticate('jwt', cfg.jwtSession),
  };
};
