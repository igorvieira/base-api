module.exports = (app) => {
  const controller = app.controllers.userController;

  app.route('api/user/')
    .all(app.middleware.auth.initialize())
    .post(controller.createUser);

  app.route('api/user/:id')
   .all(app.middleware.auth.initialize())
   .get(controller.findUserById);
};
