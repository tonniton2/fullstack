import { useState, useEffect } from 'react'
import getAll from './services/countries'
import getWeather from './services/weather'

const parseOneCountry = (country, setWeatherData) => {
  getWeather(country.capital)
    .then(response => {
      const weather = response.data
      console.log("Weather data fetched: ", weather)
      setWeatherData(parseWeather(weather))
    })
  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>capital {country.capital ? country.capital[0] : 'N/A'}</div>
      <div>area {country.area}</div>
      <div>population {country.population}</div>
      <h2>languages:</h2>
      <ul>
        {country.languages ? Object.values(country.languages).map(lang => <li key={lang}>{lang}</li>) : <li>N/A</li>}
      </ul>
      <img src={country.flags ? country.flags.png : ''} alt={`Flag of ${country.name.common}`} />
      <div>
        <h2>Weather in {country.capital ? country.capital[0] : 'N/A'}</h2>
      </div>
    </div>
  )
}

const listCountryNames = (countries, setCountryData, setWeatherData) => {
  return (
    <div>
      {countries.map(country => 
        <li key={country.name.common}>{country.name.common}
          <button onClick={() => 
          setCountryData(parseOneCountry(country, setWeatherData))}>show
          </button>
        </li>
      )}
    </div>
  )
}

const parseWeather = (city) => {
  return (
    <div>
      <div>temperature {(city.main.temp - 273.15).toFixed(2)} Celsius</div>
      <img src={`http://openweathermap.org/img/wn/${city.weather[0].icon}.png`} alt="Weather icon" />
      <div>wind {city.wind.speed} m/s</div>
    </div>
  )
}

const App = () => {
  const [value, setValue] = useState('')
  const [countryData, setCountryData] = useState([])
  const [weatherData, setWeatherData] = useState([])
  console.log("jeejee")
  const parseCountryData = (data) => {
    const results = data.filter(c => c.name.common.toLowerCase().includes(value.toLowerCase()))
    console.log(results)
    setWeatherData([])
    if (results.length === 0) {
      return []
    } else if (results.length === 1) {
      return parseOneCountry(results[0], setWeatherData)
    } else if (results.length < 11) {
      return listCountryNames(results, setCountryData, setWeatherData)
    } else {
      return ["Too many matches, specify another filter"]
    }
  }

  useEffect(() => {
    if (value) {
      getAll()
      .then(response => {
        console.log("Country data fetched")
        const data = parseCountryData(response.data)
        console.log("Country data fetched parsed: ", data)
        setCountryData(data)     
      })
    }
  }, [value])

  
  const handleChange = (event) => {
    setValue(event.target.value)
  }

  return (
  <div>
    find countries: <input value={value} onChange={handleChange} />
    <pre>
      {countryData}
      {weatherData}
    </pre>
  </div>
  )
}

export default App