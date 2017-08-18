import mongoose from 'mongoose';


module.exports = () => {
  const users = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String },
    password: { date: String },
  });


  return mongoose.model('Users', users);
};
