// User ID
// List containing UserItem objects
// addItem -  adds a UserItem to the user profile. This function should support adding a UserItem by a function call that provides values to create the UserItem object (item, rating and  made it) or a function call that provides the UserItem object. The profile should not allow multiple UserItem for the same item, but should update appropriately if one already exists.
// removeItem(Item) – removes any UserItem associated with the given Item.
// updateItem(UserItem) - updates a UserItem data (rating, made it)
// getItems() – returns a List / Collection of UserItem from the user profile
// emptyProfile() –clears the entire profile contents
// item/:id

var itemdata = require('../utility/itemDB');
var UserItem = require('./UserItem');


class UserProfile {

   constructor(UserId,UserItems) {
     this._UserId = UserId ;
     this._UserItems = UserItems;

     }

   get UserId() {
     return this._UserId;
   }
   set UserId(value) {
     this._UserId = value;
   }

   addItem(item,rating = 0,madeit= 'True'){
    for (let i = 0; i < this._UserItems.length; i++) {
      if (this._UserItems[i].Item.itemCode == item.Item.itemCode){
        return 10;
      }
  }
  // var item =   itemdata.getItem(itemCode);
  // if(item == undefined){
  //   return;
  // }
  // var var1 = new UserItem(item, rating, madeit);
  this._UserItems.push(item);
  return 7;
}
   removeItem(itemcode){
    var index = -1;
    for (let i =0; i<this._UserItems.length ; i++){
      if (this._UserItems[i].Item.itemCode == itemcode){
          index = i;
          break;
      }

     }
     if (index!= -1){
     this._UserItems.splice(index,1);
    }
  }

  getItems(){
    return this._UserItems;
  }

  updateItem(item,rating,madeit,uid){

    for (let i =0; i<this._UserItems.length ; i++){
      if (this._UserItems[i].Item.itemCode == item.itemCode){
        // var item =   itemdata.getItem(itemcode);
        var var1 = new UserItem(item, rating, madeit,uid);
          this._UserItems[i] = var1;
          break;
      }
     }
    }
  emptyprofile(){
    delete this._UserId;
    delete this._UserItems;

  }


 }
module.exports = UserProfile;
