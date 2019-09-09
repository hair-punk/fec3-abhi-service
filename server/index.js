const express = require('express');
const bodyParser = require('body-parser');
const query = require('../database/index.js')
const AWS = require('aws-sdk');
const Recaptcha = require('express-recaptcha').RecaptchaV2;
let port = 3008;
require('dotenv').config();
// const keys = require('../.aws/credentials.js')
// const google = require('../.captcha/config.js')

var path = require('path');
const fs = require('fs')
const engines = require('consolidate');
let app = express();
// const googleSiteKey = google.GOOGLE_SITE_KEY;
// const googleSecretKey = google.GOOGLE_SECRET_KEY;

var s3 = new AWS.S3({apiVersion: '2006-03-01',
accessKeyId:process.env.AWS_ACCESS_KEY,
secretAccessKey:process.env.AWS_SECRET_KEY,
// accessKeyId:keys.AWS_ACCESS_KEY,
// secretAccessKey:keys.AWS_SECRET_KEY,

region:"us-west-1"});

var videoparams ={
  Bucket:process.env.VIDEO_BUCKET,
  // Bucket:keys.VIDEO_BUCKET,
  Key:''
};
var photoparams = {
  // Bucket:keys.PHOTO_BUCKET,
  Bucket:process.env.PHOTO_BUCKET,
  Key:''
}
var thumbnailparams = {
  // Bucket:keys.THUMBNAIL_BUCKET,
  Bucket:process.env.THUMBNAIL_BUCKET,
  Key:''
}

// var recaptcha = new Recaptcha(googleSiteKey,googleSecretKey);
const router = express.Router();
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.set("views",[__dirname+"/../dist"])

//Uncomment the following code to enable the site without captcha

app.use(express.static(__dirname + '/../dist'));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());


//Uncomment the following code and comment the previous code to enable the captcha

// app.engine('pug', engines.pug);
// app.engine('html', require('ejs').renderFile);

// app.use('/', router)
// app.use(express.static('./dist', {index:false}))


// router.get('/', recaptcha.middleware.render ,(req,res,next)=>{
//   console.log('get request received to /');
//   res.render('index.pug', {post: '/', captcha:res.recaptcha, path:req.path},

//   );
// });
// router.post('/', (req,res,next)=>{
//   console.log('post request recieved, delivering video player', req.body);
// });
// router.post('/captchasolved', recaptcha.middleware.verify,(req,res)=>{
//   console.log(req.bod, 'post request recieved at /captcha');
//   if(req.body !==''){
//     console.log('captcha passed')
//     res.render('index.html', {post: '/', error:res.recaptcha, path: req.path ,data:'index.html'} );
//   }else{
//     console.log('failed')
//   }
// });

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
