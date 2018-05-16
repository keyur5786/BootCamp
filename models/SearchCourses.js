const mongoose = require("mongoose");
const moment = require("moment");
const CourceSchema = mongoose.Schema({
  ProgramType : {
		type: Number,
		required: true
	},

  AcademyId : {
    type: String,
    ref: 'Academy',
    required: true
  },

  ProgramDuration : {
    type: Number,
    required: true
  },

	ProgramName : {
		type: String,
		required: true
	},

  ProgramDescription : {
    type: String,
    required: true
  },

  ProgramSubject : {
    type: String,
    required: true
  },

  ProgramLocationId : {
    type: String,
    ref: 'Location',
    required: true
  },

  Cost : {
    type: String,
    required: true
  },

  StartDate : {
    type: String,
    required: true
  },

	Length : {
		type: Number,
		required: true
	},

  Classsize : {
    type: String,
    required: true
  },

  Commitment : {
    type: String,
    required: true
  },

  CreatedBy : {
    type: Number,

  },

  UpdatedBy : {
    type: Number,
  },

  CreatedOn : {
    type: String,
    default: moment().format("DD-MM-YYYY HH:mm:ss")
  },

  UpdatedOn : {
    type: String,
    default: moment().format("DD-MM-YYYY HH:mm:ss")
  },

  CreatedIp : {
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

const Cource = module.exports = mongoose.model('Cource',CourceSchema);
