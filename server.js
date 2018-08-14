var express = require('express');
var hbs = require('hbs');
var app = express();
const fs = require('fs');
const port = process.env.PORT || 3000 ;
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear',() => {
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt',(text) => {
  return text.toUpperCase();
});
app.set('view engine','hbs');

app.use((req,res,next) =>{
  var now = new Date().toString();
  var log = `${now}: ${req.method} , ${req.url}`;
  fs.appendFile('server.log',log + '\n',(err) =>{
    if(err){
      console.log("server error");
    }
  });
  console.log(log);
  next();
});
// app.use((req,res,next) =>{
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));
app.get('/',(req,res) => {
  res.render('home.hbs',{
    pageTitle:'Home Page',
    pageHeader:'Home',
    pageText:'This Is Home Page',
  });
});
app.get('/projects',(req,res) =>{
  res.render('projects.hbs',{
    pageTitle:'Projects Page',
    pageHeader:'Projects',
    pageText:'This Is will be give sample projects !',
  });
});
app.get('/about',(req,res) => {
  res.render('about.hbs',{
    pageTitle:'About Page',
    pageHeader:'About',
    pageText:'This Is Abouttttttt',
  });
});
app.get('/bad',(req,res) => {
  res.send({
    errorMessage: 'Unable To get ...'
  });
});
app.listen(port , () =>{
  console.log(`Server Run On Port ${port}`);
});
