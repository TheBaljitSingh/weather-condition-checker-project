const bodyParser = require("body-parser");
const express = require("express");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
// const bodyParser = require("body-parser");

app.get("/", function(req, res){

    res.sendFile(__dirname+ "/index.html");


});

app.post("/", function(req,res){
    // console.log("post recieved");
        //we have to update city by dynamically
        
        const city = req.body.cityName;
        const apiKey = "5fd1b75bb900e01348f58d783422334b";
        const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apiKey+"";
        https.get(url, function(response){
            console.log("statusCode", response.statusCode);
    
    
            response.on("data", function(data){
                // process.stdout.write(data);
                
                const weatherData = JSON.parse(data);
                console.log(weatherData.cod);
                if(weatherData.cod==200){
                const temp = ((weatherData.main.temp)-273.15).toFixed(1);
                const weatherDescription = weatherData.weather[0].description;
                const icon = weatherData.weather[0].icon;
                const imageURL = "https://openweathermap.org/img/wn/"+icon+"@2x.png";
                
                // console.log(temp, Description);
                //try to send the city requested dynamically
                res.write("<p> The weather is currently " + weatherDescription + "</p>");
                res.write("<h1> The temperature in "+city+" is "+ temp + " degrees Celcius.</h1> ")               
                
    
                res.write("<img src="+imageURL+" width=100 height=100 >")
                res.send();

                } else if(weatherData.cod==404){
                    const message = weatherData.message;
                    res.write("<h1>"+message+"</h1>");
                    res.send();

                } else{
                    res.send("Somthing wrong please Try later some time");
                }
                
    
            })
    
        });
    


})




app.listen(process.env.PORT || 3000, function(req, res){
    console.log("Server started at port 3000.");
})  
