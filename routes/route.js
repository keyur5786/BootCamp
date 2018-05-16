const express = require("express");
const router = express.Router();
var mongoose = require('mongoose');
const multer = require("multer");
const moment = require("moment");
const getIP = require('ipware')().get_ip;
var fs = require('fs');
var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');

const storage = multer.diskStorage({
    // set uploads folder
    destination: (req, file, cb) => {
        cb(null, './Bootcamp/src/assets/');
    },
    // set default filename
    filename: (req, file, cb) => {
        //cb(null, file.originalname); // overwrites current file with same name!!!
        let extArray = file.mimetype.split("/");
        let extension = extArray[extArray.length - 1];
        var d = new Date();
        //cb(null, file.originalname); // overwrites current file with same name!!!
        var custDate= "logo"+d.getDate()+d.getMonth()+d.getFullYear()+d.getHours()+d.getMinutes()+d.getSeconds()+"."+extension;
        //console.log("formate: "+custDate);
      //  fileName="logo"+d.getDate()+d.getMonth()+d.getFullYear()+d.getHours()+d.getMinutes()+d.getSeconds()+"."+extension;
        //localStorage.setItem('logo',fileName);
        //localStorage.removeItem('logo');
        localStorage.setItem('logo',custDate);
        console.log("file function var: "+custDate);
        console.log("file function local storage: "+localStorage.getItem('logo'));
        cb(null,localStorage.getItem('logo'));
        //cb(null,"logo"+moment().format('DDMMYYYYHHMMSS')+"."+extention[extention.length - 1]);
    }
});
const upload = multer({storage:storage});
//const upload = multer({dest:'./public/'});


// const storage = multer.diskStorage({
//   destination: function(req,file,cb){
//     cb(null,'../public');
//   },
//   filename: function(req,file,cb){
//     cb(null, file.originalname);
//   }
// });
//const upload = multer({storage:storage});

//const upload = multer({dest:'/../public'});
// Store contact.js schema into variable
const User = require("../models/user");
const Academy = require("../models/academy");
const UserRights = require("../models/UserRights");
const Cource=require("../models/cource");
const imageUpload = require("../models/image");
const Location=require("../models/Location");
const Status=require("../models/program-status");
const Registers=require("../models/register");
const Inquiry=require("../models/inquiry");
const ActivityLog = require("../models/activityLog");
// For User
// Retrive Data
router.get('/users',(req,res,next)=>{

  User.find()
  .sort({CreatedOn:-1})
  .then(User=>{
    res.json(User);
  })
  .catch(err=>{
    res.json(err);
  });
});

router.get("/getUserDetail/:userId",(req,res,next)=>{
  var UserArray = [];
  User.find({_id:req.params.userId})
  .then(User=>{
    UserArray.push(User);
    UserRights.find({UserId:req.params.userId})
    .then(Rights=>{
      UserArray.push(Rights);
      res.json(UserArray);
    })
    .catch(err=>{
      res.json(err);
    });
  })
  .catch(err=>{
    res.json(err);
  });
});

router.get('/GetRightsList',(req,res,next)=>{
  var rights=[];
  rights.push(
    {FormName:'User',Add:false,Edit:false,Delete:false,View:false},
    {FormName:'Course',Add:false,Edit:false,Delete:false,View:false},
    {FormName:'Academy',Add:false,Edit:false,Delete:false,View:false},
    {FormName:'Location',Add:false,Edit:false,Delete:false,View:false},
    {FormName:'ActivityLog',Add:false,Edit:false,Delete:false,View:false},
    {FormName:'Inquiries',Add:false,Edit:false,Delete:false,View:false}
  );
  res.json(rights);
});

router.get('/GetRightsListByUserId/:userId',(req,res,next)=>{
  ///console.log("route : "+req.params.userId);
  UserRights.find({UserId:req.params.userId})
  .then(data1=>{
      res.json(data1);
  })
  .catch(err=>{
    console.log("Error in getting rights = "+err);
    res.json("Error in getting rights = "+err);
  });
});

router.put('/updateRights',(req, res, next)=>{
  console.log(req.body);
  for(var i=0;i<req.body.length;i++){
    UserRights.findOneAndUpdate({_id:req.body[i].id},{
    	$set:{
        Add: req.body[i].add,
        Edit: req.body[i].edit,
        Delete: req.body[i].delete,
        View: req.body[i].view,
        UpdatedOn:req.body[i].UpdatedOn,
        UpdatedBy: req.body[i].UpdatedBy,
        UpdatedIp: getIP(req).clientIp
    	}},
      {runValidators:true},
      function(err,result){
        if(err){
          if(err.code===11000){
            var duplicateValue = err.message.match(/".*"/);
            res.status(200).json({"defaultError":duplicateValue[0]+" Is Alerady Exsist !"});
          }else{
            res.status(200).json({"error":err.message}||{"defaultError":"Error In Updation !"});
          }
        }else{
          //res.status(200).json({"success":"User Rights Updated Successfully !"});
        }
      });
  }
  res.status(200).json({"success":"User & Rights Updated Successfully !"});
});


// Insert Data
router.post('/Users',(req,res,next)=>{
  let newUser = new User({
    FirstName: req.body[0].newUser.FirstName,
    LastName: req.body[0].newUser.LastName,
    UserName: req.body[0].newUser.UserName,
    Password: req.body[0].newUser.Password,
    CreatedBy: req.body[0].newUser.CreatedBy,
    CreatedOn: req.body[0].newUser.CreatedOn,
    CreatedIp : getIP(req).clientIp
    //console.log(getIP(req)) =  { clientIp: '127.0.0.1', clientIpRoutable: false }
  });
  newUser.save()
.then(result  =>{
  let newActivityLog = new ActivityLog({
    UserId : req.body[0].newUser.CreatedBy,
    UserName : req.body[0].newUser.UserName,
    UserType : "Admin",
    Page : "User",
    Action : "Add",
    ImpectId : result._id,
    CreatedOn: req.body[0].newUser.CreatedOn,
    CreatedIp : getIP(req).clientIp
  });
  newActivityLog.save()
  .then(activity=>{
    for (var i = 0; i < req.body[1].rightsList.length; i++) {

      let rights = new UserRights({
        UserId:result._id,
        FormName: req.body[1].rightsList[i].FormName,
        Add: req.body[1].rightsList[i].Add,
        Edit: req.body[1].rightsList[i].Edit,
        Delete: req.body[1].rightsList[i].Delete,
        View: req.body[1].rightsList[i].View,
        CreatedBy: req.body[0].newUser.CreatedBy,
        CreatedOn: req.body[0].newUser.CreatedOn,
        CreatedIp : getIP(req).clientIp
      });
      rights.save()
      .then(result  =>{
        console.log("User Rights Saved !");
      });
    }
    res.status(200).json({"success":"User Saved Successfully !"});
  })
  .catch(err=>{
    if(err.code === 11000){
        var duplicateValue = err.message.match(/".*"/);
        res.status(200).json({"defaultError":duplicateValue[0]+" Is Already Exsist !"});
    }
    else{
      res.status(200).json({"error":err.message}||{"defaultError":'Error But Can Not Understood !'});
    }
  });
})
.catch(err => {
  if(err.code === 11000){
      var duplicateValue = err.message.match(/".*"/);
      res.status(200).json({"defaultError":duplicateValue[0]+" Is Already Exsist !"});
  }
  else{
    res.status(200).json({"error":err.message}||{"defaultError":'Error But Can Not Understood !'});
  }
});
});


