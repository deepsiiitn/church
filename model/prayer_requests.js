const mongoose = require("../config/connect");
const adminSchema = new mongoose.Schema(
  {
    id: {type: Number, unique: true},
    name:{ type: String, default: ''},
    email: {type: String, default:''},
    phone: {type: Number, default:''},
    to_whom: { type: String,default:''},
    request: { type: String,default:''}
    },
  {
    timestamps: true,
    collection: "prayer_requests" 
  }
);

const admin = mongoose.church.model("prayer_requests", adminSchema);

module.exports = admin;
