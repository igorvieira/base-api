module.exports = (app) => {
  const controller = app.controllers.taskController;
  const auth = app.middleware.auth;

  app.route('/api/tasks')
        .all(auth.authenticate())
        .get(controller.listTasks)
        .post(controller.saveTask);


  app.route('/api/tasks/:id')
        .all(auth.authenticate())
        .put(controller.saveTask)
        .get(controller.getTaskById)
        .delete(controller.removeTask);
};
