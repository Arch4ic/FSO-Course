import React, {useState, useEffect } from 'react'

import countryService from './services/countries'
import Countries from './components/Countries'

function App() {

  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')

  const filteredCountries = countries.filter(country => country.name.toLowerCase().includes(newFilter.toLowerCase()))

  const handleFilter = (e) => {
    setNewFilter(e.target.value)
    }

  useEffect(() => {
    countryService
      .getAll()
      .then(initialCountry => {
        console.log('promise fullfilled')
        setCountries(initialCountry)
      })
  }, [])
  return (
    <div className="App">
      <div>
          find countries <input value={newFilter} onChange={handleFilter} />
        <Countries
            filteredCountries={filteredCountries} setNewFilter={setNewFilter} />
      </div>
    </div>
    
  );
}

export default App;
