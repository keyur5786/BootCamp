const mongoose = require("mongoose");
const moment = require("moment");
const ImageSchema = mongoose.Schema({


  upload : {
    type: String,
    required: true
  },

  CreatedBy : {
    type: Number,

  },

  CreatedOn : {
    type: String,
default: moment().format('DD/MM/YYYY HH:MM:SS')
  },

  CreatedIp : {
    type: String,

  },

  UpdatedBy : {
    type: Number,

  },

  UpdatedOn : {
    type: String,

  },

  UpdatedIp : {
    type: Number,

  },

  Active : {
    type: Boolean,

  }
});

const Image = module.exports = mongoose.model('Image',ImageSchema);
