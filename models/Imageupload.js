const mongoose = require("mongoose");
const moment = require("moment");
const ImageuploadSchema = mongoose.Schema({

	path: {
	 type: String,
	 required: true,
	 trim: true
	 },

	 originalname: {
	 type: String,
	 required: true
 },

  CreatedBy : {
    type: Number,

  },

  CreatedOn : {
    type: String,
		default: moment().format("DD-MM-YYYY HH:mm:ss")
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
		default: true
  }
});

const Image = module.exports = mongoose.model('Image',Imageupload);
