var express = require('express');
var router = express.Router();
var itemDb = require('../utility/itemDB.js');
var UserDb = require('../utility/UserDB.js');
var session = require('express-session');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended : false });
var UserProfile = require('../model/UserProfile');
var UserItem = require('../model/UserItem');
var Item = require('../model/item')
var User = require('../model/User')
const { check, validationResult } = require('express-validator/check');

router.get('/signin',function(req,res){
  
})
