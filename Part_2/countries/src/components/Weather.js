import React, {useState, useEffect } from 'react'
import countryService from '../services/countries'

const api_key = process.env.REACT_APP_API_KEY

const Weather = ({country}) => {
    const [weather, setWeather] = useState([])
    useEffect(() => {
        countryService
          .getWeather(api_key,country.capital)
          .then(initialWeather => {
            console.log('weather promise fullfilled')
            setWeather(initialWeather)
          })
      }, [country])
    console.log(weather)
    return(
        <div>
            <h2>Weather in {weather.name}</h2>
            {weather.main ? <p>Temperature is {weather.main.temp} Celcius</p> : null}
            <div>
                {weather.weather ? <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} /> : null}
            </div>
            {weather.wind ? <p>Wind {weather.wind.speed} m/s</p> : null}
        </div>
    )
}  

export default Weather