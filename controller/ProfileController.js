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

var login_middleware = function(req, res, next){
  // if(req.session.theUser){
  //
  //
  //   req.session.theUser = UserDb.getUser(1);
  //   var bkp = req.session.userProfile;
  //   req.session.userProfile =  new UserProfile(req.session.userProfile._UserId, []);
  //   for(var i=0;i<bkp._UserItems.length;i++){
  //
  //     req.session.userProfile.addItem(bkp._UserItems[i]._Item._itemCode,bkp._UserItems[i]._Rating,bkp._UserItems[i]._MadeIt);
  //   }
  //   next();
  // }
  //   else
  //   {
    console.log(req.session.uid);
      if(req.session.uid){
      UserDb.getUser(req.session.uid).then(
        function(userporf){
          userporf = JSON.parse(JSON.stringify(userporf[0]))
          req.session.theUser = new User(userporf.UserId ,userporf.FirstName ,userporf.LastName ,userporf.EmailAddress,userporf.UserName,userporf.Password);
          console.log("User created");
          console.log(req.session.theUser);
          UserDb.getUserProfile(req.session.theUser.UserId).then(
            function(mi){
              req.session.userProfile = new UserProfile(req.session.theUser.UserId, []);
              for(i=0;i<mi.length;i++){
                console.log('***********************************')
                // console.log(mi[i]);
                var item1 = new Item(mi[i].Item.itemCode,mi[i].Item.itemName,mi[i].Item.catalogCategory,mi[i].Item.description,mi[i].Item.imageUrl);
                item1.imageUrl = item1.getimageUrl(item1.itemCode);
                // console.log(item1);
                var myitem1 = new UserItem(item1, mi[i].Rating, mi[i].MadeIt, mi[i].UserId);
                req.session.userProfile.addItem(myitem1);
                console.log(req.session.userProfile);
              }
              next();
            }
          )

        }
    )

    }else{
      next();
    }


  };

  // }


router.use(login_middleware);

router.get('/',function(req,res){
  if(req.session.theUser){
    ic = req.query.itemCode;
    console.log('Hello');
    console.log(req.session.userProfile);
    action = req.query.action;

    if (action == 'delete'){
      UserDb.deleteItem(ic, req.session.theUser.UserId).then(function(){
        req.session.userProfile.removeItem(ic);
        profile = req.session.userProfile.getItems();
        res.render('myitems',{up:profile, u:req.session.theUser });
      })
    }
  else if (action == 'update') {
    if (req.query.Rate > 5){
      req.query.Rate = 5;
    }else if (req.query.Rate <0){
      req.query.Rate = 0;
    }
    temp = undefined
    myitems = req.session.userProfile.getItems();
    for (var i =0; i< myitems.length; i++) {
      console.log(myitems[i].Item.itemCode);
      console.log(req.query.itemCode);
      if (myitems[i].Item.itemCode == parseInt(req.query.itemCode)){
        temp = myitems[i].Item;
      }
    }
    console.log(temp);
    if(temp){
      console.log("Updateing!!!!!!!!!!!!!!!!!!");
      UserDb.updateItem(temp.itemCode, req.session.theUser.UserId, req.query.Rate, req.query.made).then(
        function(){
          req.session.userProfile.updateItem(temp,req.query.Rate,req.query.made);
          profile = req.session.userProfile.getItems();
          res.render('myitems',{up:profile, u:req.session.theUser });
        }
      )
    }
    else{
      profile = req.session.userProfile.getItems();
      res.render('myitems',{up:profile, u:req.session.theUser });
    }
    //console.log(req.query);

  }
  else if(action == 'save'){
    itemDb.getItem(ic).then(function(saveItem){
      var item1 = new Item(saveItem[0].itemCode,saveItem[0].itemName,saveItem[0].catalogCategory,saveItem[0].description,saveItem[0].imageUrl);
      console.log('11111111111111111111111111111111111111')
      console.log(item1);
      item1.imageUrl = item1.getimageUrl(item1.itemCode);
      var myitem1 = new UserItem(item1, 0, "False", req.session.theUser.UserId);
      console.log(myitem1);
      console.log('11111111111111111111111111111111111111')

      var result = req.session.userProfile.addItem(myitem1);
      if(result === 7){
        UserDb.saveitem(myitem1).then(
          function(){
            profile = req.session.userProfile.getItems();
            res.render('myitems',{up:profile, u:req.session.theUser });
          }
        )
      }
      else{
        profile = req.session.userProfile.getItems();
        res.render('myitems',{up:profile, u:req.session.theUser });
      }
    })
  }
  else{
    profile = req.session.userProfile.getItems();
    res.render('myitems',{up:profile, u:req.session.theUser });
  }
}else{
  var t = 1;
  res.render('sign_in',{t:t,u:req.session.theUser});
}
});

router.post('/',[urlencodedParser,check('username').not().isEmpty(),check('psw').not().isEmpty()],function(req,res){
  const errors = validationResult(req);
  console.log(errors);
  if(!errors.isEmpty()){
    var te = 0;
    res.render('error',{te:te,u:req.session.theUser});
  }
  else{
  UserDb.getsignin(req.body.username,req.body.psw).then(
  function(user){
      if (user[0] == null){
        var t = 0;
        res.render('sign_in',{t:t,u:req.session.theUser});
      }else{
        console.log(user[0]);
         req.session.uid = user[0].UserId;
         console.log(req.session.uid);
         res.redirect('/myitems');
      }
  }
)
}
});

module.exports = router;
