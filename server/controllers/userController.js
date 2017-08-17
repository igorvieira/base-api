module.exports = (app) => {
  const User = app.models.user;
  const controller = {};

  controller.createUser = (req, res) => {
    User.create(req.body)
        .then(user => res.json(user))
        .catch(err => new Error(`Error in create user: ${err}`));
  };

  controller.findUserById = (req, res) => {
    User.findById(req.user.id, {
      attributes: ['id', 'name', 'email'],
    })
    .then(result => res.json(result))
    .catch(err => new Error(`Error in find user by id: ${err}`));
  };
  return controller;
};
