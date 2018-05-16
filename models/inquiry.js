const mongoose = require("mongoose");
const moment = require("moment");
const InquirySchema = mongoose.Schema({
  AcademyId : {
    type: String,
    ref: 'Academy',
    required: true
  },

  CourseId : {
    type: String,
    ref: 'Cource'
  },

  Phone : {
    type: Number,
    required: [true,'Phone Number Is Required !']
  },

	EmailId : {
		type: String,
		required: [true,'Email ID Is Required !'],
    maxlength: [50,'Email ID Should Be Less Than 50 Characters !']
	},

  Name : {
    type: String,
    required: [true,'Name Is Required !'],
    maxlength: [50,'Name Should Be Less Than 50 Characters !']
  },

  Notes : {
    type: String,
    required: [true,'Notes Is Required !'],
    maxlength: [500,'Notes Should Be Less Than 500 Characters !']
  },

  CreatedBy : {
    type: String,
  },

  UpdatedBy : {
    type: String,
  },

  CreatedOn : {
    type: String,
    default: moment().format("DD-MM-YYYY HH:mm:ss")
  },

  UpdatedOn : {
    type: String
  },

  CreatedIp : {
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

const Inquiry = module.exports = mongoose.model('Inquiry',InquirySchema);
