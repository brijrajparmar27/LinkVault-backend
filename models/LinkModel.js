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
});

module.exports = mongoose.model("link", LinkSchema, "links");
