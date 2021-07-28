const mongoose = require("../config/connect");
const adminSchema = new mongoose.Schema(
  {
    id: {type: Number, unique: true},
    church_id:{ type: Number, unique: true},
    media: {type: String}
  },
  {
    timestamps: true,
    collection: "presentations" 
  }
);

const admin = mongoose.church.model("presentations", adminSchema);

module.exports = admin;
