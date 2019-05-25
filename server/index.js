const express = require('express');
const bodyParser = require('body-parser');
const query = require('../database/index.js')
let port = 3007;


let app = express();
app.use(express.static(__dirname + '/../dist'));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());


app.get('/gameObject', async function(req,res){
  res.send(await query.query(req.query.id));
})

app.get('/test', async function (req, res) {
  res.send('woooo testing!!');
})

app.listen(port, function(){
  console.log(`listening on port ${port}`);
})