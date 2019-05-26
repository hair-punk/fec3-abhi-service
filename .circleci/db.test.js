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
  it('should test the database and return the first item', async function(){
    var firstItem = dbQuery.query(1);
    expect(typeof await dbQuery.query(1)).toEqual('object');
    expect(firstItem).toHaveProperty('gameId');
  })

  it('should test server get /test', async function(){
    request.get('http://localhost:3007/test').on('response',function(response){
    });
  })
})