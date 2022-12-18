const express = require("express");
const https = require("https");
const parser = require("body-parser");
const app = express();
app.use(parser.urlencoded({extended: true}));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req, res) {
    var cityName = req.body.input1;
    https.get("https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid=519a95f8feb4ee2fb24ca1bd008f2dc1&units=metric", function(response) {
        response.on("data", function(data) {
            const myData = JSON.parse(data);
            const temp = myData.main.temp;
            const imgIcon = myData.weather[0].icon;
            const weatherDesc = myData.weather[0].description;
            res.write("<h1>The temperature in "+cityName+" is "+temp+"<sup>0</sup>C</h1>");
            res.write("<p>Weather is "+weatherDesc+"</p>");
            res.write("<img src=http://openweathermap.org/img/wn/"+imgIcon+"@2x.png>");
            res.send();
        })
    });

})

app.listen(3000, function() {
    console.log("Application started on port 3000");
})