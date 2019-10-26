var express = require('express');
var router = express.Router();
var itemDb = require('../utility/itemDB.js');
var UserDb = require('../utility/UserDB.js');
var session = require('express-session');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended : false });
var UserProfile = require('../model/UserProfile');
var UserItem = require('../model/UserItem');
var User = require('../model/User');
var Item = require('../model/item');
const { check, validationResult } = require('express-validator/check');

var my_middleware = function(req, res, next){

  if(req.session.userProfile){
    var u = req.session.theUser
    req.session.theUser = new User(u._UserId,u._FirstName,u._LastName,u._EmailAddress,u._UserName,u._Password);

    var bkp = req.session.userProfile._UserItems;
    req.session.userProfile =  new UserProfile(req.session.userProfile._UserId, []);

    for(var i=0 ; i < bkp.length ; i++){
      var item1 = new Item(bkp[i]._Item._itemCode, bkp[i]._Item._itemName, bkp[i]._Item._catalogCategory, bkp[i]._Item._description, bkp[i]._Item._imageUrl);
      item1.imageUrl = item1.getimageUrl(item1.itemCode);
      req.session.userProfile.addItem(new UserItem(item1, bkp[i]._Rating, bkp[i]._MadeIt, bkp[i]._UserId));
    }
  }
  next();
};
router.use(my_middleware);

router.get('/', function(req, res) {

  res.render('index',{ u:req.session.theUser});

});

router.get('/categories/catalog', function(req, res) {
  itemDb.getItems().then(function(data){
    allItems = []
    for(var i=0;i<data.length;i++){
      var item1 = new Item(data[i].itemCode,data[i].itemName,data[i].catalogCategory,data[i].description,data[i].imageUrl);
      item1.imageUrl = item1.getimageUrl(item1.itemCode);
      allItems.push(item1);
    }
    var data= {
      title:'Categories',
      categories: itemDb.categories,
      items:allItems
    };
      res.render('Category', { data: data,  u:req.session.theUser});
  })

});


router.get('/contact',function(req, res) {

    res.render('contact', { u:req.session.theUser});

});

router.get('/about', function(req, res) {

    res.render('about',{ u:req.session.theUser});

});

router.get('/categories/item/:itemCode',check('itemCode').isNumeric() ,function(req, res) {
  const errors = validationResult(req);
  console.log(errors);
  if(!errors.isEmpty()){
    var te = 1
    res.render('error',{te:te,u:req.session.theUser});
  }
  else{
    var itemCode = req.params.itemCode;
    itemDb.getItem(itemCode).then(
      function(data){
        data = data[0]
        var item1 = new Item(data.itemCode,data.itemName,data.catalogCategory,data.description,data.imageUrl);
        item1.imageUrl = item1.getimageUrl(item1.itemCode);
        console.log(item1);
        if (item1 == null){
          res.redirect('/categories/catalog');
        }
        else{
        res.render('items', { data: item1, u:req.session.theUser});
      }
    }
    )
}

}
);

// router.get('/myitems', function(req, res) {
//
//     res.render('myitems');
// });

router.get('/feedback', function(req, res) {
  if(req.session.theUser){
    temp = undefined;
    myitems = req.session.userProfile.getItems();
    for (var i =0; i< myitems.length; i++) {
      if (myitems[i].Item.itemCode == req.query.itemCode){
        temp = myitems[i];

      }
    }
    if (temp == undefined){
      res.redirect('/myitems');
    }
    else{
    // req.session.userProfile.addItem(req.query.itemCode);
    res.render('feedback',{u:req.session.theUser, up:temp ,itemcode:req.query.itemCode});
  }
  }
  else{
    res.redirect('/categories/catalog')
  }
});


// router.get('/sign_in', function(req, res) {
//
//     res.render('sign_in');
// });


router.get('/sign_out',function(req,res){
  req.session.destroy();
  //console.log('Here');
  res.redirect('/');
});

router.get('/*',function(req,res){

  res.render('index',{ u:req.session.theUser});

})


module.exports = router;