// Deleting Data
router.delete('/Users/:id/:UserId/:UserName',(req, res, next)=>{
	User.remove({_id:req.params.id},function(err, result){
		if(err){
			res.json(err);
		}else{
      let newActivityLog = new ActivityLog({
        UserId : req.params.UserId,
        UserName : req.params.UserName,
        UserType : "Admin",
        Page : "User",
        Action : "Delete",
        ImpectId : req.params.id,
        CreatedIp : getIP(req).clientIp,
        CreatedOn : moment().format("DD-MM-YYYY HH:mm:ss")
      });
      newActivityLog.save()
      .then(activity=>{
        res.status(200).json({"success":"User Deleted Successfully !"});
      })
      .catch(err=>{
        if(err.code === 11000){
            var duplicateValue = err.message.match(/".*"/);
            res.status(200).json({"defaultError":duplicateValue[0]+" Is Already Exsist !"});
        }
        else{
          res.status(200).json({"error":err.message}||{"defaultError":'Error But Can Not Understood !'});
        }
      });
		}
	});
});

// Updating Data
router.put('/Users/:id',(req, res, next)=>{
	User.findOneAndUpdate({_id:req.params.id},{
		$set:{
      FirstName: req.body.FirstName,
      LastName: req.body.LastName,
      UserName: req.body.UserName,
      Password: req.body.Password,
      UpdatedOn:req.body.UpdatedOn,
      UpdatedBy: req.body.UpdatedBy,
      UpdatedIp: getIP(req).clientIp
		}},
    {runValidators:true},
    function(err,result){
      if(err){
        if(err.code===11000){
          var duplicateValue = err.message.match(/".*"/);
          res.status(200).json({"defaultError":duplicateValue[0]+" Is Alerady Exsist !"});
        }else{
          res.status(200).json({"error":err.message}||{"defaultError":"Error In Updation !"});
        }
      }else{
        let newActivityLog = new ActivityLog({
          UserId : req.body.UpdatedBy,
          UserName : req.body.ByUser,
          UserType : "Admin",
          Page : "User",
          Action : "Update",
          ImpectId : result._id,
          CreatedOn : req.body.UpdatedOn,
          CreatedIp : getIP(req).clientIp
        });
        newActivityLog.save()
        .then(activity=>{
          res.status(200).json({"success":"User Updated Successfully !"});
        })
        .catch(err=>{
          if(err.code === 11000){
              var duplicateValue = err.message.match(/".*"/);
              res.status(200).json({"defaultError":duplicateValue[0]+" Is Already Exsist !"});
          }
          else{
            res.status(200).json({"error":err.message}||{"defaultError":'Error But Can Not Understood !'});
          }
        });
      }
    });
});

//For Academy
// Get Academy Details
router.get('/academies',(req,res,next)=>{
  Academy.find()
  .sort({CreatedOn:-1})
  .then(Academy=>{
    res.json(Academy);
  })
  .catch(err=>{
    res.json(err);
  });
});

//for getting searched records search-cource
router.get('/academy/:id',(req,res,next)=>{
  Academy.find({_id:req.params.id})
  .then(Academy=>{
    res.json(Academy);
  })
  .catch(err=>{
    res.json(err);
  });
});
router.post('/imageuploadU', upload.single('file'), (req, res, next) => {
  console.log(req.file);
   res.status(200).json({"success":"File Upload Successfully !"});
});

router.post('/imageuploadR', upload.single('file'), (req, res, next) => {
  //console.log(req.file);
   res.status(200).json({"success":"File Upload Successfully !"});
});

// Insert Academy Details
router.post('/imageupload', upload.single('file'), (req, res, next) => {
   res.status(200).json({"success":"File Upload Successfully !"});
});

router.post('/imageuploadE', upload.single('fileE'), (req, res, next) => {
   res.status(200).json({"success":"File Upload Successfully !"});
});

router.post('/academy',(req,res,next)=>{
console.log("at insert: "+localStorage.getItem('logo'));
  let newAcademy = new Academy({
    AcademyName:  req.body.AcademyName,
    AcademyWebsite: req.body.AcademyWebsite,
    AcademyLogo: localStorage.getItem('logo'),
    AcademyProfileImage: req.body.AcademyProfileImage,
    AcademyFounded: req.body.AcademyFounded,
    Headquarters: req.body.Headquarters,
    AcademyDiscription:req.body.AcademyDiscription,
    ZipCode:req.body.ZipCode,
    EmailId:req.body.EmailId,
    Password:req.body.Password,
    CreatedBy:req.body.CreatedBy,
    CreatedIp:getIP(req).clientIp,
    CreatedOn:req.body.CreatedOn
  });
  newAcademy.save()
  .then(result =>{
    let newActivityLog = new ActivityLog({
      UserId : req.body.CreatedBy,
      UserName : req.body.UserName,
      UserType : req.body.UserType,
      Page : "Academy",
      Action : "Add",
      ImpectId : result._id,
      CreatedOn:req.body.CreatedOn,
      CreatedIp : getIP(req).clientIp
    });
    newActivityLog.save()
    .then(activity=>{
      res.status(200).json({"success":"Academy Saved Successfully !"});
    })
    .catch(err=>{
      if(err.code === 11000){
          var duplicateValue = err.message.match(/".*"/);
          res.status(200).json({"defaultError":duplicateValue[0]+" Is Already Exsist !"});
      }
      else{
        res.status(200).json({"error":err.message}||{"defaultError":'Error But Can Not Understood !'});
      }
    });
  })
  .catch(err => {
    if(err.code === 11000){
        var duplicateValue = err.message.match(/".*"/);
        res.status(200).json({"defaultError":duplicateValue[0]+" Is Already Exsist !"});
    }
    else{
      res.status(200).json({"error":err.message}||{"defaultError":'Error But Can Not Understood !'});
    }
  });
});

// Delete Academy Details
router.delete('/academy/:id/:UserId/:UserName',(req, res, next)=>{
  Cource.find({AcademyId:req.params.id})
  .then(data=>{
    if(data.length!=0){
      res.status(200).json({"defaultError":"Some Record Depend On This One So You Can't Delete It !"});
    }
    else{
      Inquiry.find({AcademyId:req.params.id})
      .then(data1=>{
        if(data1.length!=0){
          res.status(200).json({"defaultError":"Some Record Depend On This One So You Can't Delete It !"});
        }
        else{
          Academy.remove({_id:req.params.id},function(err, result){
        		if(err){
        			res.json(err);
        		}else{
              let newActivityLog = new ActivityLog({
                UserId : req.params.UserId,
                UserName : req.params.UserName,
                UserType : "Admin",
                Page : "Academy",
                Action : "Delete",
                ImpectId : req.params.id,
                CreatedIp : getIP(req).clientIp,
                CreatedOn :moment().format("DD-MM-YYYY HH:mm:ss")
              });
              newActivityLog.save()
              .then(activity=>{
                res.json({msg: "Academy Deleted Successfully !"});
              })
              .catch(err=>{
                if(err.code === 11000){
                    var duplicateValue = err.message.match(/".*"/);
                    res.status(200).json({"defaultError":duplicateValue[0]+" Is Already Exsist !"});
                }
                else{
                  res.status(200).json({"error":err.message}||{"defaultError":'Error But Can Not Understood !'});
                }
              });
        		}
        	});
        }
      });
    }
  });
});

