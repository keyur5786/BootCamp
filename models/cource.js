const mongoose = require("mongoose");
const moment = require("moment");
const CourceSchema = mongoose.Schema({
  ProgramType : {
		type: Number,
		required: [true,'Program Type Is Required Field !']
	},

  AcademyId : {
    type: String,
    ref: 'Academy',
    required: [true,'Select Academy From Dropdown Field !']
  },

  ProgramDuration : {
    type: Number,
    required: [true,'Program Duration Is Required Field !'],
    min: [1,'Program Duration Should Be Grater Than 1 Day !'],
    max: [3000,'Program Duration Should Be Less Than 3000 Day !'],
  },

	ProgramName : {
		type: String,
		required: [true,'Program Name Is Required Field !'],
    maxlength: [50,'Program Name Should Be Less Than 50 Characters !']
	},

  ProgramDescription : {
    type: String,
    required: [true,'Program Description Is Required Field !'],
    maxlength: [500,'Program Description Should Be Less Than 500 Characters !']
  },

  ProgramSubject : {
    type: String,
    required: [true,'Program Subject Is Required Field !'],
    maxlength: [50,'Program Subject Should Be Less Than 50 Characters !']
  },

  ProgramLocationId : {
    type: String,
    ref: 'Location',
    required: [true,'Program Location Is Required Field !']
  },

  Cost : {
    type: Number,
    required: [true,'Cost Is Required Field !'],
    min: [0,'Cost Should Not Be Negative !'],
  },

  StartDate : {
    type: String,
    required: [true,'Start Date Is Required Field !'],
  },

  EndDate :{
    type: String,
    required : [true,'End Date Is Required Field !']
  },

  StatusId :{
    type: String,
    default: 1
  },

  CareerServices :{
    type: Boolean,
    required : [true,'Career Services Is Required To Select !']
  },

  Financing :{
    type: Boolean,
    required : [true,'Financing Is Required To Select !']
  },

  Scholarship :{
    type: Boolean,
    required : [true,'Scholarship Is Required To Select !']
  },

	Length : {
		type: Number,
		required: [true,'Length Is Required Field !'],
    min: [1,'Length Should Not Be Less Than 1 !']
	},

  Classsize : {
    type: String,
    required: [true,'Classsize Is Required Field !'],
  },

  Commitment : {
    type: String,

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

const Cource = module.exports = mongoose.model('Cource',CourceSchema);
