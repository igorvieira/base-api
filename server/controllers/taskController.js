module.exports = (app) => {
  const Tasks = app.models.task;

  const controller = {};

  controller.listTasks = (req, res) => {
    Tasks.find().exec()
      .then(task => res.json(task[req.user.id]))
      .catch(err => new Error(`Error in list tasks: ${err}`));
  };

  controller.saveTask = (req, res) => {
    const taskId = req.params.id;

    const data = {
      activity: req.body.activity,
      done: req.body.done,
    };
    if (taskId) {
      Tasks.update({ _id: taskId }, { $set: data })
      .catch(err => new Error(`Error in edit current Task: ${err}`));
    } else {
      Tasks.create(data)
      .then(task => res.json(task))
      .catch(err => new Error(`Error in create a new Task: ${err}`));
    }
  };

  controller.getTaskById = (req, res) => {
    const taskId = req.params.id;

    Tasks.findById({ where: {
      id: taskId,
      user_id: req.user.id,
    } }).exec()
      .then(task => res.json(task))
      .catch(err => new Error(`Error in find Task By Id: ${err}`));
  };

  controller.removeTask = (req, res) => {
    const taskId = req.params.id;

    Tasks.findByIdAndRemove({ where: {
      id: taskId,
      user_id: req.user.id,
    } })
    .exec()
    .then(task => res.json(task))
    .catch(err => new Error(`Error in Remove Task By Id: ${err}`));
  };


  return controller;
};
