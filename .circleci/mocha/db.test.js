const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const request = require('request');
const dbQuery = require('../../database/index.js');
var chai = require('chai');
var assert = chai.assert;
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
        metaTags:Array
      }
    );
    connection = await mongoose.connect("mongodb://localhost/herodb",{useNewUrlParser:true});
    Games = await connection.model('Game', gameItem);

  })
  after(async function(){
    await mongoose.disconnect();
  })
  it('should query the first object, and test the properties', async function(){
    console.log('here')
    var item =  await Games.find({gameId:1}).exec().then((game)=>{
      return game;
    });
    item = item[0];
    console.log(item);
    assert.equal(typeof item, 'object');
    assert.property(item,'gameId');
    assert.property(item,'gameTitle');
    assert.property(item, 'gameDescription');
    assert.property(item, 'gameDeveloper');
    assert.property(item, 'gamePublisher');
    assert.property(item, 'releaseDate');
  })
  it('should query some random items from the database and test them', async function(){
    for(var x = 0;x < 20;x++){
      var item =  await Games.find({gameId:Math.floor(Math.random()*100)}).exec().then((game)=>{
        return game;
      });
      item = item[0];
      console.log(item);
      assert.equal(typeof item, 'object');
      assert.property(item,'gameId');
      assert.property(item,'gameTitle');
      assert.property(item, 'gameDescription');
      assert.property(item, 'gameDeveloper');
      assert.property(item, 'gamePublisher');
      assert.property(item, 'releaseDate');
    }
  })

})
