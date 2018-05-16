const mongoose = require("mongoose");
const moment = require("moment");
const UserRightsSchema = mongoose.Schema({

  UserId : {
    type: String,
  },

  FormName : {
    type: String,
  },

  Rights : {
    type: String,
  },

  Add : {
    type: Boolean,

  },

  Edit : {
    type: Boolean,

  },

  Delete : {
    type: Boolean,

  },

  View : {
    type: Boolean,

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

const UserRights = module.exports = mongoose.model('UserRights',UserRightsSchema);
