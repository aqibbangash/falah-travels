const vehicle = require('../models/vehicle.js');


exports.addVehicle = function(req,res){
  console.log(req.body);
  vehicle.create({
    registration : req.body.registration,
    company : req.body.company,
    model : req.body.model,
    ownerName : req.body.ownerName,
    milage : req.body.milage,
    power : req.body.power,
    name: req.body.name,
    color: req.body.color
  }).then(function(result){
      console.log("Vehicle Details added successfully");
      res.render("addVehicle");

  })
}

exports.vehicleIncomeExpense = function(req,res){
  if(req.cookies.jwtToken){
    vehicle.find({}).exec(function(error,result){
      if(error){
        res.status(500).send({error:error});
      }else{
        res.render("oneVehicleExpenseIncome",{
          vehicle:result
        });
      }
    })

}else{
  res.render("login");
}
}

exports.addVehicleView = function(req,res){
  if(req.cookies.jwtToken){
    res.render("addVehicle");
}else{
  res.render("login");
}
}


exports.editVehicle = function(req,res){
  if(req.cookies.jwtToken){
  vehicle.findOne({_id:req.params.id}).exec(function(error,result){
    if(error){
      console.log("error",error);
      res.status(500).send({error:error});
    }else{
      console.log(result);
      res.render('editVehicle', {
        vehicle:result
      });
    }
  })
}else{
  res.render("login");
}
}

exports.updateVehicle = function(req,res){
  console.log(req.body);
  if(req.cookies.jwtToken){
  vehicle.findOne({_id:req.body.id}).exec(function(error,result){
    if(error){
      console.log(error);
      res.status(500).send({error:error});
    }else{
      if(result){
        result.name = req.body.name;
        result.registration = req.body.registration;
        result.ownerName = req.body.ownerName;
        result.company = req.body.company;
        result.model = req.body.model;
        result.color = req.body.color;
        result.milage = req.body.milage;
        result.save(function(error,done){
          console.log("Saved");
          vehicle.find({}).exec(function(error,result){
            if(error){
              console.log("error",error);
              res.status(500).send({error:error});
            }else{
              console.log(result);
              res.render('allVehicles', {
                vehicle:result
              });
            }
          })
        })
      }else{
        console.log("Car not Found");
        vehicle.find({}).exec(function(error,result){
          if(error){
            console.log("error",error);
            res.status(500).send({error:error});
          }else{
            console.log(result);
            res.render('allVehicles', {
              vehicle:result
            });
          }
        })
      }

    }
  })
}else{
  res.render("login");
}
}

exports.getAllVehicles = function(req,res){
  if(req.cookies.jwtToken){
  vehicle.find({}).exec(function(error,result){
    if(error){
      console.log("error",error);
      res.status(500).send({error:error});
    }else{
      console.log(result);
      res.render('allVehicles', {
        vehicle:result
      });
    }
  })
}else{
  res.render("login");
}
}


exports.getVehicleDetails = function(req,res){
  vehicle.findOne({_id:req.params.id}).exec(function(error,result){
    if(error){
      console.log("error",error);
      res.status(500).send({error:error});
    }else{
      console.log(result);
      if(result){
        res.status(200).send({result:result});
      }else{
        res.status(404).send({message:"vehicle not found"});
      }
    }
  })
}
