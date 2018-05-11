const mongoose = require("mongoose");
const moment = require("moment");
const UserRightsSchema = mongoose.Schema({

  UserId : {
    type: Number,
  },

  FormName : {
    type: String,
  },

  Rights : {
    type: String,
  },

  Add : {
    type: Boolean,

  }

  Edit : {
    type: Boolean,

  }

  Delete : {
    type: Boolean,

  }

  View : {
    type: Boolean,

  }
  CreatedBy : {
    type: Number,

  },

  CreatedOn : {
    type: String,
    default: moment().format('DD/MM/YYYY HH:MM:SS')
  },

  CreatedIp : {
    type: String,

  },

  UpdatedBy : {
    type: Number,

  },

  UpdatedOn : {
    type: String,

  },

  UpdatedIp : {
    type: Number,

  },

  Active : {
    type: Boolean,

  }
});

const UserRights = module.exports = mongoose.model('UserRights',UserRightsSchema);
