class User {

   constructor(UserId, FirstName, LastName, EmailAddress, uname, password) {
     this._UserId = UserId;
     this._FirstName = FirstName;
     this._LastName = LastName;
     this._EmailAddress = EmailAddress;
     this._UserName = uname;
     this._Password = password;
     }

   get UserId() {
     return this._UserId;
   }
   set UserId(value) {
     this._UserId = value;
   }
   get FirstName() {
     return this._FirstName;
   }
   set FirstName(value) {
     this._FirstName = value;
   }
   get LastName() {
     return this._LastName;
   }
   set LastName(value) {
     this._LastName = value;
   }
   get UserName() {
     return this._UserName;
   }
   set UserName(value) {
     this._UserName = value;
   }
   get Password() {
     return this._Password;
   }
   set Password(value) {
     this._Password = value;
   }


   get EmailAddress() {
     return this._EmailAddress;
   }
   set EmailAddress(value) {
     this._EmailAddress = value;
   }

 }
module.exports = User;
