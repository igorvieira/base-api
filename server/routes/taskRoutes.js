module.exports = (app) => {
  const { listTasks,
        saveTask,
        getTaskById,
        removeTask } = app.controllers.taskController;

  app.route('/api/tasks')
        .get(listTasks)
        .post(saveTask);

  app.route('/api/tasks/:id')
        .put(saveTask)
        .get(getTaskById)
        .delete(removeTask);
};