//update academy
router.put('/academy/:id',(req, res, next)=>{
  console.log("at insert: "+localStorage.getItem('logo'));
	Academy.findOneAndUpdate({_id:req.params.id},{
		$set:{
      AcademyName:  req.body.AcademyName,
      AcademyWebsite: req.body.AcademyWebsite,
      AcademyLogo: localStorage.getItem('logo'),
      AcademyProfileImage:req.body.AcademyProfileImage,
      AcademyFounded: req.body.AcademyFounded,
      Headquarters: req.body.Headquarters,
      AcademyDiscription: req.body.AcademyDiscription,
      ZipCode: req.body.ZipCode,
      EmailId:req.body.EmailId,
      Password:req.body.Password,
      UpdatedOn:req.body.UpdatedOn,
      UpdatedBy:req.body.UpdatedBy,
      UpdatedIp:getIP(req).clientIp
		}},
  {runValidators:true},
  function(err,result){
    if(err){
      if(err.code===11000){
        var duplicateValue = err.message.match(/".*"/);
        localStorage.removeItem("logo");
        res.status(200).json({"defaultError":duplicateValue[0]+" Is Alerady Exsist !"});
      }else{
        localStorage.removeItem("logo");
        res.status(200).json({"error":err.message}||{"defaultError":"Error In Updation !"});
      }
    }else{
      localStorage.removeItem("logo");
      let newActivityLog = new ActivityLog({
        UserId : req.body.UpdatedBy,
        UserType : req.body.UserType,
        UserName : req.body.UserName,
        Page : "Academy",
        Action : "Update",
        ImpectId : result._id,
        CreatedIp : getIP(req).clientIp,
        CreatedOn : req.body.UpdatedOn
      });
      newActivityLog.save()
      .then(activity=>{
        res.status(200).json({"success":"Academy Updated Successfully !"});
      })
      .catch(err=>{
        if(err.code === 11000){
            var duplicateValue = err.message.match(/".*"/);
            res.status(200).json({"defaultError":duplicateValue[0]+" Is Already Exsist !"});
        }
        else{
          res.status(200).json({"error":err.message}||{"defaultError":'Error But Can Not Understood !'});
        }
      });
    }
  });
});

router.get('/cources',(req,res,next)=>{
  var data=[];
  // Get Data From 1st Table: Course
  Cource.find()
  .sort({CreatedOn:-1})
  .populate('AcademyId')
  .populate('ProgramLocationId')
  .then(cource=>{
    data.push(cource);
    // Get Data From Second Table: Academy
    Academy.find({Active:true})
    .then(academy=>{
      data.push(academy);
      // Get Data From 3rd Table location
      Location.find({Active:true})
      .then(location=>{
        data.push(location);
        res.json(data);
      });
    });
  });
});

router.get('/MyCources/:academyId',(req,res,next)=>{
  var data=[];
  // Get Data From 1st Table: Course
  Cource.find({AcademyId:req.params.academyId})
  .sort({CreatedOn:-1})
  .populate('AcademyId')
  .populate('ProgramLocationId')
  .then(cource=>{
    data.push(cource);
    // Get Data From Second Table: Academy
    Academy.find()
    .then(academy=>{
      data.push(academy);
      // Get Data From 3rd Table location
      Location.find()
      .then(location=>{
        data.push(location);
        res.json(data);
      });
    });
  });
});



//for getting searched records search-cource
router.get('/cources/:programId',(req,res,next)=>{
  var data=[];
  // Get Data From 1st Table: Course
  Cource.findOne({_id:req.params.programId})
  .populate('AcademyId')
  .populate('ProgramLocationId')
  .then(cource=>{
    data.push(cource);
    // Get Data From Second Table: Academy
    Academy.find()
    .then(academy=>{
      data.push(academy);
      // Get Data From 3rd Table location
      Location.find()
      .then(location=>{
        data.push(location);
        console.log(data);
        res.json(data);
      });
    });
  });
});

// Insert Data
router.post('/Cources',(req,res,next)=>{
  let newCource = new Cource({
    AcademyId:req.body.AcademyId,
    ProgramType:req.body.ProgramType,
    ProgramDuration:req.body.ProgramDuration,
    ProgramName:req.body.ProgramName,
    ProgramDescription:req.body.ProgramDescription,
    ProgramSubject:req.body.ProgramSubject,
    ProgramLocationId:req.body.ProgramLocationId,
    LocationName: req.body.LocationName,
    Cost:req.body.Cost,
    StartDate:req.body.StartDate,
    EndDate:req.body.EndDate,
    Length:req.body.Length,
    Classsize:req.body.Classsize,
    Commitment:req.body.Commitment,
    CareerServices:req.body.CareerServices,
    Financing:req.body.Financing,
    Scholarship:req.body.Scholarship,
    ByAcademy:req.body.ByAcademy,
    CreatedBy:req.body.CreatedBy,
    CreatedIp : getIP(req).clientIp,
    CreatedOn : req.body.CreatedOn
  });
  newCource.save()
  .then(result=>{
    let newStatus = new Status({
      CourseId : result._id,
      StatusId : 1,
      AcademyMstId : result.AcademyId,
      CreatedBy:req.body.CreatedBy,
      CreatedIp : getIP(req).clientIp,
      CreatedOn : req.body.CreatedOn
    });
    newStatus.save()
    .then(status=>{
      let newActivityLog = new ActivityLog({
        UserId : req.body.CreatedBy,
        UserName : req.body.UserName,
        UserType : req.body.UserType,
        Page : "Course",
        Action : "Add",
        ImpectId : result._id,
        CreatedIp : getIP(req).clientIp
      });
      newActivityLog.save()
      .then(activity=>{
        res.status(200).json({success:'Course Saved Successfully !'});
      })
      .catch(err=>{
        if(err.code === 11000){
            var duplicateValue = err.message.match(/".*"/);
            res.status(200).json({"defaultError":duplicateValue[0]+" Is Already Exsist !"});
        }
        else{
          res.status(200).json({"error":err.message}||{"defaultError":'Error But Can Not Understood !'});
        }
      });
      })
      .catch(err =>{
        res.json(err);
      })
})
  .catch(err => {
    if(err.code === 11000){
        var duplicateValue = err.message.match(/".*"/);
        res.status(200).json({"defaultError":duplicateValue[0]+" Is Already Exsist !"});
    }
    else{
      console.log("My Error = "+err);
      res.status(200).json({"error":err.message} || {"defaultError":"Error But Not Understood !"});
    }
});
});

// Deleting Data
router.delete('/Cources/:id/:UserId/:UserName/:UserType',(req, res, next)=>{
  Inquiry.find({CourseId:req.params.id})
  .then(data=>{
    if(data.length!=0){
      res.status(200).json({"defaultError":"Some Record Depended On This One So You Can't Delete It !"});
    }
    else{
      Cource.remove({_id:req.params.id},function(err, result){
    		if(err){
    			res.json(err);
    		}else{
          let newActivityLog = new ActivityLog({
            UserId : req.params.UserId,
            UserName : req.params.UserName,
            UserType : req.params.UserType,
            Page : "Course",
            Action : "Delete",
            ImpectId : req.params.id,
            CreatedIp : getIP(req).clientIp,
            CreatedOn : moment().format("DD-MM-YYYY HH:mm:ss")
          });
          newActivityLog.save()
          .then(activity=>{
            res.json({msg: "Cource Deleted Successfully"});
          })
          .catch(err=>{
            if(err.code === 11000){
                var duplicateValue = err.message.match(/".*"/);
                res.status(200).json({"defaultError":duplicateValue[0]+" Is Already Exsist !"});
            }
            else{
              res.status(200).json({"error":err.message}||{"defaultError":'Error But Can Not Understood !'});
            }
          });
    		}
    	});
    }
  });
});

