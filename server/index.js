const express = require('express');
const bodyParser = require('body-parser');
const query = require('../database/index.js')
const AWS = require('aws-sdk');
let port = 3007;
const keys = require('../.aws/credentials.js')
let app = express();
var s3 = new AWS.S3({apiVersion: '2006-03-01',
accessKeyId:keys.AWS_ACCESS_KEY,
secretAccessKey:keys.AWS_SECRET_KEY,
region:"us-west-1"});
var videoparams ={
  Bucket:keys.VIDEO_BUCKET,
  Key:''
};
var photoparams = {
  Bucket:keys.PHOTO_BUCKET,
  Key:''
}
var thumbnailparams = {
  Bucket:keys.THUMBNAIL_BUCKET,
  Key:''
}
app.use(express.static(__dirname + '/../dist'));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());


app.get('/gameObject', async function(req,res){
  var object =  ((await query.query(req.query.id))[0])
  object = JSON.parse(JSON.stringify(object));
  object.VideoLinks=[];
  object.PhotoLinks=[];
  object.ThumbnailLinks=[];
   var getVideoUrls = async function(obj){
    videoparams.Key = obj['videoFileNames'][0].toString()+'.mp4';
    s3.getSignedUrl('getObject', videoparams, async(err,url)=>{
      if(err) console.log(err)
      else{
        obj.VideoLinks.push(url);

        videoparams.Key = obj['videoFileNames'][1].toString()+'.mp4';
        s3.getSignedUrl('getObject', videoparams, async(err,url)=>{
          if(err) console.log(err)
          else{
            obj.VideoLinks.push(url);

            videoparams.Key = obj['videoFileNames'][2].toString()+'.mp4';
            s3.getSignedUrl('getObject', videoparams, async(err,url)=>{
              if(err) console.log(err)
              else{
                obj.VideoLinks.push(url);
                photoparams.Key = obj['photoFileNames'][0].toString()+'.jpg';
                s3.getSignedUrl('getObject', photoparams,(err,url)=>{
                  if(err){
                    console.log('couldnt get photo', err)
                  }else{
                    object.PhotoLinks.push(url);
                    photoparams.Key = obj['photoFileNames'][1].toString()+'.jpg';
                    s3.getSignedUrl('getObject', photoparams,(err,url)=>{
                      if(err){
                        console.log('couldnt get photo', err)
                      }else{
                        object.PhotoLinks.push(url);
                        thumbnailparams.Key = obj['videoFileNames'][0].toString()+'.jpg';
                        s3.getSignedUrl('getObject', thumbnailparams, (err, url)=>{
                          if(err){
                            console.log('coundnt get thumbnail',err)
                          }else{
                            obj.ThumbnailLinks.push(url);
                            thumbnailparams.Key = obj['videoFileNames'][1].toString()+'.jpg';
                            s3.getSignedUrl('getObject', thumbnailparams, (err, url)=>{
                              if(err){
                                console.log('coundnt get thumbnail',err)
                              }else{
                                obj.ThumbnailLinks.push(url);
                                thumbnailparams.Key = obj['videoFileNames'][2].toString()+'.jpg';
                                s3.getSignedUrl('getObject', thumbnailparams, (err, url)=>{
                                if(err){
                                  console.log('coundnt get thumbnail',err)
                                }else{
                                  obj.ThumbnailLinks.push(url);
                                  res.send(obj)
                                }
                              })
                              }
                               })
                          }
                        })
                      }
                    })
                  }
                })

              }
            })
          }
        })
      }
    })
  }
  getVideoUrls(object);
   //res.send(object);
})

  // var getVideoUrl = async function(object,x){
  //  if(x!==-1){
  //     videoparams.Key = object['videoFileNames'][x].toString()+'.jpg';
  //     s3.getSignedUrl('getObject', videoparams, async(err,url)=>{
  //       if(err){
  //         console.log('couldnt get video', err);
  //       }else{
  //         object.VideoLinks.push(url);
  //         x--;
  //         await getVideoUrl(object,x)
  //       }
  //     })
  //   }
  // //  videoparams.Key = object['videoFileNames'][x].toString()+'.mp4'
  //   //  s3.getSignedUrl('getObject', videoparams,(err,url)=>{
  //   // if(err){
  //   //   console.log('couldnt get video', err)
  //   // }else{
  //   //   object.VideoLinks.push(url);
  //   // }
  //   // }, )
  // }



    // var getPhotoUrl= function(x){
    // photoparams.Key = object['photoFileNames'][x].toString()+'.jpg';
    // s3.getSignedUrl('getObject', photoparams,(err,url)=>{
    //   if(err){
    //     console.log('couldnt get photo', err)
    //   }else{
    //     object.PhotoLinks.push(url);
    //   }
    // })
    // }
    // var getThumbnailUrl = function(x){
    // thumbnailparams.Key = object['videoFileNames'][x].toString()+'.jpg';
    // s3.getSignedUrl('getObject', thumbnailparams, (err, url)=>{
    //   if(err){
    //     console.log('coundnt get thumbnail',err)
    //   }else{
    //     object.ThumbnailLinks.push(url);
    //   }
    // })
    // }
  // for(var x = 0; x < object['photoFileNames'].length;x++){
  // await  getPhotoUrl(x)
  // }
  // for(var x = 0;x < object['videoFileNames'].length;x++){
  // await getThumbnailUrl(x);
// }

// function getVideoUrl(obj,x){
// videoparams.Key = obj['videoFileNames'][x].toString()+'.mp4'
// s3.getSignedUrl('getObject', videoparams,(err,url)=>{
// if(err){
//   console.log('couldnt get video', err)
// }else{

//   obj[VideoLinks].push(url);
// }
// })
// }
// function getPhotoUrl(obj,x){
// photoparams.Key = obj['photoFileNames'][x].toString()+'.jpg';
// s3.getSignedUrl('getObject', photoparams,(err,url)=>{
//   if(err){
//     console.log('couldnt get photo', err)
//   }else{

//     obj.PhotoLinks.push(url);
//   }
// })
// }
// function getThumbnailUrl(obj,x){
// thumbnailparams.Key = obj['videoFileNames'][x].toString()+'.jpg';
// s3.getSignedUrl('getObject', thumbnailparams, (err, url)=>{
//   if(err){
//     console.log('coundnt get thumbnail',err)
//   }else{

//     obj.ThumbnailLinks.push(url);
//   }
// })
// }

app.get('/test', async function (req, res) {
  res.send('woooo testing!!');
})

app.listen(port, function(){
  console.log(`listening on port ${port}`);
})