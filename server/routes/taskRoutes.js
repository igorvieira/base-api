module.exports = (app) => {
  const controller = app.controllers.taskController;

  app.route('/api/tasks')
        .all(app.middleware.auth.initialize())
        .get(controller.listTasks)
        .post(controller.saveTask);


  app.route('/api/tasks/:id')
        .all(app.middleware.auth.initialize())
        .put(controller.saveTask)
        .get(controller.getTaskById)
        .delete(controller.removeTask);
};
