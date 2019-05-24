const mongoose =require('mongoose');

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
})