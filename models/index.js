const mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.Promise = Promise;

mongoose.connect("mongodb://localhost/farsi-dev", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});


module.exports.User = require("./user");
module.exports.Post = require("./post");