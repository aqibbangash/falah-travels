const express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var router = express.Router();
var user = require('../api/user.js');
var path = require('path')
router.post('/register', user.register);
router.post('/authenticate', user.authenticate);
router.get('/',user.login);
router.get('/dashboard',user.dashboard);


var driver = require('../api/driver.js');
router.post('/addDriver',driver.addDriver);
router.get('/getAllDriver',driver.getAllDriver);
router.get('/getDriverDetails',driver.getDriverDetails);
router.get('/addDriverView',driver.addDriverView);
router.get('/editDriver/:id',driver.editDriver);
router.post('/updateDriver',driver.updateDriver);
router.get('/driverIncomeExpense',driver.driverIncomeExpense);


var vehicle = require('../api/vehicle.js');
router.post('/addVehicle',vehicle.addVehicle);
router.get('/addVehicle',vehicle.addVehicleView);
router.get('/getAllVehicles',vehicle.getAllVehicles);
router.get('/getVehicleDetails',vehicle.getVehicleDetails);
router.get('/editVehicle/:id',vehicle.editVehicle);
router.post('/updateVehicle',vehicle.updateVehicle);
router.get('/vehicleIncomeExpense',vehicle.vehicleIncomeExpense);

var income = require('../api/income.js');
router.post('/addIncome',income.addIncome);
router.get('/getAllIncome',income.getAllIncome);
router.get('/getIncome',income.getIncome);
router.get('/addIncomeView/:id',income.addIncomeView);
router.post('/addIncomeDriver',income.addIncomeDriver);
router.get('/addDriverIncomeView/:id',income.addDriverIncomeView);
router.get('/viewAllIncome',income.viewAllIncome);
router.get('/incomeReportView',income.incomeReportView);
router.post('/incomeReport',income.incomeReport);
router.post('/vehicleIncomeExpenseReport',income.vehicleIncomeExpenseReport);
router.post('/driverIncomeExpenseReport',income.driverIncomeExpenseReport);


module.exports = router;
