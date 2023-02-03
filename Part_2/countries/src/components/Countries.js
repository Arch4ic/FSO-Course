import React from 'react'
import Weather from './Weather'

const Countries = ({filteredCountries, setNewFilter}) => {
  if(filteredCountries.length === 1) {
    const country = filteredCountries[0]
    return(
      <div>
        <h1>{country.name}</h1>
            <p>Capital: {country.capital}</p>
            <p>Area: {country.area}</p>
            <h2>Languages:</h2>
            <ul>
              {country.languages.map(language => 
                <li key={language.name}>{language.name}</li>)}
            </ul>
              <img
                  src={`${country.flag}`} 
                  alt={`flag of ${country.name}`}
                  height='100'
                  width='200' />
            <Weather country={country} />
        </div>
      )
    }
    if (filteredCountries.length > 10) return( <div>'Too many matches, please specify'</div>)
    return filteredCountries.map(country =>{
      return(
       <div key={country.name}>
        {country.name} <button value={country.name} onClick={(e) => setNewFilter(e.target.value)}>show</button>
      </div>
      )
    })
  } 
  
  

export default Countries