module.exports = (app) => {
  const Tasks = app.models.task;

  const controller = {};

  controller.listTasks = (req, res) => {
    Tasks.find().exec()
      .then(task => res.json(task))
      .then(err => console.log(`${err}`));
  };

  controller.saveTask = (req, res) => {
    const taskId = req.params.id;

    const data = {
      activity: req.body.activity,
      done: req.body.done,
    };
    if (taskId) {
      Tasks.findByIdAndUpdate(data)
      .then(task => res.json(task), err => console.log(`${err}`));
    } else {
      Tasks.create(data)
      .then(task => res.json(task), err => console.log(`${err}`));
    }
  };

  controller.getTaskById = (req, res) => {
    const taskId = req.params.id;

    Tasks.findById(taskId).exec()
      .then(task => res.json(task),
      err => console.log(`${err}`));
  };

  controller.removeTask = (req, res) => {
    const taskId = req.params.id;

    Tasks.findByIdAndRemove(taskId).exec()
      .then(task => res.json(task))
      .then(err => console.log(`${err}`));
  };


  return controller;
};
