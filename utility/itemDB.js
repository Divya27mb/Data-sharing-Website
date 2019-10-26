var Item = require('../model/item');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/db', {useNewUrlParser: true});
var schema = mongoose.Schema;
var itemSchema = new schema({
  itemCode : Number,
  itemName : String,
  catalogCategory : String,
  description : String,
  //this._rating = rating;
  imageUrl : String,
   userId: Number},
  {collection:'item'}
);



var itemModel = mongoose.model('item', itemSchema);
module.exports.model = itemModel;





module.exports.getItems = function () {
  return itemModel.find({}).exec();

};

module.exports.getItem = function (itemCode) {
  return itemModel.find({itemCode:itemCode}).exec();

};


module.exports.categories = ["Trending News", "Transfers"];
// module.exports.getItems = function () {
//
//     let items = [];
//     for (var i = 0; i < data.length; i++) {
//         let item = new Item(data[i].itemCode,
//             data[i].itemName,
//             data[i].catalogCategory,
//             data[i].description,
//             data[i].rating,
//             data[i].imageUrl
//           );
//           item.imageUrl = item.getimageUrl(data[i].itemCode);
//         items.push(item);
//         }
//     return items;
// };
//
// module.exports.getItem = function (itemCode) {
//     for (var i = 0; i < data.length; i++) {
//         if (parseInt(data[i].itemCode) == itemCode) {
//             let item = new Item(data[i].itemCode,
//                 data[i].itemName,
//                 data[i].catalogCategory,
//                 data[i].description,
//                 data[i].rating,
//                 data[i].imageUrl
//               );
//
//               item.imageUrl = item.getimageUrl(data[i].itemCode);
//             return item;
//         }
//
//
//     }
// };
//
//
// module.exports.categories = ["Trending News", "Transfers"];
//
// var data = [
//    {
//        itemCode: 1,
//        itemName: "Scaloni optimistic over Messi's Argentina return: I have a good feeling",
//        catalogCategory: "Trending News",
//        description: "More talks are planned with Lionel Messi as Argentina try to persuade their captain to return, according to Lionel Scaloni.Argentina head coach Lionel Scaloni has a \"good feeling\" Lionel Messi will return to international football ahead of this year's Copa America. Messi, 31, has not played for Argentina since the South American giants suffered a last-16 defeat to eventual champions France at last year's World Cup. Scaloni and Argentina have held talks with Messi over an international comeback and more discussions are planned following the draw for June's Copa America in Brazil, with a friendly against Venezuela scheduled on March 25. ",
//        rating: 3,
//        imageUrl: ''
//
//    },
//    {
//        itemCode: 2,
//        itemName: "Solskjaer backs Pogba for Man United captaincy.",
//        catalogCategory: "Trending News",
//        description: "MANCHESTER, England -- Ole Gunnar Solskjaer says Paul Pogba is back in line for captaincy duties at Manchester United four months after being stripped of the role by Jose Mourinho. Mourinho told Pogba in September he would no longer be considered for the armband but caretaker boss Solskjaer has reversed the decision..",
//        rating: 3,
//        imageUrl: ''
//    },
//
//
//    {
//        itemCode: 3,
//        itemName: "Real Madrid 4 Girona 2: Ramos double earns quarter-final lead.",
//        catalogCategory: "Trending News",
//        description: "Sergio Ramos scored twice as Real Madrid earned a 4-2 lead in a pulsating first leg of their Copa del Rey quarter-final at home to Girona. Anthony Lozano gave Girona an early lead at the Santiago Bernabeu on Thursday, but Madrid battled back thanks to Lucas Vazquez's equaliser and a Ramos penalty. Another spot-kick saw Girona equalise, Alex Granell stepping up to convert after Marcos Llorente needlessly handled the ball in the box, but Ramos and Karim Benzema struck late. Madrid's captain rose highest in the box to crash home a header from Marcelo's cross and Girona's hopes were dashed when Benzema slotted in a Vinicius Junior cross. Madrid forced a trio of early corners, but Girona took the lead with their first attack in the seventh minute, Raul Garcia given too much space on the left to deliver a cross Lozano met on the volley.",
//        rating: 3,
//        imageUrl: ''
//    },
//
//
//    {
//        itemCode: 4,
//        itemName: "Celtic sign Toljan and Shved on deadline day.",
//        catalogCategory: "Transfers",
//        description: "Celtic beat Thursday’s transfer deadline to bring in Jeremy Toljan on loan from Borussia Dortmund, as well as signing winger Maryan Shved. Right-back Toljan joins Celtic for the rest of the season while Shved will remain on loan at Karpaty Lviv until April despite penning a four-and-a-half-year contract. Celtic have had a busy transfer window, with Paris Saint-Germain’s United States forward Timothy Weah among their arrivals, and Toljan feels Parkhead is the right place for him.",
//        rating: 3,
//        imageUrl: ''
//    },
//
//    {
//        itemCode: 5,
//        itemName: "Kagawa joins Besiktas on loan.",
//        catalogCategory: "Transfers",
//        description: "Besiktas have sealed the loan signing of Shinji Kagawa from Borussia Dortmund. The Japan international joins Besiktas until the end of the season after falling out of favour at the Bundesliga leaders. Kagawa had started one Bundesliga game this term for Dortmund, who currently hold a six-point lead on second-place Bayern Munich",
//        rating: 3,
//        imageUrl: ''
//    },
//
//    {
//        itemCode: 6,
//        itemName: "Barcelona bring forward Todibo arrival ",
//        catalogCategory: "Transfers",
//        description: "Barcelona are pushing to bring Toulouse defender Jean-Clair Todibo to the club before the transfer window shuts, sources have confirmed to ESPN FC. However, with the centre-back frozen out at the French club since November, they remain keen to force through a deal this month.Todibo, 19, has not played for Toulouse's first team since Nov. 3. The Ligue 1 side took the decision to send him back to the reserve team following his refusal to sign his first professional contract.",
//        rating: 3,
//        imageUrl: ''
//    },
//
// ];
