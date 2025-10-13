import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/cloud.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import humidity_icon from '../assets/humidity.png'
import wind_icon from '../assets/wind.png'

const Weather = () => {

  const inputRef = useRef();

  const [weatherData, setWeatherData] = useState(false);



  const search = async(city) => {
    if(city === ""){
      alert("Please enter a city name");
      return;
    }

    try {
     const url = `https://api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_APP_ID}&q=${city}`;

    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    setWeatherData({
      humidity : data.current.humidity,
      windSpeed : data.current.wind_kph,
      temperature : data.current.temp_c,
      location : data.location.name,
      icon : data.current.condition.icon
    });

    } catch (error) {
      setWeatherData(false);
      console.error("Error fetching weather data");
    }
  }

  useEffect(() => {
    search("Delhi");
  }, [])

  return (
    <div className='weather'>
        <div className="search-bar">
          <input ref={inputRef} type="text" placeholder='Search'/>
          <img onClick={() => search(inputRef.current.value)} src={search_icon} alt="" />
        </div>
        {weatherData ? <>
         <img src={weatherData.icon} alt="" className='weather-icon' />
        <p className='temperature'>{weatherData.temperature}°C</p>
        <p className='location'>{weatherData.location}</p>
        <div className="weather-data">
          <div className="col">
            <img src={humidity_icon} alt="" />
            <div>
              <p>{weatherData.humidity} %</p>
              <span>Humidity</span>
            </div>
          </div>
          <div className="col">
            <img src={wind_icon} alt="" />
            <div>
              <p>{weatherData.windSpeed} Km/h</p>
              <span>Wind Speed</span>
            </div>
          </div>
        </div>
        </> 
        :<p>Loading...</p> }
    </div>
  )
}

export default Weather