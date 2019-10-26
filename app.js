var express = require('express');
let catalogController = require('./controller/catalog_Controller');
let profileController = require('./controller/ProfileController');
var app = express();
var session = require('express-session');
var UserDb = require('./utility/UserDB.js');


app.set('view engine', 'ejs');

app.use('/assets',express.static('assets'));
app.use(session({
  secret : 'Divya',
  resave : false,
  saveUninitialized : true
}));
// var middleware = function(req,res,next){
//   if(req.session.theUser){
//   req.session.theUser= UserDb.getUser(1);
//   req.session.userProfile = UserDb.getUserProfile(req.session.theUser.UserId);
//   profile = req.session.userProfile.getItems();
//   }
//   next();
// }
// app.use(middleware);.

app.use('/sign_in',profileController);
app.use('/myitems',profileController);
app.use('/', catalogController);






app.listen(8080);
