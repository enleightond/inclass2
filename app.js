var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var morgan = require("morgan");
var knex = require("./db/knex");
var methodOverride = require("method-override");
require("locus");
// middleware

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(morgan('tiny'));
app.use(methodOverride('_method'));

app.get('/students', function(req,res){
  knex('students').then(function(studentsFromDB){
    res.render("index", {students:studentsFromDB})
  });
});

app.get('/students/new', function(req,res){
  res.render("new");
});

app.post('/students', function(req,res){
  // knex('student').insert({name: req.body.name})
  knex('students').insert(req.body).then(function(){
    res.redirect('/students');
  });
});

app.get('/students/:id/edit', function(req,res){
  // find a student
  var id = req.params.id;
  knex('students').where({id: id}).first().then(function(student){
    // render "edit" and pass into your ejs file
    // the student that you have found
    res.render("edit", {student:student});
  });
});

app.put('/students/:id', function(req,res){
  // use knex to update the student
  // redirect to "/students"
});



app.listen(3000, function(){
  console.log("server starting on port 3000");
});