// Updating Data
router.put('/Cources/:id',(req, res, next)=>{
  console.log(req.params.id);
	Cource.findOneAndUpdate({_id:req.params.id},{
		$set:{
      AcademyId:req.body.AcademyId,
      ProgramType:req.body.ProgramType,
      ProgramDuration:req.body.ProgramDuration,
      ProgramName:req.body.ProgramName,
      ProgramDescription:req.body.ProgramDescription,
      ProgramSubject:req.body.ProgramSubject,
      ProgramLocationId:req.body.ProgramLocationId,
      LocationName:req.body.LocationName,
      Cost:req.body.Cost,
      StartDate:req.body.StartDate,
      EndDate:req.body.EndDate,
      Length:req.body.Length,
      Classsize:req.body.Classsize,
      Commitment:req.body.Commitment,
      CareerServices:req.body.CareerServices,
      Financing:req.body.Financing,
      Scholarship:req.body.Scholarship,
      UpdatedOn:req.body.UpdatedOn,
      UpdatedBy:req.body.UpdatedBy,
      UpdatedIp : getIP(req).clientIp
		}},
  {runValidators:true},
  function(err,result){
    if(err){
      if(err.code===11000){
        var duplicateValue = err.message.match(/".*"/);
        res.status(200).json({"defaultError":duplicateValue[0]+" Is Alerady Exsist !"});
      }else{
        res.status(200).json({"error":err.message}||{"defaultError":"Error In Updation !"});
      }
    }else{
      let newActivityLog = new ActivityLog({
        UserId : req.body.UpdatedBy,
        UserName : req.body.UserName,
        UserType : req.body.UserType,
        Page : "Course",
        Action : "Update",
        ImpectId : result._id,
        CreatedIp : getIP(req).clientIp,
        CreatedOn : req.body.UpdatedOn
      });
      newActivityLog.save()
      .then(activity=>{
          res.status(200).json({"success":"Course Updated Successfully !"});
      })
      .catch(err=>{
        if(err.code === 11000){
            var duplicateValue = err.message.match(/".*"/);
            res.status(200).json({"defaultError":duplicateValue[0]+" Is Already Exsist !"});
        }
        else{
          res.status(200).json({"error":err.message}||{"defaultError":'Error But Can Not Understood !'});
        }
      });

    }
  });
});

router.get('/changeStatus/:statusRecordId/:statusId/:academyid/:createdBy/:UserType/:UserName',(req,res,next)=>{
  Cource.findOneAndUpdate({_id:req.params.statusRecordId},{$set:{StatusId:req.params.statusId}})
  .then(data=>{
    //res.status(200).json("Course Status Changed Successfully !");
      let newStatus = new Status({
        CourseId : req.params.statusRecordId,
        StatusId : req.params.statusId,
        AcademyMstId : req.params.academyid,
        CreatedBy:req.params.createdBy,
        CreatedIp : getIP(req).clientIp,
        CreatedOn :moment().format("DD-MM-YYYY HH:mm:ss")
      });
      newStatus.save()
      .then(status=>{
        let newActivityLog = new ActivityLog({
          UserId : req.params.createdBy,
          UserName : req.params.UserName,
          UserType : req.params.UserType,
          Page : "Course",
          Action : "Change Status",
          ImpectId : data._id,
          CreatedIp : getIP(req).clientIp,
          CreatedOn : moment().format("DD-MM-YYYY HH:mm:ss")
        });
        newActivityLog.save()
        .then(activity=>{
          res.status(200).json("Course Status Changed Successfully !");
        })
        .catch(err=>{
          if(err.code === 11000){
              var duplicateValue = err.message.match(/".*"/);
              res.status(200).json({"defaultError":duplicateValue[0]+" Is Already Exsist !"});
          }
          else{
            res.status(200).json({"error":err.message}||{"defaultError":'Error But Can Not Understood !'});
          }
        });

        })
        .catch(err =>{
          res.json(err);
        });
  })
  .catch(err=>{
    res.json(err);
  });
});

// Test Image Upload test
router.get('/images',(req,res,next)=>{
  imageUpload.find(function(err,images){
    res.json(images);
  });
});

// Insert Image Code
router.post('/image',(req,res,next)=>{
  console.log("Route Data = "+req.body.title);
  console.log("Route Header = "+req.body.upload);
  console.log("Route File = "+req.body.uploadFile[0]);
  // let newImage = new imageUpload({
  //   title:req.body.title,
  //   upload:req.body.upload,
  // });
  // newImage.save((err,image)=>{
  //   if(err){
  //     res.status(500).json({msg:'Failed To Add Image : '+err});
  //   }else{
  //     res.json({msg:'Image Saved'});
  //   }
  // });
});

