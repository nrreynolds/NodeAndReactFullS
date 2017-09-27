const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
//   below is the same as what we have above
// this is called distructuring
const { Schema } = mongoose;

const userSchema = new Schema ({
  googleId: String
});

mongoose.model('users', userSchema);
// load somelthing into mongoose
