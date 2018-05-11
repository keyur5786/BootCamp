const mongoose = require("mongoose");
const moment = require("moment");
const LocationSchema = mongoose.Schema({
  Loc_name : {
		type:String ,
		required: [true,"Location Name Is Required !"],
    maxlength: [50,"Location Nae Is Too Large !"],
    unique: true,
	},

  CreatedBy : {
    type: String,
  },

  CreatedOn : {
    type: String,
    default: moment().format('DD/MM/YYYY HH:MM:SS')
  },

  CreatedIp : {
    type: String,

  },

  UpdatedBy : {
    type: String,

  },

  UpdatedOn : {
    type: String,

  },

  UpdatedIp : {
    type: String,

  },

  Active : {
    type: Boolean,

  }

  });

  const Location = module.exports = mongoose.model('Location',LocationSchema);
