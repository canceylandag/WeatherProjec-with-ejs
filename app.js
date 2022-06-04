const express = require('express');
const https = require('https');
const key = require(__dirname+'/apikey.js');
const app = express();


let querry="...",temp="...",weatherCond="...",imageUrl="asd";

app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.get("/", function(req, res) {


  res.render("result", {
    querry: querry,
    temp: temp,
    weatherCond:weatherCond,
    imageUrl:imageUrl
  });


});

app.post("/",function(req,res){

  console.log("Request Recieved");
   querry=req.body.cityName;
  const apiKey=key.apikey;
  const unit="metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+querry+"&appid="+apiKey+"&units="+unit;
  https.get(url, function(response) {

    console.log(response.statusCode);
    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
       temp = weatherData.main.temp;
       weatherCond = weatherData.weather[0].description;
      const icon=weatherData.weather[0].icon;
       imageUrl=" http://openweathermap.org/img/wn/"+icon+"@2x.png";
       res.redirect("/");



    })

  });

});

app.listen(3000, function() {


  console.log("Server started at port 3000.");

});
