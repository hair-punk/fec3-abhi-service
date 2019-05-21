const mongoose = require('mongoose');
var db = mongoose.connect("mongodb://localhost/herodb");
var DB_SIZE = 100;
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const S3VideoCollectionSize = 163;
const S3PhotoCollectionSize = 100;

const gameItem = new Schema(
  {
    gameId:Number,
    gameTitle:String,
    gameDescription:String,
    gameDeveloper:String,
    gamePublisher:String,
    releaseDate:Date,
    metaTags:Array

  }
);
var Games = mongoose.model('Game', gameItem);
function createEntry(num){
  var entry = {};
  entry.id = num;
  entry.title = gameNameAdjectives[(Math.floor(Math.random()*gameNameAdjectives.length))]+ gameNameNouns[(Math.floor(Math.random()*gameNameNouns.length))];
  entry.description = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.";
  entry.devName = companyPrefixes[Math.floor(Math.random()*companyPrefixes.length)]+ companySuffixes[Math.floor(Math.random()*companySuffixes.length)];
  entry.pubName = companyPrefixes[Math.floor(Math.random()*companyPrefixes.length)]+ companySuffixes[Math.floor(Math.random()*companySuffixes.length)];
  entry.releaseDate= new Date(1514764800000+Math.floor(Math.random()*41904000000));
  entry.metaTags = [];
  for(let x = 0; x < 5;x++){
    entry.metaTags.push(userMetaTags[Math.floor(Math.random()*userMetaTags.length)])
  }
  entry.videoFileNames=[];
  entry.photoFileNames=[];
  for(let x = 0; x <3;x++){
    entry.videoFileNames.push(Math.ceil(Math.random()*S3VideoCollectionSize));
  }
  for(let x = 0; x <2;x++){
    entry.photoFileNames.push(Math.ceil(Math.random()*S3PhotoCollectionSize));
  }
  return entry;
}
function populate(){
  for(var x = 0; x <DB_SIZE;x++){
    var newData = createEntry(x);
    var newGame = new Games({
      gameId:newData.id,
      gameTitle:newData.title,
      gameDescription:newData.description,
      gameDeveloper:newData.devName,
      gamePublisher:newData.pubName,
      releaseDate: newData.releaseDate,
      metaTags:newData.metaTags,
      videoFileNames:newData.videoFileNames,
      photoFileNames:newData.photoFileNames
    });
    newGame.save(function(err){
      console.log(err);
    })
  }
}

  var companyPrefixes = ['Creative', 'Electronic', 'Game', 'Rocket', 'Brutal', 'Frozen'];

  var companySuffixes = ['soft', 'corp', ' Media Group', ' Entertainment Systems', ' Solutions', ' Games'];

  var gameNameNouns = ['day', 'simulator', 'wars', 'land', 'man', ':the game', 'planet','craft', 'fight', 'tanks', 'racer', 'world', 'tycoon', 'scape'];

  var gameNameAdjectives=['brutal', 'realistic', 'violent', 'tactical', 'interesting', 'nonlinear', 'critical', 'futuristic', 'unoriginal', 'exciting', 'fun', 'nostalgic','addicting'];

  var userMetaTags=['action', 'adventure', 'casual', 'strategy', 'rpg', 'massively multiplayer', 'racing', 'puzzle', 'VR', 'Horror', 'Co-op', 'Retro', 'FPS', 'first person', 'survival', 'arcade', 'sandbox', 'space', 'zombies', 'relaxing', 'rogue-like', 'sports', 'RTS', 'fighting', 'Tower Defense', 'Cyberpunk', 'arena shooter', 'steampunk', 'rhythm', 'pirates', 'ninja', 'battle royale', 'cinematic', 'cats'];

  populate();
