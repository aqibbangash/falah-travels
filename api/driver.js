const driver = require('../models/driver.js');


exports.addDriver = function(req,res){
  console.log(req.body);
  driver.create({
    name:req.body.name,
    fatherName : req.body.fatherName,
    cnic : req.body.cnic,
    contact:req.body.contact,
    age : req.body.age,
    address: req.body.address,
    alotedVehicle:req.body.alotedVehicle,
    licenceNumber:req.body.licenceNumber,
    licenseType: req.body.licenseType,
  }).then(function(result){
    console.log("Driver Details added successfully");
      driver.find({}).exec(function(error,result){
        if(error){
          console.log(error);
          res.status(500).send({error:error});
        }else{
          res.render('allDrivers', {
            driver:result
          });
        }
      })

  })
}

exports.addDriverView = function(req,res){
  if(req.cookies.jwtToken){
      res.render('addDriver');
}else{
  res.render("login");
}
}

exports.driverIncomeExpense = function(req,res){
  if(req.cookies.jwtToken){
    driver.find({}).exec(function(error,result){
      if(error){
        res.status(500).send({error:error});
      }else{
        res.render("oneDriverExpenseIncome",{
          driver:result
        });
      }
    })

}else{
  res.render("login");
}
}

exports.editDriver = function(req,res){
  if(req.cookies.jwtToken){
      driver.findOne({_id:req.params.id}).then(function(result){
        if(result){
          res.render('editDriver', {
            driver:result
          });
        }else{
          console.log("Driver not found");
        }
      })
}else{
  res.render("login");
}
}


exports.updateDriver = function(req,res){
  if(req.cookies.jwtToken){
      driver.findOne({_id:req.body.id}).then(function(result){
        if(result){
          result.name = req.body.name;
          result.fatherName =req.body.fatherName;
          result.cnic = req.body.cnic;
          result.licenseType = req.body.licenseType;
          result.licenseNumber = req.body.licenseNumber;
          result.contact = req.body.contact;
          result.address = req.body.address;
          result.age = req.body.age;
          result.save(function(error,done){
            if(error){
              console.log(error);
            }else{
              driver.find({}).exec(function(error,result){
                if(error){
                  console.log("error",error);
                  res.status(500).send({error:error});
                }else{
                  console.log(result);
                  res.render('allDrivers', {
                    driver:result
                  });
                }
              })
            }
          })
        }else{
          console.log("Driver not found");
        }
      })
}else{
  res.render("login");
}
}


exports.getAllDriver = function(req,res){
  if(req.cookies.jwtToken){
  driver.find({}).exec(function(error,result){
    if(error){
      console.log("error",error);
      res.status(500).send({error:error});
    }else{
      console.log(result);
      res.render('allDrivers', {
        driver:result
      });
    }
  })
}else{
  res.render("login");
}
}


exports.getDriverDetails = function(req,res){
  driver.findOne({_id:req.params.id}).exec(function(error,result){
    if(error){
      console.log("error",error);
      res.status(500).send({error:error});
    }else{
      console.log(result);
      if(result){
        res.status(200).send({result:result});
      }else{
        res.status(404).send({message:"driver not found"});
      }
    }
  })
}