router.get('/authenticate/:UserName/:Password',(req,res,next)=>{
  User.find({UserName:req.params.UserName,Password:req.params.Password}).exec()
  .then(user=>{
    if(user.length<1){
      // return res.status(401).json({
      //   message:"User does not exsist"
      // });
      return res.json("Username & Password is wrong!");
    }else if(user[0].Active==false){
      return res.json("You Are Deactivated, To Be Active Met To Admin !");
    }
    else{
      console.log("User From Route = "+user[0].Active);
      let newActivityLog = new ActivityLog({
        UserId : user[0]._id,
        UserName : user[0].UserName,
        UserType : "Admin",
        Page : "Login",
        Action : "Login",
        ImpectId : user[0]._id,
        CreatedIp : getIP(req).clientIp,
        CreatedOn : moment().format("DD-MM-YYYY HH:mm:ss")
      });
      newActivityLog.save()
      .then(activity=>{
          return res.json(user);
      })
      .catch(err=>{
        if(err.code === 11000){
            var duplicateValue = err.message.match(/".*"/);
            res.status(200).json({"defaultError":duplicateValue[0]+" Is Already Exsist !"});
        }
        else{
          console.log("Activity Log = "+err);
          res.status(200).json({"error":err.message}||{"defaultError":'Error But Can Not Understood !'});
        }
      });
    }
  })
  .catch(err=>{
    console.log(err);
    return res.status(500).json({
      error:err
    });
  });
  });

  router.post('/authenticateAcademy',(req,res,next)=>{
    console.log("From Route "+JSON.stringify(req.body));
    Academy.find({EmailId:req.body.Email,Password:req.body.Password}).exec()
    .then(academy=>{
      if(academy.length<1){
        return res.json("Email & Password is wrong!");
      }
      else if(academy[0].Active==false){
        return res.json("You Are Deactivated, To Be Active Met To Admin !");
      }
      else{
        let newActivityLog = new ActivityLog({
          UserId : academy[0]._id,
          UserName : academy[0].AcademyName || req.body.Email,
          UserType : "Academy",
          Page : "Login",
          Action : "Login",
          ImpectId : academy[0]._id,
          CreatedIp : getIP(req).clientIp,
          CreatedOn : moment().format("DD-MM-YYYY HH:mm:ss")
        });
        newActivityLog.save()
        .then(activity=>{
            return res.json(academy);
        })
        .catch(err=>{
          if(err.code === 11000){
              var duplicateValue = err.message.match(/".*"/);
              res.status(200).json({"defaultError":duplicateValue[0]+" Is Already Exsist !"});
          }
          else{
            console.log("Activity Log = "+err);
            res.status(200).json({"error":err.message}||{"defaultError":'Error But Can Not Understood !'});
          }
        });
      }
    })
    .catch(err=>{
      console.log(err);
      return res.status(500).json({
        error:err
      });
    });
    });

  // For location master
  // Retrive Data
  router.get('/locates',(req,res,next)=>{
    Location.find()
    .sort({CreatedOn:-1})
    .then(Locations=>{
      res.json(Locations);
    })
    .catch(err=>{
      res.json(err);
    });
  });

  // Insert Data
  router.post('/Locates',(req,res,next)=>{
    let newLocate = new Location({
      Loc_name: req.body.Loc_name,
      CreatedBy: req.body.CreatedBy,
      CreatedIp : getIP(req).clientIp,
      CreatedOn : req.body.CreatedOn
    });
    newLocate.save()
    .then(result =>{
      let newActivityLog = new ActivityLog({
        UserId : req.body.CreatedBy,
        UserName : req.body.UserName,
        UserType : req.body.UserType,
        Page : "Location",
        Action : "Add",
        ImpectId : result._id,
        CreatedIp : getIP(req).clientIp,
        CreatedOn : req.body.CreatedOn
      });
      newActivityLog.save()
      .then(activity=>{
        res.status(200).json({"success":"Location Saved Successfully !"});
      })
      .catch(err=>{
        if(err.code === 11000){
            var duplicateValue = err.message.match(/".*"/);
            res.status(200).json({"defaultError":duplicateValue[0]+" Is Already Exsist !"});
        }
        else{
          res.status(200).json({"error":err.message}||{"defaultError":'Error But Can Not Understood !'});
        }
      });
    })
    .catch(err => {
      if(err.code === 11000){
          var duplicateValue = err.message.match(/".*"/);
          res.status(200).json({"defaultError":duplicateValue[0]+" Is Already Exsist !"});
      }
      else{
        res.status(200).json({"error":err.message}||{"defaultError":'Error But Can Not Understood !'});
      }
    });
  });

  // Deleting Data
  router.delete('/Locates/:id/:UserId/:UserName',(req, res, next)=>{
    Cource.find({ProgramLocationId:req.params.id})
    .then(data=>{
      if(data.length!=0){
        res.status(200).json({"defaultError":"Some Record Depend On This One So You Can't Delete It !"});
      }else{
        Location.remove({_id:req.params.id},function(err, result){
      		if(err){
      			res.json(err);
      		}else{
            let newActivityLog = new ActivityLog({
              UserId : req.params.UserId,
              UserName : req.params.UserName,
              UserType : "Admin",
              Page : "Location",
              Action : "Delete",
              ImpectId : req.params.id,
              CreatedIp : getIP(req).clientIp,
              CreatedOn : moment().format("DD-MM-YYYY HH:mm:ss")
            });
            newActivityLog.save()
            .then(activity=>{
              res.json({msg: "Location Deleted Successfully"});
            })
            .catch(err=>{
              if(err.code === 11000){
                  var duplicateValue = err.message.match(/".*"/);
                  res.status(200).json({"defaultError":duplicateValue[0]+" Is Already Exsist !"});
              }
              else{
                console.log("Activity Log = "+err);
                res.status(200).json({"error":err.message}||{"defaultError":'Error But Can Not Understood !'});
              }
            });
      		}
      	});
      }
    });
  });

  // Updating Data
  router.put('/Locates/:id',(req, res, next)=>{
  	Location.findOneAndUpdate({_id:req.params.id},
      {$set:{
        Loc_name: req.body.Loc_name,
        UpdatedOn:req.body.UpdatedOn,
        UpdatedBy: req.body.UpdatedBy,
        UpdatedIp : getIP(req).clientIp
  		}},
      {runValidators:true},
      function(err,result){
        if(err){
          if(err.code===11000){
            var duplicateValue = err.message.match(/".*"/);
            res.status(200).json({"defaultError":duplicateValue[0]+" Is Alerady Exsist !"});
          }else{
            res.status(200).json({"error":err.message}||{"defaultError":"Error In Updation !"});
          }
        }else{
          let newActivityLog = new ActivityLog({
            UserId : req.body.UpdatedBy,
            UserName : req.body.UserName,
            UserType : "Admin",
            Page : "Location",
            Action : "Update",
            ImpectId : result._id,
            CreatedIp : getIP(req).clientIp,
            CreatedOn : req.body.UpdatedOn
          });
          newActivityLog.save()
          .then(activity=>{
            res.status(200).json({"success":"Location Updated Successfully !"});
          })
          .catch(err=>{
            if(err.code === 11000){
                var duplicateValue = err.message.match(/".*"/);
                res.status(200).json({"defaultError":duplicateValue[0]+" Is Already Exsist !"});
            }
            else{
              res.status(200).json({"error":err.message}||{"defaultError":'Error But Can Not Understood !'});
            }
          });
        }
      });
    });




// for program-status
router.post('/Registers',(req,res,next)=>{
  let newAcademy = new Academy({
    EmailId:req.body.EmailId,
    Password:req.body.Password,
    CreatedBy:req.body.CreatedBy,
    CreatedIp : getIP(req).clientIp,
    CreatedOn : moment().format("DD-MM-YYYY HH:mm:ss")
  });
  newAcademy.save((err,academy)=>{
    if(err){
      console.log(err);
      res.json({msg:'Failed To Add Academy : '+err});
    }else{
      let newActivityLog = new ActivityLog({
        UserId : req.body.CreatedBy,
        UserName : req.body.EmailId,
        UserType : "Academy",
        Page : "Register",
        Action : "Register First Time",
        ImpectId : academy._id,
        CreatedIp : getIP(req).clientIp,
        CreatedOn : req.body.CreatedOn
      });
      newActivityLog.save()
      .then(activity=>{
        res.json("Data Saved "+academy);
      })
      .catch(err=>{
        if(err.code === 11000){
            var duplicateValue = err.message.match(/".*"/);
            res.status(200).json({"defaultError":duplicateValue[0]+" Is Already Exsist !"});
        }
        else{
          res.status(200).json({"error":err.message}||{"defaultError":'Error But Can Not Understood !'});
        }
      });
    }
  });
});


