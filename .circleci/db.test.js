const mongoose =require('mongoose');
// const fetch = require('fetch');

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

  it('should test server get /test', async function(){
    const req = new Request('http://localhost:3007/test', { method: 'GET' })
    fetch(req)
      .then(result => expect(result).toBe('woooo testing!!'))
  })
})