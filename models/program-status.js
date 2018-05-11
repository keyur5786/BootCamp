const mongoose = require("mongoose");
const moment = require("moment");
const ProgramStatusSchema = mongoose.Schema({
  CourseId :{
    type:String,
    require:true
  },

  StatusId : {
    type: Number,
    required: true
  },

  AcademyMstId:{
    type: String,
    required: true
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

  UpdatedByOn : {
    type: String,

  },

  UpdatedIp : {
    type: String,

  },

  Active : {
    type: Boolean,

  }
});

const Status = module.exports = mongoose.model('Status',ProgramStatusSchema);
