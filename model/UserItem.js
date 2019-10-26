
var Item = require('./item');

class UserItem {



   constructor(Item,Rating,MadeIt,userid) {
     this._Item = Item;
     this._Rating = Rating;
     this._MadeIt = MadeIt;
     this._UserId = userid;
     }

   get Item() {
     return this._Item;
   }
   set Item(value) {
     this._Item = value;
   }
   get Rating() {
     return this._Rating;
   }
   set Rating(value) {
     this._Rating = value;
   }
   get MadeIt() {
     return this._MadeIt;
   }
   set MadeIt(value) {
     this._MadeIt = value;
   }
   get UserId() {
     return this._UserId;
   }
   set UserId(value) {
     this._UserId = value;
   }

 }
module.exports = UserItem;
