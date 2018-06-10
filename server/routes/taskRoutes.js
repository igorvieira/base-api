module.exports = (app) => {
  const { taskController: {
          listTasks,
          saveTask,
          getTaskById,
          removeTask,
        } } = app.controllers;

  app
    .route('/api/tasks')
      .get(listTasks)
      .post(saveTask);

  app
    .route('/api/tasks/:id')
      .put(saveTask)
      .get(getTaskById)
      .delete(removeTask);
};
