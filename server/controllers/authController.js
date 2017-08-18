import jwt from 'jwt-simple';

module.exports = (app) => {
  const controller = {};
  const Users = app.models.user;
  const auth = app.middleware.jwt_verify;

  controller.loginUser = (req, res) => {
    if (req.body.email && req.body.password) {
      const email = req.body.email;
      const password = req.body.password;
      const user = Users.find(u => u.email === email && u.password === password);
      if (user) {
        const payload = { id: user.id };
        const valueToken = jwt.encode(payload, auth.jwtSecret);
        res.json({ token: valueToken });
      } else {
        res.sendStatus(401);
      }
    } else {
      res.sendStatus(401);
    }
  };

  return controller;
};
