class Item {

   constructor(itemCode, itemName, catalogCategory, description,imageUrl) {
     this._itemCode = itemCode;
     this._itemName = itemName;
     this._catalogCategory = catalogCategory;
     this._description = description;
     //this._rating = rating;
     this._imageUrl = imageUrl;
   }
   get itemCode() {
     return this._itemCode;
   }
   set itemCode(value) {
     this._itemCode = value;
   }
   get itemName() {
     return this._itemName;
   }
   set itemName(value) {
     this._itemName = value;
   }
   get catalogCategory() {
     return this._catalogCategory;
   }
   set catalogCategory(value) {
     this._catalogCategory = value;
   }
   
   get description() {
     return this._description;
   }
   set description(value) {
     this._description = value;
   }
   get imageUrl() {
     return this._imageUrl;
   }
   set imageUrl(value) {
     this._imageUrl = value;
   }
  getimageUrl(itemCode){
    return  '/assets/images/'+ itemCode + '.jpg';
  }
 }
module.exports = Item;
