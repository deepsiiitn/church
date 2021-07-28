const mongoose = require("../config/connect");
const adminSchema = new mongoose.Schema(
  {
    id:{ type: Number, unique: true},
    church_name: { type: String, required: true},
    location: { type: String,required: true, unique: true},
    church_image: { type: String, default: '' },
    rating: { type: Number, required: true },
    timing: { type: String, required: true},
    about: { type: String, required: true},
    preaching: { type: String, required: true},
    media: { type: String, required: true},
    is_adopt: { type: Boolean, default: false},
    needs: {type: String},
    status: { type: Boolean,default:true}
  },
  {
    timestamps: true,
    collection: "church_list" 
  }
);

const admin = mongoose.church.model("church_list", adminSchema);

module.exports = admin;
