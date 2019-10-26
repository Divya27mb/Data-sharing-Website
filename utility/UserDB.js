var User = require('../model/User');
var Useritem = require('../model/UserItem');
var Userprofile = require('../model/UserProfile');
var db = require("./itemDB");
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/db', {useNewUrlParser: true});
var schema = mongoose.Schema;


userSchema = new schema({
  UserId : Number,
 FirstName : String,
 LastName : String,
 EmailAddress : String,
 UserName : String,
 Password : String
},{collection:'user'});

userItemSchema = new schema({
   UserId:Number,
    Item : Object,
    Rating : Number,
    MadeIt : String
},{collection:'useritem'});

userModel = mongoose.model('user',userSchema);
userItemModel = mongoose.model('useritem',userItemSchema);

module.exports.getUserProfile  = function(userid){
  return userItemModel.find({UserId : userid }).exec();
}

module.exports.getUser = function(userid){
  return userModel.find({UserId: userid}).exec();
}

module.exports.getsignin = function(username,password){
  return userModel.find({UserName: username,Password: password}).exec();
}


module.exports.deleteItem = function(id,uid){
  // console.log(id);
  // console.log(uid);
    return userItemModel.remove({"Item.itemCode":parseInt(id),UserId:parseInt(uid)}).exec();
}

module.exports.updateItem = function(id, uid, rating, madeit){
    return userItemModel.findOneAndUpdate({"Item.itemCode":parseInt(id), UserId:parseInt(uid)}, {Rating:parseInt(rating), MadeIt:madeit}).exec();
}

module.exports.saveitem = function(ob){
// return new Promise(function(resolve, reject){
  // console.log("Inside Save items");
  // console.log(ob);
  i = ob.Item
  itemtoadd = {
      itemCode:i.itemCode,
      itemName:i.itemName,
      catelogCategory:i.catelogCategory,
      description:i.description,
      imageUrl:i.imageUrl,
      userId:i.userId
  }
  var newob = new userItemModel({Item:itemtoadd, UserId:ob.UserId, Rating:ob.Rating, MadeIt:ob.MadeIt});
  // console.log(newob);
  // console.log("ENINFINASIOFN")
  return newob.save();

// })

}


//
// module.exports.getUserProfile  = function(userid){
//     for (var i = 0; i < profiledata.length; i++){
//       if(parseInt(profiledata[i].UserId) == userid){
//         let userprofile = new Userprofile(profiledata[i].UserId,
//                profiledata[i].UserItems);
//                return userprofile;
//       }
//     }
//     return "lol";
// };
//
// module.exports.getUser = function (userid) {
//
//
//     for (var i = 0; i < data.length; i++) {
//       if (parseInt(data[i].UserId) == userid){
//         let user = new User(data[i].UserId,
//             data[i].FirstName,
//             data[i].LastName,
//             data[i].EmailAddress
//           );
//           return user;
//         }
//
//         }
//
// };
//
//
// var data = [
//    {
//        UserId : 1,
//        FirstName: 'Divya',
//        LastName: 'Patel',
//        EmailAddress: 'divya27mb@gmail.com'
//
//    },
//    {
//      UserId : 2,
//      FirstName: 'Sara',
//      LastName: 'Khan',
//      EmailAddress: 'sarakhan07@gmail.com'
//    }
//  ];
//
//  var profiledata = [
//    {UserId:1,
//    UserItems:[new Useritem(db.getItem(1),0,'True'),new Useritem(db.getItem(2),0,'True')]},
//    {UserId:2,
//    UserItems:[new Useritem(db.getItem(3),0,'True'),new Useritem(db.getItem(4),0,'True')]
//    }
//  ]
