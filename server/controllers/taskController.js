module.exports = (app) => {
  const Tasks = app.models.task;

  const controller = {};

  controller.listTasks = (req, res) => {
    Tasks.find().exec()
<<<<<<< HEAD
      .then(task => res.json(task[req.user.id]))
=======
      .then(task => res.json(task))
>>>>>>> 27b97100ec288674f2d614974623fc1925894e12
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

    Tasks.findById(taskId).exec()
      .then(task => res.json(task))
      .catch(err => new Error(`Error in find Task By Id: ${err}`));
  };

  controller.removeTask = (req, res) => {
    const taskId = req.params.id;

    Tasks.findByIdAndRemove(taskId).exec()
      .then(task => res.json(task))
      .catch(err => new Error(`Error in Remove Task By Id: ${err}`));
  };


  return controller;
};
