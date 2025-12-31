import axios from 'axios'
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather'

const getWeather = (cityName) => {
  console.log("Fetching weather data for ", cityName)
  const api_key = import.meta.env.VITE_API_KEY
  return axios.get(`${baseUrl}?q=${cityName}&appid=${api_key}`)
  //const request = axios.get(`${baseUrl}?q=${cityName}&appid=${api_key}`)
  //return request.then(response => response.data)
}

export default getWeather