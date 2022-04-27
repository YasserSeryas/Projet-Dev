var express = require("express");

var app = express();

var readline = require("readline-async");

app.use(express.static("public"));

app.set("view engine", "ejs");
app.set("views", "./views");

app.listen(3000);

app.get("/", function(request, response)  {
   
    response.render("homePage");
});

app.get("/test", function(request, response)  {
   
    response.render("testPage");
});