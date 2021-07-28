const mongoose = require("../config/connect");
var bcrypt = require('bcrypt-nodejs');
const adminSchema = new mongoose.Schema(
  {
    collection_name: { type: String, default: "" },
    seq_no: { type: Number, default: 0 }
  },
  {
    timestamps: true,
    collection: "counters" 
  }
);

const admin = mongoose.church.model("counters", adminSchema);

module.exports = admin;
