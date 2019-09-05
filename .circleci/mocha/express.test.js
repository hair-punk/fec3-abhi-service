const request = require('request');
var chai = require('chai');
var assert = chai.assert;
describe('testing the test endpoint', function(){
  it('should test server get /test', async function(){

    request('http://localhost:3008/test' ,function(err,res,item){
      assert.equal(item, 'woooo testing!!')
    })
  });
});
describe('should get an object as a response',function(){
  var item;
  request("http://localhost:3008/gameObject"+'?id='+Math.ceil(Math.random()*100),(err,res, data)=>{
      item = JSON.parse(data);
  });
  it('should get a valid game object as a response', function(){
    assert.equal(typeof item, 'object');
  });
  it('the object from the response must have valid game item fields',function(){
    if(typeof item === 'object'){
        assert.property(item, 'gameId');
        assert.property(item, 'gameTitle')
        assert.property(item, 'gameDescription');
        assert.property(item, 'gameDeveloper');
        assert.property(item, 'gamePublisher');
        assert.property(item, 'releaseDate');
    }else{
      this.skip;
    }
  })
  it('the object must have valid video links', function(){
    //This does not and cannot test to see if the video links work.  That has to be tested manually.  It only tests if the links have valid signatures, access keys, and file extensions.
    if(typeof item === 'object'){
      for(var x = 0;x < item.VideoLinks.length;x++){
        assert.include(item.VideoLinks[x], 'Signature=');
        assert.include(item.VideoLinks[x], 'AWSAccessKeyId=')
        assert.include(item.VideoLinks[x], '.mov')
      }
    }else{
      this.skip;
    }
  })
  it('the object must have valid photo links', function(){
    //This does not and cannot test to see if the photo links work.  That has to be tested manually.  It only tests if the links have valid signatures and access keys.
    if(typeof item === 'object'){
      for(var x = 0;x < item.PhotoLinks.length;x++){
        assert.include(item.PhotoLinks[x], 'Signature=');
        assert.include(item.PhotoLinks[x], 'AWSAccessKeyId=')
        assert.include(item.PhotoLinks[x], '.jpg')
      }
    }else{
      this.skip;
    }
  })
  it('the object must have valid thumbnail links', function(){
    //This does not and cannot test to see if the thumbnail links work.  That has to be tested manually.  It only tests if the links have valid signatures and access keys.
    if(typeof item === 'object'){
      for(var x = 0;x < item.ThumbnailLinks.length;x++){
        assert.include(item.ThumbnailLinks[0], 'Signature=');
        assert.include(item.ThumbnailLinks[0], 'AWSAccessKeyId=')
        assert.include(item.ThumbnailLinks[x], '.jpg')
      }
    }else{
      this.skip;
    }
  })
})

describe('should get some random game objects as a response and they must be valid ', function(){

    for(var x=0;x < 10;x++){
      var item;
      request("http://localhost:3008/gameObject"+'?id='+Math.ceil(Math.random()*100),(err,res, data)=>{
          item = JSON.parse(data);
      });
      it('should get a valid game object as a response', function(){
        assert.equal(typeof item, 'object');
      });
      it('the object from the response must have valid game item fields',function(){
        if(typeof item === 'object'){
            assert.property(item, 'gameId');
            assert.property(item, 'gameTitle')
            assert.property(item, 'gameDescription');
            assert.property(item, 'gameDeveloper');
            assert.property(item, 'gamePublisher');
            assert.property(item, 'releaseDate');
        }else{
          this.skip;
        }
      })
    }

})