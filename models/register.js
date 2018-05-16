const mongoose = require("mongoose");
const moment = require("moment");
const RegisterSchema = mongoose.Schema({

	EmailId : {
		type: String,
		required: true,
		unique:true
	},

  Password : {
    type: String,
    required: true
  },

	ConfirmPassword : {
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

  UpdatedByOn : {
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

const Register = module.exports = mongoose.model('Register',RegisterSchema);
