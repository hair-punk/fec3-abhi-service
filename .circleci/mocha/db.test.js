const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var chai = require('chai');
var assert = chai.assert;
var connection;

describe('Test Connecting and Disconnecting', async function(){
   it('should connect properly', async function(){
    connection = await mongoose.connect("mongodb://localhost/herodb",{useNewUrlParser:true});
    assert.equal(mongoose.connection.readyState, 1);
  })
   it("should  disconnect properly", async function(){
    await mongoose.disconnect();
    assert.equal(mongoose.connection.readyState, 0);
  })
})

describe('Test Database Queries', async function() {
  var Games;
  before(async function(){
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
    connection = await mongoose.connect("mongodb://localhost/herodb",{useNewUrlParser:true});
    Games = await connection.model('Game', gameItem);
  })
  after(async function(){
    await mongoose.disconnect();
  })
  it('Should query the first object, and test the properties', async function(){
    var item =  await Games.find({gameId:1}).exec().then((game)=>{
      return game;
    });
    item = await item[0];
    assert.equal(typeof item, 'object');
    assert.property(item,'gameId');
    assert.equal(typeof item.gameId, 'number')
    assert.property(item,'gameTitle');
    assert.equal(typeof item.gameTitle, 'string')
    assert.property(item, 'gameDescription');
    assert.equal(typeof item.gameDescription, 'string')
    assert.property(item, 'gameDeveloper');
    assert.equal(typeof item.gameDeveloper, 'string');
    assert.property(item, 'gamePublisher');
    assert.equal(typeof item.gamePublisher, 'string');
    assert.property(item, 'releaseDate');
    assert.equal(typeof item.releaseDate, 'object');
    assert.property(item, 'videoFileNames');
    assert.isArray(item.videoFileNames)
    assert.property(item, 'photoFileNames');
    assert.isArray(item.photoFileNames);
    assert.property(item, 'metaTags');
    assert.isArray(item.metaTags);
    var iterable = [];
    for(var y = 0;y < item['metaTags'].length;y++){
      iterable.push(y);
    }
    for await(const y of iterable){
      await assert.equal(typeof item['metaTags'][y], 'string');
    }
    for(var x = 0;x < item['videoFileNames'].length;x++){
      assert.equal(typeof item['videoFileNames'][x],'number');
      assert.equal(item['videoFileNames'][x],Math.floor(item['videoFileNames'][x]))
    }
    for(var x = 0;x < item.photoFileNames.length;x++){
      assert.equal(typeof item.photoFileNames[x],'number');
      assert.equal(item.photoFileNames[x],Math.floor(item.photoFileNames[x]))
    }
  })
  it('Should query some random items from the database.  They must be valid.', async function(){
    var iterable = [];
    for(var x = 0;x < 20;x++){
      iterable.push(x);
    }
    for await (const x of iterable){
      var item =  await Games.find({gameId:Math.ceil(Math.random()*100)}).exec().then((game)=>{
        return game;
      });
      item = await item[0];
      assert.equal(typeof item, 'object');
      assert.property(item,'gameId');
      assert.equal(typeof item.gameId, 'number')
      assert.property(item,'gameTitle');
      assert.equal(typeof item.gameTitle, 'string')
      assert.property(item, 'gameDescription');
      assert.equal(typeof item.gameDescription, 'string')
      assert.property(item, 'gameDeveloper');
      assert.equal(typeof item.gameDeveloper, 'string');
      assert.property(item, 'gamePublisher');
      assert.equal(typeof item.gamePublisher, 'string');
      assert.property(item, 'releaseDate');
      assert.equal(typeof item.releaseDate, 'object');
      assert.property(item, 'videoFileNames');
      assert.isArray(item.videoFileNames)
      assert.property(item, 'photoFileNames');
      assert.isArray(item.photoFileNames);
      assert.property(item, 'metaTags');
      assert.isArray(item.metaTags);
      var iterable = [];
      for(var y = 0;y < item['metaTags'].length;y++){
        iterable.push(y);
      }
      for await(const y of iterable){
        await assert.equal(typeof item['metaTags'][y], 'string');
      }
      var iterable = [];
      for(var y = 0;y < item['videoFileNames'].length;y++){
        iterable.push(y);
      }
      for await(const y of iterable){
        await assert.equal(typeof item['videoFileNames'][y],'number');
        await assert.equal(item['videoFileNames'][y],Math.floor(item['videoFileNames'][y]))
      }
      var iterable = [];
      for(var y = 0;y < item['photoFileNames'].length;y++){
        iterable.push(y);
      }
      for await (const y of iterable){
        await assert.equal(typeof item.photoFileNames[y],'number');
        await assert.equal(item.photoFileNames[y],Math.floor(item.photoFileNames[y]))
      }
    }
  })
})
