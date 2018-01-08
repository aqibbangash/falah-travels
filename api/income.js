const income = require('../models/income.js');
const vehicle = require('../models/vehicle.js');
const driver = require('../models/driver.js');

exports.addIncome = function(req,res){
  console.log(req.body);
  if(req.cookies.jwtToken){
    if(req.body.type == "income"){
      income.create({
        incomeDate : req.body.date,
        vehicle:req.body.vehicle,
        amount: req.body.amount,
        type : req.body.type,
        comments : req.body.comments
      }).then(function(result){

        console.log("Income Details added successfully");
        vehicle.find({}).exec(function(error,vehicleResult){
          if(error){
            console.log("error",error);
            res.status(500).send({error:error});
          }else{
            console.log(result);
            res.render('allVehicles', {
              vehicle:vehicleResult
            });
          }
        })

      })
    }else if(req.body.type == "expense"){
      income.create({
        incomeDate : req.body.date,
        vehicle:req.body.vehicle,
        amount: req.body.amount,
        type : req.body.type,
        comments : req.body.comments
      }).then(function(result){

        console.log("Income Details added successfully");
        vehicle.find({}).exec(function(error,vehicleResult){
          if(error){
            console.log("error",error);
            res.status(500).send({error:error});
          }else{
            console.log(result);
            res.render('allVehicles', {
              vehicle:vehicleResult
            });
          }
        })

      })

    }else if(req.body.type == "rent"){
      income.create({
        incomeDate : req.body.date,
        vehicle:req.body.vehicle,
        amount: req.body.amount,
        type : req.body.type,
        comments : req.body.comments
      }).then(function(result){

        console.log("Income Details added successfully");
        vehicle.find({}).exec(function(error,vehicleResult){
          if(error){
            console.log("error",error);
            res.status(500).send({error:error});
          }else{
            console.log(result);
            res.render('allVehicles', {
              vehicle:vehicleResult
            });
          }
        })

      })
    }

  }else{
    res.render("login");
  }

}



exports.addIncomeDriver = function(req,res){
  console.log(req.body);
  if(req.cookies.jwtToken){
    if(req.body.type == "income"){
      income.create({
        incomeDate : req.body.date,
        driver:req.body.driver,
        amount: req.body.income,
        type : req.body.type,
        comments : req.body.comments
      }).then(function(result){

        console.log("Income Details added successfully");
        driver.find({}).exec(function(error,vehicleResult){
          if(error){
            console.log("error",error);
            res.status(500).send({error:error});
          }else{
            console.log(result);
            res.render('allDrivers', {
              driver:vehicleResult
            });
          }
        })

      })
    }else if(req.body.type == "expense"){
      income.create({
        incomeDate : req.body.date,
        driver:req.body.driver,
        amount: req.body.income,
        type : req.body.type,
        comments : req.body.comments
      }).then(function(result){

        console.log("Income Details added successfully");
        vehicle.find({}).exec(function(error,vehicleResult){
          if(error){
            console.log("error",error);
            res.status(500).send({error:error});
          }else{
            console.log(result);
            res.render('allDrivers', {
              vehicle:vehicleResult
            });
          }
        })

      })

    }

  }else{
    res.render("login");
  }

}


exports.addIncomeView = function(req,res){
  console.log(req.params);
  if(req.cookies.jwtToken){
    res.render('addIncome',{
      vehicle:req.params.id
    })
  }else{
    res.render('login');
  }
}

exports.viewAllIncome = function(req,res){
  console.log(req.params);
  if(req.cookies.jwtToken){
    income.find({}).populate('driver').populate('vehicle').sort({incomeDate:-1}).exec(function(error,result){
      if(error){
        console.log(error);
        res.status(500).send({error:error});
      }else{
        console.log("Income : ",result);
        res.render('viewAllIncomes',{
          income:result
        })
      }
    })


  }else{
    res.render('login');
  }
}

