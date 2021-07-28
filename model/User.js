const mongoose = require("../config/connect");
var bcrypt = require('bcrypt-nodejs');
const adminSchema = new mongoose.Schema(
  {
    id: { type: Number,unique:true, default: 0 },
    name: { type: String, default: "Guest" },
    email: { type: String,required: true, unique: true},
    status: { type: Boolean, default: true },
    password: { type: String, required: true },
    user_type: { type: String, required: true},
  },
  {
    timestamps: true,
    collection: "Users" 
  }
);
adminSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
// checking if password is valid
adminSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

const admin = mongoose.church.model("Users", adminSchema);

module.exports = admin;
