const mongoose = require("mongoose");
const moment = require("moment");

const ActivityLogSchema = mongoose.Schema({
  UserId : {
		type:String ,
		required: [true,"User Who Done This Action Is Not Found !"],
	},

  UserName : {
    type:String,
    required: [true,"User Name Is Required For Activity Log !"]
  },

  UserType : {
    type:String ,
    required: [true,"User Type Can Not Determine !"],
  },

  Page : {
    type:String ,
    required: [true,"Form Can Not Determine !"],
  },

  Action : {
    type:String ,
    required: [true,"Action Type Can Not Determine !"],
  },

  ImpectId : {
    type:String ,
    required: [true,"Record ID Can Not Determine !"],
  },

  CreatedOn : {
    type: String,
    default: moment().format("DD-MM-YYYY HH:mm:ss")
  },

  CreatedIp : {
    type: String,
  },

});

  const Activity = module.exports = mongoose.model('Activity',ActivityLogSchema);
