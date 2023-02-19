//imports
import { useState, useEffect } from 'react'
import personService from  './services/persons'
import PersonForm from './components/personform';
import Person from './components/person';
import Error from './components/Error';
import './index.css'

function App() {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('a new person')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter,setNewFilter] = useState('')
  const [error, setError] = useState(null)

  //fetching persons list

  useEffect(() => {
    personService
      .getAll()
      .then(initialPerson => {
        setPersons(initialPerson)
      })
  }, [])

  //function for adding new person
  const addPerson = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber
    }

    const dupe_name = persons.map(person => person.name)

    if(newName === ''){
      alert('Name is missing!')  
    } else if((dupe_name.includes(newName))) {
      const msg =(`${newName} is already in phonebook, replace the old number with a new one?`)
      const confirm = window.confirm(msg)
      if(confirm) {
        updateName(personObject)
      }
    } else {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')  
      })
      .catch(error => {
        console.log(error.response.data)
        setError(error.response.data)
      })
    }
  }
  //function for updating persons name

  const updateName = (personObject) => {
    const updatePerson = persons.find(p => p.name === personObject.name)
    const updateId = updatePerson.id
    personService
      .update(updateId, personObject)
      .then(returnedPerson => 
        setPersons(persons.map(person => person.id !== updateId ? person : returnedPerson))
    )
  }

  //function for deleting person

  const removeName = (person) => {
    const msg = `Remove ${person.name} from phonebook?`
    const confirm = window.confirm(msg)
    if(confirm){
      personService
        .removePerson(person.id)
        .then(persons => 
          setPersons(persons)
        )}
  }

  // handlers
  const handlePersonChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  // conditional filtering
  const filterShow = newFilter ? persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase())) :
  persons

    return (
      <div>
        <h2>Phonebook</h2>
        <PersonForm 
          newFilter={newFilter} 
          handleFilter={handleFilter}
          addPerson={addPerson} 
          newName={newName} 
          handlePersonChange={handlePersonChange}
          newNumber={newNumber} 
          handleNumberChange={handleNumberChange}/>
        <div>{error && <Error error={error.error}/> }
        </div>
        <h3>Numbers</h3>
        <div>
          {filterShow.map(person =>
          <Person 
            key={person.name} 
            person={person}
            handleRemove={() => removeName(person)}/>
          )}
        </div>
      </div>
    );
}

export default App;
