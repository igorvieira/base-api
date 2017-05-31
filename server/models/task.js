import mongoose from 'mongoose';


module.exports = () => {
  const tasks = mongoose.Schema({
    activity: { type: String, required: true },
    done: { type: Boolean },
    date: { date: Date },
  });


  return mongoose.model('Tasks', tasks);
};
