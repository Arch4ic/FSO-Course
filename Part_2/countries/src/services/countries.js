import axios from 'axios' 

//Functions to handle both api requests

const baseUrl = 'https://restcountries.com/v2/all'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}
//Function to fetch weather data from specific city and display data in metric system
const getWeather = (key,city) => {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}`
    const request = axios.get(weatherUrl)
    return request.then(response => response.data)
}

export default { getAll, getWeather }