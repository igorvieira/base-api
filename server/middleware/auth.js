import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import config from '../config/credentials';

module.exports = (app) => {
  const Users = app.models.user;
  const params = {
    secretOrKey: config.jwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
  };
  const strategy = new Strategy(params, (payload, done) => {
    Users.findById(payload.id)
      .then((user) => {
        if (user) {
          done(null, {
            id: user.id,
            email: user.email,
          });
        }
      })
      .catch(err => new Error(`${err}`));
  });

  passport.use(strategy);
  return {
    initialize: () => passport.initialize(),
    authenticate: () => passport.authenticate('jwt', config.jwtSession),
  };
};
