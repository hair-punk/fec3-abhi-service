const request = require('request');

describe('express should pass these tests', ()=>{

  it('should test server get /test', async function(){
    request.get('http://localhost:3007/test').on('response',function(response){
    });
  });
});