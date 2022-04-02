import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({ search, handleSearchChange }) => (
  <form>
    <div>
      find countries <input value={search} onChange={handleSearchChange} />
    </div>
  </form>
)

const CountriesList = ({ countries }) => (
  <>
    {countries.map(country => 
    <Country key={country.name.common} country ={country} />
    )}
  </>
)

const Country = ({ country }) => {
  const [showExpanded, setShowExpanded] = useState (false)
  let countryDescription;
  let button;
  if (!showExpanded) {
    countryDescription = <CountryShort country={country} />;
    button = 'show';
  } else {
    countryDescription = <CountryExpanded country={country} />;
    button = 'hide';
  }
  
  return (
  <>
    {countryDescription}
    <button onClick={() => setShowExpanded(!showExpanded)}>{button}</button>
    <br/>
  </>
  )
}


const CountryShort = ({ country }) => {
  return(
  <>{country.name.common}  </>
  )
}

const CountryExpanded = ({ country }) => {
    // Variable for weather info
    const [weather, setWeather] = useState([])

    // Setting API key for Weather API
    const api_key = process.env.REACT_APP_API_KEY
    let capital = country.capital[0]
  
    // Importing weather from API
    useEffect(() => {
      axios
        .get('https://api.openweathermap.org/data/2.5/weather', {params: {
          q: capital,
          appid: api_key,
          units: 'metric'
        }
      })
        .then(response => {
          setWeather(response.data)
        })
    }, [])

  function WeatherDisplay ({country}) {
    if (weather.length === 0){
      console.log('Still no weather')
      return <></>
    }
    else {
      return <Weather weather={weather}/>
    }
  }
  
  return(
  <>
  <div>
  <h2>{country.name.common}</h2>
  <p>capital {country.capital}<br/>
  area {country.area}</p>
  <h3>languages:</h3>
    <ul>
      {Object.entries(country.languages).map(([key, value]) => <li key={key}>{value}</li>)}
    </ul>
  <img src={country.flags.png} alt={country.name.common} />
  </div>
  <div>
    <h2>Weather in {capital}</h2>
    <WeatherDisplay weather={weather} />
  </div>
  </>
  )
}

const Weather = ({ weather }) => {
  const url= `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
  return(
    <>
      <p>temperature {weather.main.temp} celsius</p>
      <p>wind {weather.wind.speed} m/s</p>
      <img src={url} alt="icon"></img>
    </>
  )
}

const FilterError = () => (
  <p>
    Too many matches, specify another filter
  </p>
)

const App = () => {
  // Variable for country list
  const [countries, setCountries] = useState([])

  // State variable for user  input
  const [search, setSearch] = useState('')

  // Handling typing changes
  const handleSearchChange = (event) => setSearch(event.target.value)

  // Importing countries from API
  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  // Filtering by name - !search will return true if search is empty and false otherwise
    const filtered = !search
    ? countries
    : countries.filter((country) =>
        country.name.common.toLowerCase().includes(search.toLowerCase())
      );

    function CountriesDisplay({ countries }) {
      if (countries.length === 1) {
        return <CountryExpanded country={filtered[0]} />;
      }
      if (countries.length < 10) {
        return <CountriesList countries={filtered} />;
      }
      return <FilterError /> 
    }


  return (
    <>
    <Filter search ={search} handleSearchChange={handleSearchChange} />
    <CountriesDisplay countries={filtered} />
    </>
  )
}

export default App;