exports.addDriverIncomeView = function(req,res){
  console.log(req.params);
  if(req.cookies.jwtToken){
    console.log("i am in");
    res.render('addDriverIncome',{
      driver:req.params.id
    })
  }else{
    res.render('login');
  }
}

exports.incomeReportView = function(req,res){
  if(req.cookies.jwtToken){

    res.render('incomeReport');
  }else{
    res.render('login');
  }
}

exports.incomeReport = function(req,res){

  for (var i in req.body) {
        if (req.body[i] == "") {
          delete req.body[i];
        }
      }
      console.log("Date : ",new Date(req.body.dateFrom));
      console.log("Request : ",req.body);
      if(req.body.type!="both"){
        income.find({
          vehicle : { $exists: true },driver : { $exists: false },
          incomeDate : { $gte: new Date(req.body.dateFrom), $lte: new Date(req.body.dateTo) },
          type: req.body.type
        }).populate('driver').populate('vehicle').sort({incomeDate:-1}).exec(function(error,result){
          if(error){
            console.log("error ",error);
            res.status(500).send({error:error});
          }else{
            console.log("Result : ",result);
            res.render('viewAllIncomes',{
              income:result
            })
          }
        })
      }else{
        income.find({
          vehicle : { $exists: true },driver : { $exists: false },
          incomeDate : { $gte: new Date(req.body.dateFrom), $lte: new Date(req.body.dateTo) }

        }).populate('driver').populate('vehicle').sort({incomeDate:-1}).exec(function(error,result){
          if(error){
            console.log("error ",error);
            res.status(500).send({error:error});
          }else{
            console.log("Result : ",result);
            res.render('viewAllIncomes',{
              income:result
            })
          }
        })
      }

}

exports.vehicleIncomeExpenseReport = function(req,res){
  if(req.cookies.jwtToken){
    for (var i in req.body) {
          if (req.body[i] == "") {
            delete req.body[i];
          }
        }
        console.log("Date : ",new Date(req.body.dateFrom));
        console.log("Request : ",req.body);
      income.find({
        vehicle : req.body.vehicle,
        incomeDate : { $gte: new Date(req.body.dateFrom), $lte: new Date(req.body.dateTo) },
        type: req.body.type
      }).populate('vehicle').sort({incomeDate:-1}).exec(function(error,result){
        if(error){
          console.log("error ",error);
          res.status(500).send({error:error});
        }else{
          console.log("Result : ",result);
          res.render('vehicleIncomeReport',{
            income:result
          })
        }
      })
  }else{
    res.render('login');
  }
}

exports.driverIncomeExpenseReport = function(req,res){
  if(req.cookies.jwtToken){
    for (var i in req.body) {
          if (req.body[i] == "") {
            delete req.body[i];
          }
        }
        console.log("Date : ",new Date(req.body.dateFrom));
        console.log("Request : ",req.body);
      income.find({
        driver : req.body.driver,
        incomeDate : { $gte: new Date(req.body.dateFrom), $lte: new Date(req.body.dateTo) },
        type: req.body.type
      }).populate('driver').sort({incomeDate:-1}).exec(function(error,result){
        if(error){
          console.log("error ",error);
          res.status(500).send({error:error});
        }else{
          console.log("Result : ",result);
          res.render('driverIncomeReport',{
            income:result
          })
        }
      })
  }else{
    res.render('login');
  }
}

exports.getAllIncome = function(req,res){
  income.find({}).exec(function(error,result){
    if(error){
      console.log("error",error);
      res.status(500).send({error:error});
    }else{
      console.log(result);
      res.status(200).send({result:result});
    }
  })
}


exports.getIncome = function(req,res){
  income.findOne({_id:req.params.id}).exec(function(error,result){
    if(error){
      console.log("error",error);
      res.status(500).send({error:error});
    }else{
      console.log(result);
      if(result){
        res.status(200).send({result:result});
      }else{
        res.status(404).send({message:"income not found"});
      }
    }
  })
}
