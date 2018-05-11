const mongoose = require("mongoose");
const moment = require("moment");
const InquirySchema = mongoose.Schema({
  AcademyId : {
    type: String,
    ref: 'Academy',
    required: true
  },

  Phone : {
    type: Number,
    required: true
  },

	EmailId : {
		type: String,
		required: true
	},

  Name : {
    type: String,
    required: true
  },

  Notes : {
    type: String,
    required: true
  },

  CreatedBy : {
    type: String,
  },

  UpdatedBy : {
    type: String,
  },

  CreatedOn : {
    type: String,
    default: moment().format('DD/MM/YYYY HH:MM:SS')
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