router.put('/RegisterAcademy',(req,res,next)=>{
  console.log(req.body.AcademyId);
  Academy.findOneAndUpdate({_id:req.body.AcademyId},{
    $set:{
      AcademyName: req.body.AcademyName,
      AcademyWebsite: req.body.AcademyWebsite,
      AcademyLogo: localStorage.getItem('logo'),
      AcademyFounded: req.body.AcademyFounded,
      Headquarters:req.body.Headquarters,
      AcademyDiscription:req.body.AcademyDiscription,
      ZipCode:req.body.ZipCode,
      UpdatedOn:req.body.UpdatedOn,
      UpdatedBy:req.body.UpdatedBy,
      UpdatedIp : getIP(req).clientIp
    }},
    {runValidators:true},
    function(err,result){
      if(err){
        if(err.code===11000){
          var duplicateValue = err.message.match(/".*"/);
          res.status(200).json({"defaultError":duplicateValue[0]+" Is Alerady Exsist !"});
        }else{
          res.status(200).json({"error":err.message}||{"defaultError":"Error In Updation !"});
        }
      }else{
        let newActivityLog = new ActivityLog({
          UserId : req.body.UpdatedBy,
          UserName : "By Self",
          UserType : "Academy",
          Page : "Register",
          Action : "Add Profile First Time",
          ImpectId : result._id,
          CreatedIp : getIP(req).clientIp,
          CreatedOn : req.body.CreatedOn
        });
        newActivityLog.save()
        .then(activity=>{
          res.status(200).json({"success":"Academy Profile Save Successfully !"});
        })
        .catch(err=>{
          if(err.code === 11000){
              var duplicateValue = err.message.match(/".*"/);
              res.status(200).json({"defaultError":duplicateValue[0]+" Is Already Exsist !"});
          }
          else{
            res.status(200).json({"error":err.message}||{"defaultError":'Error But Can Not Understood !'});
          }
        });
      }
    });
  // function(err,result){
  //   if(err){
  //     console.log(err);
  //   }else{
  //     res.json(result);
  //   }
  // });
})

//for academy profile Update
// Get Academy Details
router.get('/getAcademyProfile/:academyId',(req,res,next)=>{
  Academy.find({_id:req.params.academyId})
  .then(academy=>{
    res.json(academy);
  })
  .catch(err=>{
    res.json(err);
  });
});

router.put('/updateprofile',(req,res,next)=>{
  Academy.findOneAndUpdate({_id:req.body.AcademyId},{
    $set:{
      AcademyName: req.body.AcademyName,
      AcademyWebsite: req.body.AcademyWebsite,
      AcademyLogo: localStorage.getItem('logo'),
      AcademyFounded: req.body.AcademyFounded,
      Headquarters:req.body.Headquarters,
      AcademyDiscription:req.body.AcademyDiscription,
      ZipCode:req.body.ZipCode,
      UpdatedOn:req.body.UpdatedOn,
      UpdatedBy:req.body.UpdatedBy,
      UpdatedIp : getIP(req).clientIp
    }},
    {runValidators:true},
    function(err,result){
      if(err){
        if(err.code===11000){
          var duplicateValue = err.message.match(/".*"/);
          res.status(200).json({"defaultError":duplicateValue[0]+" Is Alerady Exsist !"});
        }else{
          res.status(200).json({"error":err.message}||{"defaultError":"Error In Updation !"});
        }
      }else{
        let newActivityLog = new ActivityLog({
          UserId : req.body.UpdatedBy,
          UserName : req.body.UserName,
          UserType : "Academy",
          Page : "Academy Profile",
          Action : "Update",
          ImpectId : result._id,
          CreatedIp : getIP(req).clientIp,
          CreatedOn : req.body.UpdatedOn
        });
        newActivityLog.save()
        .then(activity=>{
          res.status(200).json({"success":"Profile updatation Successfully !"});
        })
        .catch(err=>{
          if(err.code === 11000){
              var duplicateValue = err.message.match(/".*"/);
              res.status(200).json({"defaultError":duplicateValue[0]+" Is Already Exsist !"});
          }
          else{
            res.status(200).json({"error":err.message}||{"defaultError":'Error But Can Not Understood !'});
          }
        });
      }
    });
  // function(err,result){
  //   if(err){
  //     console.log(err);
  //   }else{
  //     res.json(result);
  //   }
  // });
})
//end profileupdation

router.post('/imageupload', upload.single('file'), (req, res, next) => {
    console.log('post file with content:');
    console.log(req.file);
});

  router.get('/SearchCourse/:ProgramName/:ProgramType/:Location',(req,res,next)=>{
    //console.log("From Route out");
  //  console.log(req.params.ProgramName+"|"+req.params.ProgramType+"|"+ req.params.Location);
    if(req.params.ProgramName != "null")
    {
      //console.log("From Route in name");
      Cource.find({ProgramName:new RegExp(req.params.ProgramName,'i'),Active:true})
      .populate('AcademyId')
      .populate('ProgramLocationId')
      .then(data1=>{
          res.json(data1);
      })
      .catch(err=>{
        console.log("From Route Error = "+err);
        res.json(err);
      });
      return true;
    }

    if(req.params.ProgramType != "null")
    {
      //console.log("From Route in type");
      Cource.find({ProgramType:req.params.ProgramType,Active:true})
      .populate('AcademyId')
      .populate('ProgramLocationId')
      .then(data1=>{
          res.json(data1);
      })
      .catch(err=>{
        console.log("From Route Error = "+err);
        res.json(err);
      });
      return true;
    }

    if(req.params.ProgramName != "null" && req.params.ProgramType != "null")
    {
      //console.log("From Route in both");
      Cource.find({ProgramName:new RegExp(req.params.ProgramName,'i'),ProgramType:req.params.ProgramType,Active:true})
      .populate('AcademyId')
      .populate('ProgramLocationId')
      .then(data1=>{
          res.json(data1);
      })
      .catch(err=>{
        console.log("From Route Error = "+err);
        res.json(err);
      });
      return true;
    }
});

// router.get('/GetRightsList',(req,res,next)=>{
//
// });

router.post('/Inquiry',function(req,res,next){
  let newInquiry = new Inquiry({
    AcademyId:req.body.AcademyId,
    CourseId:req.body.CourseId,
    Phone:req.body.Phone,
    EmailId:req.body.EmailId,
    Name:req.body.Name,
    Notes:req.body.Notes,
    CreatedIp : getIP(req).clientIp,
    CreatedOn : moment().format("DD-MM-YYYY HH:mm:ss")
  });
  newInquiry.save()
  .then(result =>{
    res.status(200).json({"success":"Inquiry Submitted Successfully !"});
  })
  .catch(err => {
    if(err.code === 11000){
        var duplicateValue = err.message.match(/".*"/);
        res.status(200).json({"defaultError":duplicateValue[0]+" Is Already Exsist !"});
    }
    else{
      res.status(200).json({"error":err.message}||{"defaultError":'Error But Can Not Understood !'});
    }
  });
  });

router.get('/academyCourses/:id',function(req,res,next){
  // Get Data From 1st Table: Course
  Cource.find({AcademyId:req.params.id})
  .populate('AcademyId')
  .populate('ProgramLocationId')
  .then(cource=>{
    res.json(cource);
  })
  .catch(err=>{
    res.json(err);
  });
});

router.get('/InquiryList',function(req,res,next){
  Inquiry.find()
  .sort({CreatedOn:-1})
  .populate('AcademyId')
  .populate('CourseId')
  .then(inquiry=>{
    res.json(inquiry);
  })
  .catch(err=>{
    res.json(err);
  });
});

router.get('/InquiryList1/:academyID',function(req,res,next){
  Inquiry.find({AcademyId:req.params.academyID})
  .sort({CreatedOn:-1})
  .populate('AcademyId')
  .populate('CourseId')
  .then(inquiry=>{
    res.json(inquiry);
  })
  .catch(err=>{
    res.json(err);
  });
});

