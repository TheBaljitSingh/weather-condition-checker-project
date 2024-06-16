const express = require("express");
const axios = require("axios");
const app = express();
require("dotenv").config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const cors = require('cors');
app.use(cors());


app.get("/", function(req, res) {
    console.log('Received a GET request');
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
    const city = req.body.cityName;

    console.log("Request Body: "+req.body.cityName);
    if (!city) {
        return res.status(400).send("City name is required.");
    }
    const apiKey = process.env.APIKEY;

    if (!apiKey) {
        console.error("API key is not defined. Please set it in the .env file.");
        process.exit(1);
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    axios.get(url)
        .then(response => {
            const weatherData = response.data;

            if (weatherData.cod === 200) {
                const temp = (weatherData.main.temp - 273.15).toFixed(1);
                const weatherDescription = weatherData.weather[0].description;
                const icon = weatherData.weather[0].icon;
                const imageURL = `https://openweathermap.org/img/wn/${icon}@2x.png`;
                const humidity = weatherData.main.humidity;
                const speed = (weatherData.wind.speed*3.6).toFixed(1);
                const countryCode = weatherData.sys.country;
                const rCity = weatherData.name;
                const feelLike = (weatherData.main.feels_like - 273.15).toFixed(1);
                res.status(200).send({
                    temp: temp,
                    description: weatherDescription,
                    imageURL: imageURL,
                    humidity: humidity,
                    wind: speed,
                    countryCode: countryCode,
                    rCity: rCity,
                    feelLike: feelLike
                });
            } else if (weatherData.cod === 404) {
                const message = weatherData.message;
                res.status(404).send({ message: message });
            } else {
                res.status(500).send("something went wrong");
            }
        })
        .catch(error => {
            console.log(error.message);
            res.status(500).send(error.message);
        });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
    console.log(`Server started on port ${PORT}.`);
});
