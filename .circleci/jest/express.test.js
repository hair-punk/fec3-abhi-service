const request = require('request');

describe('express should pass these tests', ()=>{
  it('should test server get /test', async function(){
    request.get('http://localhost:3008/test').on('response',function(response){
    });
  });
});