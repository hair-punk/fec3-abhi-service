const express = require('express');
const bodyParser = require('body-parser');
const query = require('../database/index.js')
const AWS = require('aws-sdk');
const Recaptcha = require('express-recaptcha').RecaptchaV2;
let port = 3008;
const keys = require('../.aws/credentials.js')
const router = express.Router;
var path = require('path');
const fs = require('fs')
const engines = require('consolidate');
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

var recaptcha = new Recaptcha('6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI','6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe')

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.set("views",['./server/views', "./dist"])
app.use(express.static('dist'))

app.engine('pug', engines.pug);
app.engine('html', require('ejs').renderFile);

app.get('/captcha',recaptcha.middleware.render, function(req,res){
res.render('index.pug', {post: '/', captcha:res.recaptcha, path:req.path})
})

app.get('/darkcaptcha', recaptcha.middleware.renderWith({'theme':'dark'}), (req, res) => {
  res.render('index.pug', {post:'/', captcha: res.recaptcha, path:req.path })
})

app.post('/', recaptcha.middleware.verify, (req, res) => {
  console.log(req.path);
  res.render('index.html', {post:'/',error:req.recaptcha.error, path:'/dist'})
  // res.render(path.resolve('dist/index'))
})
  // app.use(express.static(__dirname + '/../dist'));
// app.post('/', recaptcha.middleware.verify, function(req,res){
//   // recaptcha.verify(req, function(error, data){
//   //   res.sendFile('./index.html');
//   // })
//   res.sendFile(path.resolve('dist/index.html'))
// })

app.get('/gameObject', async function(req,res){
  var object =  ((await query.query(req.query.id))[0])
  object = JSON.parse(JSON.stringify(object));
  object.VideoLinks=[];
  object.PhotoLinks=[];
  object.ThumbnailLinks=[];
   var getVideoUrls = async function(obj){
    videoparams.Key = obj['videoFileNames'][0].toString()+'.mov';
    s3.getSignedUrl('getObject', videoparams, async(err,url)=>{
      if(err) console.log(err)
      else{
        obj.VideoLinks.push(url);
        videoparams.Key = obj['videoFileNames'][1].toString()+'.mov';
        s3.getSignedUrl('getObject', videoparams, async(err,url)=>{
          if(err) console.log(err)
          else{
            obj.VideoLinks.push(url);
            videoparams.Key = obj['videoFileNames'][2].toString()+'.mov';
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
})

app.get('/test', async function (req, res) {
  res.send('woooo testing!!');
})

app.listen(port, function(){
  console.log(`listening on port ${port}`);
})