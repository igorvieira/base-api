import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

module.exports = () => {
  const users = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  }, {
    hook: {
      beforeCreate: (user) => {
        const value = user;
        const salt = bcrypt.genSaltSync();
        value.password = bcrypt.hashSync(user.password, salt);
      },
    },
    classMethods: {
      associate: (models) => {
        users.hasMany(models.Tasks);
      },
      isPassword: (encodedPassword, password) => {
        bcrypt.compareSync(password, encodedPassword);
      },
    },
  });


  return mongoose.model('Users', users);
};
