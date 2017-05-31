module.exports = (app) => {
  const controller = app.controllers.taskController;

  app.route('/api/tasks')
        .get(controller.listTasks)
        .post(controller.saveTask);


  app.route('/api/tasks/:id')
        .put(controller.saveTask)
        .get(controller.getTaskById)
        .delete(controller.removeTask);
};
