const express = require("express");
const bodyParser =require("body-parser");
const ejs = require("ejs");
const https = require("https");
const fs = require('fs');
const request = require('request');
require('dotenv').config();

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine" , "ejs");


app.get("/",function(req,res){
  res.render("home");
});

app.post("/",function(req,res){
    const book_name = req.body.book_name;
    const v = process.env.variable;
    const url = "https://www.googleapis.com/books/v1/volumes?q="+book_name+"&key="+v;

    console.log(book_name);

    request(url, { json: true }, (err, response, body) => {
    if (err) {
      return console.log(err);
    }else{
      console.log(response.statusCode);
      if(response.statusCode === 200){
            res.render("search",{data:body});
            if(body.totalItems === 0){
                res.render("nosearch");
            }else{
                res.render("search",{data:body});
            }
      }else{
          res.render("nosearch");
      }
    }

  });

});

app.listen(process.env.PORT || 3000,function(req,res){
  console.log("Server started on port 3000.");
});
