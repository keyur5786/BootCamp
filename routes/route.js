const express = require("express");
const router = express.Router();
var mongoose = require('mongoose');
const multer = require("multer");
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
const Cource=require("../models/cource");
const imageUpload = require("../models/image");
const Location=require("../models/Location");
const Status=require("../models/program-status");
const Registers=require("../models/register");
const Inquiry=require("../models/inquiry");
// For User
// Retrive Data
router.get('/users',(req,res,next)=>{
  User.find(function(err,User){
    res.json(User);
  });
});

// Insert Data
router.post('/Users',(req,res,next)=>{
  let newUser = new User({
    FirstName: req.body.FirstName,
    LastName: req.body.LastName,
    UserName: req.body.UserName,
    Password: req.body.Password,
    CreatedBy: req.body.CreatedBy,
    CreatedIp : getIP(req).clientIp
    //console.log(getIP(req)) =  { clientIp: '127.0.0.1', clientIpRoutable: false }
  });
  newUser.save()
.then(result  =>{
  res.status(200).json({"success":"User Saved Successfully !"});
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
router.delete('/Users/:id',(req, res, next)=>{
	User.remove({_id:req.params.id},function(err, result){
		if(err){
			res.json(err);
		}else{
			res.json({msg: "User Deleted Successfully"});
		}
	});
});

// Updating Data
router.put('/Users/:id',(req, res, next)=>{
  console.log(req.params.id);
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
        res.status(200).json({"success":"User Updated Successfully !"});
      }
    });
});

//For Academy
// Get Academy Details
router.get('/academies',(req,res,next)=>{
  Academy.find(function(err,Academy){
    res.json(Academy);
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

// Insert Academy Details
router.post('/imageupload', upload.single('file'), (req, res, next) => {
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
    CreatedIp:getIP(req).clientIp
  });
  newAcademy.save()
  .then(result =>{
    res.status(200).json({"success":"Academy Saved Successfully !"});
    localStorage.removeItem("logo");
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
router.delete('/academy/:id',(req, res, next)=>{
  console.log("Route = "+req.params.id);
	Academy.remove({_id:req.params.id},function(err, result){
		if(err){
			res.json(err);
		}else{
			res.json({msg: "Academy Deleted Successfully"});
		}
	});
});
//update academy
router.put('/academy/:id',(req, res, next)=>{
	Academy.findOneAndUpdate({_id:req.params.id},{
		$set:{
      AcademyName:  req.body.AcademyName,
      AcademyWebsite: req.body.AcademyWebsite,
      AcademyLogo: req.body.AcademyLogo,
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
        res.status(200).json({"defaultError":duplicateValue[0]+" Is Alerady Exsist !"});
      }else{
        res.status(200).json({"error":err.message}||{"defaultError":"Error In Updation !"});
      }
    }else{
      res.status(200).json({"success":"User Updated Successfully !"});
    }
  });
});

router.get('/cources',(req,res,next)=>{
  var data=[];
  // Get Data From 1st Table: Course
  Cource.find()
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
    Cost:req.body.Cost,
    StartDate:req.body.StartDate,
    EndDate:req.body.EndDate,
    Length:req.body.Length,
    Classsize:req.body.Classsize,
    Commitment:req.body.Commitment,
    CareerServices:req.body.CareerServices,
    Financing:req.body.Financing,
    Scholarship:req.body.Scholarship,
    CreatedBy:req.body.CreatedBy,
    CreatedIp : getIP(req).clientIp
  });
  newCource.save()
  .then(result=>{
    let newStatus = new Status({
      CourseId : result._id,
      StatusId : 1,
      AcademyMstId : result.AcademyId,
      CreatedBy:req.body.CreatedBy,
      CreatedIp : getIP(req).clientIp
    });
    newStatus.save()
    .then(status=>{
       res.status(200).json({success:'Course Saved Successfully !'});
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
router.delete('/Cources/:id',(req, res, next)=>{
	Cource.remove({_id:req.params.id},function(err, result){
		if(err){
			res.json(err);
		}else{
			res.json({msg: "Cource Deleted Successfully"});
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
      res.status(200).json({"success":"Course Updated Successfully !"});
    }
  });
});

router.get('/changeStatus/:statusRecordId/:statusId/:academyid/:createdBy',(req,res,next)=>{
  Cource.findOneAndUpdate({_id:req.params.statusRecordId},{$set:{StatusId:req.params.statusId}})
  .then(data=>{
    //res.status(200).json("Course Status Changed Successfully !");
      let newStatus = new Status({
        CourseId : req.params.statusRecordId,
        StatusId : req.params.statusId,
        AcademyMstId : req.params.academyid,
        CreatedBy:req.params.createdBy,
        CreatedIp : getIP(req).clientIp
      });
      newStatus.save()
      .then(status=>{
         res.status(200).json("Course Status Changed Successfully !");
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
    }else{
      return res.json(user);
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
    Academy.find({EmailId:req.body.Email,Password:req.body.Password}).exec()
    .then(academy=>{
      if(academy.length<1){
        return res.json("Email & Password is wrong!");
      }else{
        return res.json(academy);
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
    Location.find(function(err,Location){
      res.json(Location);
    });
  });

  // Insert Data
  router.post('/Locates',(req,res,next)=>{
    let newLocate = new Location({
      Loc_name: req.body.Loc_name,
      CreatedBy: req.body.CreatedBy,
      CreatedIp : getIP(req).clientIp
    });
    newLocate.save()
    .then(result =>{
      res.status(200).json({"success":"Location Saved Successfully !"});
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
  router.delete('/Locates/:id',(req, res, next)=>{
  	Location.remove({_id:req.params.id},function(err, result){
  		if(err){
  			res.json(err);
  		}else{
  			res.json({msg: "Location Deleted Successfully"});
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
          res.status(200).json({"success":"Location Updated Successfully !"});
        }
      });
    });




// for program-status
router.post('/Registers',(req,res,next)=>{
  let newAcademy = new Academy({
    EmailId:req.body.EmailId,
    Password:req.body.Password,
    CreatedBy:req.body.CreatedBy,
    CreatedIp : getIP(req).clientIp
  });
  newAcademy.save((err,academy)=>{
    if(err){
      console.log(err);
      res.json({msg:'Failed To Add Academy : '+err});
    }else{
      console.log("Data Done");
      res.json("Data Saved "+academy);
    }
  });
});

router.put('/RegisterAcademy',(req,res,next)=>{
  Academy.findOneAndUpdate({_id:req.body.AcademyId},{
    $set:{
      AcademyName: req.body.AcademyName,
      AcademyWebsite: req.body.AcademyWebsite,
      AcademyLogo: req.body.AcademyLogo,
      AcademyProfileImage: req.body.AcademyProfileImage,
      AcademyFounded: req.body.AcademyFounded,
      Headquarters:req.body.Headquarters,
      AcademyDiscription:req.body.AcademyDiscription,
      ZipCode:req.body.ZipCode,
      UpdatedOn:req.body.UpdatedOn,
      UpdatedBy:req.body.UpdatedBy,
      UpdatedIp : getIP(req).clientIp
    }
  },
  function(err,result){
    if(err){
      console.log(err);
    }else{
      res.json(result);
    }
  });
})


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
      Cource.find({ProgramName:new RegExp(req.params.ProgramName,'i')})
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
      Cource.find({ProgramType:req.params.ProgramType})
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
      Cource.find({ProgramName:new RegExp(req.params.ProgramName,'i'),ProgramType:req.params.ProgramType})
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
    Phone:req.body.Phone,
    EmailId:req.body.EmailId,
    Name:req.body.Name,
    Notes:req.body.Notes,
    CreatedIp : getIP(req).clientIp
  });
  newInquiry.save((err,inquiry)=>{
    if(err){
      console.log(err);
      res.json({msg:'Failed To Add Inquiry Details : '+err});
    }else{
      console.log("Inquiry Details Saved");
      res.json("Inquiry Details Saved "+inquiry);
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

module.exports = router;
