const mongoose = require("mongoose");
const moment = require("moment");
const UserSchema = mongoose.Schema({

	FirstName : {
		type: String,
		required: [true,'FirstName Is Required Field !'],
	},

  LastName : {
    type: String,
    required: true
  },

  UserName : {
    type: String,
    unique: true,
    required: [true,'UserName Is Required Field !'],
  },

	Password : {
		type: String,
		required: [true,'Password Is Required Field !'],
    minlength: [6,'Password Should Be Grater Than 6 Characters !'],
    maxlength: [8,'Password Should Be Less Than 8 Characters !'],
	},


  CreatedBy : {
    type: String,

  },

  CreatedOn : {
    type: String,
		default: moment().format("DD-MM-YYYY HH:mm:ss")
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
		default: true
  }
});

const User = module.exports = mongoose.model('User',UserSchema);
