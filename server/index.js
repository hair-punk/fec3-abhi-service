const express = require('express');
const bodyParser = require('body-parser');
const query = require('../database/index.js')
const AWS = require('aws-sdk');
let port = 3007;
const keys = require('../.aws/credentials.js')
let app = express();
AWS.config.update({
    accessKeyId:keys.AWS_ACCESS_KEY,
    secretAccessKey:keys.AWS_SECRET_KEY
});
var s3 = new AWS.S3();
var videoparams ={
  Bucket:keys.VIDEO_BUCKET,
  Key:''
};
var photoparams = {
  Bucket:keys.PHOTO_BUCKET,
  Key:''
}
app.use(express.static(__dirname + '/../dist'));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());


app.get('/gameObject', async function(req,res){
  videoparams.Key = req.query.id+'.mp4'
  var request =s3.getObject(videoparams);
  var object = request.promise();
  object.then((data)=>{console.log(data)}).catch((err)=>{
    console.log('error')
  })

  // console.log(object);
  res.send(await query.query(req.query.id));
})

app.get('/test', async function (req, res) {
  res.send('woooo testing!!');
})

app.listen(port, function(){
  console.log(`listening on port ${port}`);
})