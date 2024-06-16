import { useEffect, useState } from "react";
import axios from "axios";



function App() {

  const[cityName, setCityName] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const[description, setDescription] = useState("");
  const[temp, setTemp] = useState("");
  const[imgUrl, setImgUrl] = useState("");
  const[wind, setWind] = useState("");
  const[humidity, setHumidity] = useState("");
  const[countryCode, setCountryCode] = useState("");
  const[rCity, setrCity] = useState("");
  const[feelsLike, setFeelsLike] = useState("");

  const handleInput = (e)=>{
    setCityName(e.target.value);
  }


  const handleSubmit = (e) => {
    e.preventDefault();

    const url = process.env.REACT_APP_BACKEND_URL;
    console.log(url);
    axios.post(url, { cityName })
      .then((response) => {
        if(response.status==200){
          console.log(response);
          setWeatherData(response.data);
          setError(null);
          setImgUrl(response.data.imageURL);
          setTemp(response.data.temp);
          setDescription(response.data.description);
          setWind(response.data.wind);
          setHumidity(response.data.humidity);
          setCountryCode(response.data.countryCode);
          setrCity(response.data.rCity);
          setFeelsLike(response.data.feelLike)


        }
      })
      .catch((error) => {
        setError(error);
        console.log(error);
      });
  };

  useEffect(()=>{
    handleSubmit({
      preventDefault:() =>{}
    });

  },[])

  return (


      <div   className="bg-gray-100 flex items-center justify-center min-h-screen" >
  <div  className={weatherData ?`bg-gray-200 p-8 rounded-lg shadow-md w-full max-w-sm space-y-2`:`bg-white p-8 rounded-lg shadow-md w-full max-w-sm space-y-2`}>
    <form  onSubmit={handleSubmit} class="space-y-4">
      <p class=" flex justify-center text-lg font-semibold">Check Weather</p>
      <input type="text" onChange={handleInput} value={cityName} class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter city name" required />
      <button type="submit" class="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">Check</button>
    </form>
      
      {(weatherData && !error ) && (
        <div  class=" rounded-lg p-8 w-100 ">
        <div class="flex items-center justify-between mb-4">
          <div>
            <h2 class="text-xl font-semibold mb-2">{rCity}, {countryCode}</h2>
            {/* <p class="text-sm"></p> */}
          </div>
          
          <img id="weather-icon" class="w-24 h-24 object-cover" src={imgUrl} alt="Weather Icon"/>
          </div>
        
        <div className="flex flex-row items-center justify-center mb-6 space-x-8">
        <div className="flex flex-col items-center">
          <span className="text-lg font-semibold">Temperature</span>
          <div className="flex items-center">
            <span id="temperature" className="text-4xl font-semibold"> {temp} </span>
            <span className="text-2xl">&deg;C</span>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-lg font-semibold">Feels Like</span>
          <div className="flex items-center">
            <span id="feels-like" className="text-4xl font-semibold"> {feelsLike} </span>
            <span className="text-2xl">&deg;C</span>
          </div>
        </div>
      </div>

        
        <p id="weather-description" class="text-lg text-center mb-6 -mt-4">{description}</p>
        <div class="grid grid-cols-2 gap-2">
          <div class="info-item flex flex-col items-center">
            <p class="font-semibold">{humidity}%</p>
            <p id="humidity">Humidity</p>
          </div>
          <div class="info-item flex flex-col items-center ">
            <p class="font-semibold">{wind} km/h</p>
            <p id="wind-speed">Wind Speed</p>
          </div>
         
        </div>
    </div>

      )}
      {error  &&(
        <div className="bg-gray-100 flex items-center justify-center min-h-20">
        <p className="flex justify-center text-lg font-semibold ">Enter Valid City Name</p>
      </div>
      )}
    

    </div>
  </div>
  );
}

export default App;
