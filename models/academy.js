const mongoose = require("mongoose");
const moment = require("moment");

const AcademySchema = mongoose.Schema({
	AcademyName : {
		type: String,
		maxlength: [30,'Academy Name Is Too Large !'],
		minlength: [2, 'Academy Name Is Too Short !']
	},

	AcademyWebsite : {
		type: String,
		maxlength: [50,'Academy Website Name Is Too Large !']
	},

 AcademyLogo : {
     type: String,
 	},

  AcademyProfileImage : {
    type: String,
  },

  AcademyFounded : {
    type: String,
    maxlength: [20,'Academy Found Date Is Too Large !']
  },

  Headquarters : {
    type: String,
    maxlength: [20,'Headquarter Name Is Too Large !']
  },

  AcademyDiscription : {
    type: String,
  },

  ZipCode : {
    type: String,
    maxlength: [8,'ZipCode Is Too Large !']
  },

	EmailId : {
	type: String,
	required: [true,'Email ID Is Required Field !'],
	maxlength: [50,'Email ID Is Too Large !'],
	unique: [true]
	},

	Password:{
	type: String,
	required: [true,'Password Is Required Field !'],
	maxlength: [20,'Password Should Be Less Then 20 Digit !'],
	minlength: [6,'Password Should Be Atleast 6 Digit !']
	},

  CreatedBy : {
    type: String
  },

	UpdatedBy : {
    type: String
  },

  CreatedOn : {
    type: String,
		default: moment().format('DD/MM/YYYY HH:MM:SS')
  },

	UpdatedOn : {
		type: String
	},

  CreatedIp : {
    type: String
  },

  UpdatedIp : {
    type: String
  },

  Active : {
    type: Boolean,
		default: true
  }
});

const Academy = module.exports = mongoose.model('Academy',AcademySchema);
