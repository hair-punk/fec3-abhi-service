const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var connection = mongoose.createConnection("mongodb://localhost/herodb");

const gameItem = new Schema(
  {
    gameId:Number,
    gameTitle:String,
    gameDescription:String,
    gameDeveloper:String,
    gamePublisher:String,
    releaseDate:Date,
    metaTags:Array,
    videoFileNames:Array,
    photoFileNames:Array
  }
);
var Games = connection.model('Game', gameItem);
let query = (idNumber)=>{
  return Games.find({gameId:idNumber}).exec().then((game)=>{
     return game;
  })
}
module.exports.query = query;
module.exports.Games= Games;