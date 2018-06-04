const mongoose = require("mongoose");
// const Schema = mongoose.Schema;
const { Schema } = mongoose;

// Create Schema
const UserSchema = new Schema({
  facebookID: {
    type: String
  },
  googleID: {
    type: String
  },
  twitterID: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  }
});

// Create collection and add Schema
mongoose.model("users", UserSchema);
