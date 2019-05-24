const mongoose =require('mongoose');

describe('populate', ()=>{
  beforeAll(async ()=>{
    connection = await mongoose.connect("mongodb://localhost/herodb");
  });
  expect(1).toBe(1);
  afterAll(async ()=>{
    await mongoose.disconnect();
  })
})