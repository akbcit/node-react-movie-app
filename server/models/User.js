const mongoose = require("mongoose");
const PassportLocalMongoose = require("passport-local-mongoose");
// create schema
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    role:{
        type:Array,
        default:[],
    }
  },
  {
    collection: "users",
  }
);
// use plugin for auth
UserSchema.plugin(PassportLocalMongoose);
// create model
const User = new mongoose.model("User", UserSchema);
// export model
module.exports = User;