//for activity logs
router.get('/Getactivity',function(req,res,next){
  ActivityLog.find()
  .sort({CreatedOn:-1})
  .then(activity=>{
    res.json(activity);
  })
  .catch(err=>{
    res.json(err);
  });
});

router.get('/logoutUser/:id/:UserName',function(req,res,next){
  let newActivityLog = new ActivityLog({
    UserId : req.params.id,
    UserName : req.params.UserName,
    UserType : "Admin",
    Page : "Logout",
    Action : "Logout",
    ImpectId : req.params.id,
    CreatedIp : getIP(req).clientIp,
    CreatedOn : moment().format("DD-MM-YYYY HH:mm:ss")
  });
  newActivityLog.save()
  .then(activity=>{
    res.status(200).json({"success":"Logout Successfully !"});
  })
  .catch(err=>{
    if(err.code === 11000){
        var duplicateValue = err.message.match(/".*"/);
        res.status(200).json({"defaultError":duplicateValue[0]+" Is Already Exsist !"});
    }
    else{
      res.status(200).json({"error":err.message}||{"defaultError":'Error But Can Not Understood !'});
    }
  });
});

router.get('/logoutAcademy/:id/:UserName',function(req,res,next){
  let newActivityLog = new ActivityLog({
    UserId : req.params.id,
    UserName : req.params.UserName,
    UserType : "Academy",
    Page : "Logout",
    Action : "Logout",
    ImpectId : req.params.id,
    CreatedIp : getIP(req).clientIp,
    CreatedOn : moment().format("DD-MM-YYYY HH:mm:ss")
  });
  newActivityLog.save()
  .then(activity=>{
    res.status(200).json({"success":"Logout Successfully !"});
  })
  .catch(err=>{
    if(err.code === 11000){
        var duplicateValue = err.message.match(/".*"/);
        res.status(200).json({"defaultError":duplicateValue[0]+" Is Already Exsist !"});
    }
    else{
      res.status(200).json({"error":err.message}||{"defaultError":'Error But Can Not Understood !'});
    }
  });
});

router.put('/activateUser',function(req,res,next){
  User.findOneAndUpdate({_id:req.body.userId},{
    $set:{
      Active: true,
      UpdatedOn:moment().format("DD-MM-YYYY HH:mm:ss"),
      UpdatedBy:req.body.UpdatedBy,
      UpdatedIp : getIP(req).clientIp
    }},
    {runValidators:true},
    function(err,result){
      if(err){
        if(err.code===11000){
          var duplicateValue = err.message.match(/".*"/);
          res.status(200).json({"defaultError":duplicateValue[0]+" Is Alerady Exsist !"});
        }else{
          res.status(200).json({"error":err.message}||{"defaultError":"Error In Updation !"});
        }
      }else{
        let newActivityLog = new ActivityLog({
          UserId : req.body.UpdatedBy,
          UserName : req.body.UserName,
          UserType : "Admin",
          Page : "User",
          Action : "Activate User",
          ImpectId : result._id,
          CreatedIp : getIP(req).clientIp,
          CreatedOn : moment().format("DD-MM-YYYY HH:mm:ss")
        });
        newActivityLog.save()
        .then(activity=>{
          res.status(200).json({"success":"User Activated Successfully !"});
        })
        .catch(err=>{
          if(err.code === 11000){
              var duplicateValue = err.message.match(/".*"/);
              res.status(200).json({"defaultError":duplicateValue[0]+" Is Already Exsist !"});
          }
          else{
            res.status(200).json({"error":err.message}||{"defaultError":'Error But Can Not Understood !'});
          }
        });
      }
    });
});

router.put('/deactivateUser',function(req,res,next){
  User.findOneAndUpdate({_id:req.body.userId},{
    $set:{
      Active: false,
      UpdatedOn:moment().format("DD-MM-YYYY HH:mm:ss"),
      UpdatedBy:req.body.UpdatedBy,
      UpdatedIp : getIP(req).clientIp
    }},
    {runValidators:true},
    function(err,result){
      if(err){
        if(err.code===11000){
          var duplicateValue = err.message.match(/".*"/);
          res.status(200).json({"defaultError":duplicateValue[0]+" Is Alerady Exsist !"});
        }else{
          res.status(200).json({"error":err.message}||{"defaultError":"Error In Updation !"});
        }
      }else{
        let newActivityLog = new ActivityLog({
          UserId : req.body.UpdatedBy,
          UserName : req.body.UserName,
          UserType : "Admin",
          Page : "User",
          Action : "Dectivate User",
          ImpectId : result._id,
          CreatedIp : getIP(req).clientIp,
          CreatedOn : moment().format("DD-MM-YYYY HH:mm:ss")
        });
        newActivityLog.save()
        .then(activity=>{
          res.status(200).json({"success":"User Dectivated Successfully !"});
        })
        .catch(err=>{
          if(err.code === 11000){
              var duplicateValue = err.message.match(/".*"/);
              res.status(200).json({"defaultError":duplicateValue[0]+" Is Already Exsist !"});
          }
          else{
            res.status(200).json({"error":err.message}||{"defaultError":'Error But Can Not Understood !'});
          }
        });
      }
    });
});

router.put('/activateCourse',function(req,res,next){
  Cource.findOneAndUpdate({_id:req.body.courseId},{
    $set:{
      Active: true,
      UpdatedOn:moment().format("DD-MM-YYYY HH:mm:ss"),
      UpdatedBy:req.body.UpdatedBy,
      UpdatedIp : getIP(req).clientIp
    }},
    {runValidators:true},
    function(err,result){
      if(err){
        if(err.code===11000){
          var duplicateValue = err.message.match(/".*"/);
          res.status(200).json({"defaultError":duplicateValue[0]+" Is Alerady Exsist !"});
        }else{
          res.status(200).json({"error":err.message}||{"defaultError":"Error In Updation !"});
        }
      }else{
        let newActivityLog = new ActivityLog({
          UserId : req.body.UpdatedBy,
          UserName : req.body.UserName,
          UserType : req.body.UserType,
          Page : "Couse",
          Action : "Activate Couse",
          ImpectId : result._id,
          CreatedIp : getIP(req).clientIp,
          CreatedOn : moment().format("DD-MM-YYYY HH:mm:ss")
        });
        newActivityLog.save()
        .then(activity=>{
          res.status(200).json({"success":"Couse Activated Successfully !"});
        })
        .catch(err=>{
          if(err.code === 11000){
              var duplicateValue = err.message.match(/".*"/);
              res.status(200).json({"defaultError":duplicateValue[0]+" Is Already Exsist !"});
          }
          else{
            res.status(200).json({"error":err.message}||{"defaultError":'Error But Can Not Understood !'});
          }
        });
      }
    });
});

