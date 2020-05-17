const express =require('express');
const app = express();
const bodyParser= require('body-parser');
//app.use(bodyParser.urlencoded({extended: true}));

//mongodb setup
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/nodeB');

var db=mongoose.connection;

db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
	console.log("connection succeeded");
})


app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('public'));//middleware

//app.get(path,callback);
app.get('/', function (req, res){
	//res.sendFile('C:/node+mongo+ejs' + '/index.html')
	db.collection('quotes').find().toArray(function(err, result){
		if(err) return console.log(err);

		res.render('index.ejs',{quotes: result});
	})
})

//insertion of data in database
app.post('/quotes', function (req,res){
	db.collection('quotes').save(req.body, function(err, result){
    //alert(req.body.name)
		if (err) return console.log(err);
    console.log('saved to database');
    console.log(req.body);
		res.redirect('/');
		
	})
	//db.collection('quotes').find().toArray(function(err, results){
	//	console.log(results);
	//})
})

app.post('/quote', (req, res) => {
  console.log(req.body.replace_name)
  console.log(req.body.old_quote)
  console.log(req.body.new_quote)
  
  db.collection('quotes').findOneAndUpdate({name: req.body.replace_name}, {
    $set: {
      name: req.body.replace_name,
      quote: req.body.new_quote
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err);
    res.redirect('/');
  })
}) 

app.post('/delete', (req, res) => {
  db.collection('quotes').findOneAndDelete({name: req.body.delete_name}, (err, result) => {
    if (err) return res.send(500, err);
      res.redirect('/')    
  })
})

app.listen(3000,function(){
	console.log('listening on 3000');
})