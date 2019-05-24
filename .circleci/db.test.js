const mongoose =require('mongoose');

describe('populate', ()=>{
  beforeAll(async ()=>{
    connection = await mongoose.connect("mongodb://localhost/herodb");
  });
  afterAll(async ()=>{
    await mongoose.disconnect();
  });

  it('should be the first test', async ()=>{
    expect(1).toEqual(1);
  })
})