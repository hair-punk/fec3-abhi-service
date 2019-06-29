const mongoose =require('mongoose');
const request = require('request');
const dbQuery = require('../database/index.js');

describe('populate', ()=>{
  beforeAll(async function(){
    connection = await mongoose.connect("mongodb://localhost/herodb");
  });
  afterAll(async function(){
    await mongoose.disconnect();
  });

  it('should be the first test', async function(){
    expect(1).toEqual(1);
  })
  it('should test the database and return the first item and test it for its properties', async function(){
    var firstItem = await dbQuery.query(1);
    firstItem = firstItem[0]
    console.log(firstItem);
    expect(typeof firstItem).toEqual('object');
    expect(firstItem).toHaveProperty('gameId');
    expect(firstItem).toHaveProperty('gameTitle');
    expect(firstItem).toHaveProperty('gameId');
    expect(firstItem).toHaveProperty('gameTitle');
    expect(firstItem).toHaveProperty('gameDescription');
    expect(firstItem).toHaveProperty('gameDeveloper');
    expect(firstItem).toHaveProperty('gamePublisher');
    expect(firstItem).toHaveProperty('releaseDate');
  })
})