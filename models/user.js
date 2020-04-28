const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  posts:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post"
    }
  ]
});


userSchema.pre("save", async function(next) {
  try {
    if(!this.isModified('password')){
      return next()
    }
    let hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    return next()
  } catch (err) {
    return next(err)
  }
});

userSchema.methods.comparePassword = async function(condidatePassword, next) {
  try {
    let isMatch = await bcrypt.compare(condidatePassword, this.password);
    return isMatch;
  } catch (err) {
    return next(err)
  }
}


const User = mongoose.model("User", userSchema);
module.exports = User;

