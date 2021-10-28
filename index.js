const express = require('express');
const app = express();
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const { urlencoded } = require('body-parser');
const { response } = require('express');

//app.use(bodyParser)

app.use(bodyParser.urlencoded({
    extended: true
  }));

require('dotenv').config();

app.get("/", (req, res)=>{
    res.sendFile(__dirname + "/index.html");
})

app.post("/", async(req, res)=>{
    let location = await req.body.city;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.APIKEY}&units=metric`;
    const response = await (fetch(url));
    const weatherData = await response.json();
    
    const temp = weatherData.main.temp;
    const disc = weatherData.weather[0].description;

   // res.send(`<h3>The current weather in ${location} is ${disc}</h3>`);
    res.send(`<h2>The current temperature in ${location} is ${temp} degree celcius and weather is ${disc}. </h2>`);
    
    //console.log(temp);
})

app.listen(3000, ()=>{
    console.log('Server is running...!');
})