router.put('/deactivateCourse',function(req,res,next){
  Cource.findOneAndUpdate({_id:req.body.courseId},{
    $set:{
      Active: false,
      UpdatedOn:moment().format("DD-MM-YYYY HH:mm:ss"),
      UpdatedBy:req.body.UpdatedBy,
      UpdatedIp : getIP(req).clientIp
    }},
    {runValidators:true},
    function(err,result){
      if(err){
        if(err.code===11000){
          var duplicateValue = err.message.match(/".*"/);
          res.status(200).json({"defaultError":duplicateValue[0]+" Is Alerady Exsist !"});
        }else{
          res.status(200).json({"error":err.message}||{"defaultError":"Error In Updation !"});
        }
      }else{
        let newActivityLog = new ActivityLog({
          UserId : req.body.UpdatedBy,
          UserName : req.body.UserName,
          UserType : req.body.UserType,
          Page : "Course",
          Action : "Dectivate Course",
          ImpectId : result._id,
          CreatedIp : getIP(req).clientIp,
          CreatedOn : moment().format("DD-MM-YYYY HH:mm:ss")
        });
        newActivityLog.save()
        .then(activity=>{
          res.status(200).json({"success":"Course Dectivated Successfully !"});
        })
        .catch(err=>{
          if(err.code === 11000){
              var duplicateValue = err.message.match(/".*"/);
              res.status(200).json({"defaultError":duplicateValue[0]+" Is Already Exsist !"});
          }
          else{
            res.status(200).json({"error":err.message}||{"defaultError":'Error But Can Not Understood !'});
          }
        });
      }
    });
});

router.put('/activateAcademy',function(req,res,next){
  Academy.findOneAndUpdate({_id:req.body.academyId},{
    $set:{
      Active: true,
      UpdatedOn:moment().format("DD-MM-YYYY HH:mm:ss"),
      UpdatedBy:req.body.UpdatedBy,
      UpdatedIp : getIP(req).clientIp
    }},
    {runValidators:true},
    function(err,result){
      if(err){
        if(err.code===11000){
          var duplicateValue = err.message.match(/".*"/);
          res.status(200).json({"defaultError":duplicateValue[0]+" Is Alerady Exsist !"});
        }else{
          res.status(200).json({"error":err.message}||{"defaultError":"Error In Updation !"});
        }
      }else{
        let newActivityLog = new ActivityLog({
          UserId : req.body.UpdatedBy,
          UserName : req.body.UserName,
          UserType : "Admin",
          Page : "Academy",
          Action : "Activate Academy",
          ImpectId : result._id,
          CreatedIp : getIP(req).clientIp,
          CreatedOn : moment().format("DD-MM-YYYY HH:mm:ss")
        });
        newActivityLog.save()
        .then(activity=>{
          res.status(200).json({"success":"Academy Activated Successfully !"});
        })
        .catch(err=>{
          if(err.code === 11000){
              var duplicateValue = err.message.match(/".*"/);
              res.status(200).json({"defaultError":duplicateValue[0]+" Is Already Exsist !"});
          }
          else{
            res.status(200).json({"error":err.message}||{"defaultError":'Error But Can Not Understood !'});
          }
        });
      }
    });
});

router.put('/deactivateAcademy',function(req,res,next){
  Academy.findOneAndUpdate({_id:req.body.academyId},{
    $set:{
      Active: false,
      UpdatedOn:moment().format("DD-MM-YYYY HH:mm:ss"),
      UpdatedBy:req.body.UpdatedBy,
      UpdatedIp : getIP(req).clientIp
    }},
    {runValidators:true},
    function(err,result){
      if(err){
        if(err.code===11000){
          var duplicateValue = err.message.match(/".*"/);
          res.status(200).json({"defaultError":duplicateValue[0]+" Is Alerady Exsist !"});
        }else{
          res.status(200).json({"error":err.message}||{"defaultError":"Error In Updation !"});
        }
      }else{
        let newActivityLog = new ActivityLog({
          UserId : req.body.UpdatedBy,
          UserName : req.body.UserName,
          UserType : "Admin",
          Page : "Academy",
          Action : "Dectivate Academy",
          ImpectId : result._id,
          CreatedIp : getIP(req).clientIp,
          CreatedOn : moment().format("DD-MM-YYYY HH:mm:ss")
        });
        newActivityLog.save()
        .then(activity=>{
          res.status(200).json({"success":"Academy Dectivated Successfully !"});
        })
        .catch(err=>{
          if(err.code === 11000){
              var duplicateValue = err.message.match(/".*"/);
              res.status(200).json({"defaultError":duplicateValue[0]+" Is Already Exsist !"});
          }
          else{
            res.status(200).json({"error":err.message}||{"defaultError":'Error But Can Not Understood !'});
          }
        });
      }
    });
});

router.put('/activateLocation',function(req,res,next){
  Location.findOneAndUpdate({_id:req.body.locationId},{
    $set:{
      Active: true,
      UpdatedOn:moment().format("DD-MM-YYYY HH:mm:ss"),
      UpdatedBy:req.body.UpdatedBy,
      UpdatedIp : getIP(req).clientIp
    }},
    {runValidators:true},
    function(err,result){
      if(err){
        if(err.code===11000){
          var duplicateValue = err.message.match(/".*"/);
          res.status(200).json({"defaultError":duplicateValue[0]+" Is Alerady Exsist !"});
        }else{
          res.status(200).json({"error":err.message}||{"defaultError":"Error In Updation !"});
        }
      }else{
        let newActivityLog = new ActivityLog({
          UserId : req.body.UpdatedBy,
          UserName : req.body.UserName,
          UserType : "Admin",
          Page : "Location",
          Action : "Activate Location",
          ImpectId : result._id,
          CreatedIp : getIP(req).clientIp,
          CreatedOn : moment().format("DD-MM-YYYY HH:mm:ss")
        });
        newActivityLog.save()
        .then(activity=>{
          res.status(200).json({"success":"Location Activated Successfully !"});
        })
        .catch(err=>{
          if(err.code === 11000){
              var duplicateValue = err.message.match(/".*"/);
              res.status(200).json({"defaultError":duplicateValue[0]+" Is Already Exsist !"});
          }
          else{
            res.status(200).json({"error":err.message}||{"defaultError":'Error But Can Not Understood !'});
          }
        });
      }
    });
});

router.put('/deactivateLocation',function(req,res,next){
  Location.findOneAndUpdate({_id:req.body.locationId},{
    $set:{
      Active: false,
      UpdatedOn:moment().format("DD-MM-YYYY HH:mm:ss"),
      UpdatedBy:req.body.UpdatedBy,
      UpdatedIp : getIP(req).clientIp
    }},
    {runValidators:true},
    function(err,result){
      if(err){
        if(err.code===11000){
          var duplicateValue = err.message.match(/".*"/);
          res.status(200).json({"defaultError":duplicateValue[0]+" Is Alerady Exsist !"});
        }else{
          res.status(200).json({"error":err.message}||{"defaultError":"Error In Updation !"});
        }
      }else{
        let newActivityLog = new ActivityLog({
          UserId : req.body.UpdatedBy,
          UserName : req.body.UserName,
          UserType : "Admin",
          Page : "Location",
          Action : "Dectivate Location",
          ImpectId : result._id,
          CreatedIp : getIP(req).clientIp,
          CreatedOn : moment().format("DD-MM-YYYY HH:mm:ss")
        });
        newActivityLog.save()
        .then(activity=>{
          res.status(200).json({"success":"Location Dectivated Successfully !"});
        })
        .catch(err=>{
          if(err.code === 11000){
              var duplicateValue = err.message.match(/".*"/);
              res.status(200).json({"defaultError":duplicateValue[0]+" Is Already Exsist !"});
          }
          else{
            res.status(200).json({"error":err.message}||{"defaultError":'Error But Can Not Understood !'});
          }
        });
      }
    });
});

module.exports = router;
