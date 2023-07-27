const mongoose = require("mongoose");

const LinkSchema = mongoose.Schema({
  url: {
    require: true,
    type: String,
  },
  thumb: {
    type: String,
  },
  title: {
    type: String,
  },
  favicon: {
    type: String,
  },
  createdBy: {
    type: String,
  },
  createdAt: { type: Date, expires: 60, default: Date.now },
});

module.exports = mongoose.model("link", LinkSchema, "links");
