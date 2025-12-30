import { useState, useEffect } from 'react'
import personService from './services/persons'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const personsToShow = persons.filter(person => person.name.includes(newFilter))

  useEffect(() => {
    personService      
    .getAll()      
    .then(initialPersons => {        
      setPersons(initialPersons)      
    })  
  }, [])
  console.log('render', persons.length, 'persons')

  const handleNameChange = (event) => {    
    console.log(event.target.value)    
    setNewName(event.target.value)  
  }

  const handleNumberChange = (event) => {    
    console.log(event.target.value)    
    setNewNumber(event.target.value)  
  }

  const handleFilterChange = (event) => {    
    console.log(event.target.value)    
    setNewFilter(event.target.value)  
  }

  const addPerson = (event) => {    
    event.preventDefault()    
    const personObject = {
      name: newName,
      number: newNumber,
    }
    if (persons.some(person => person.name === newName)) {
      if (window.confirm(`${newName} is already in the phonebook. Update the number?`)) {
        const id = persons.find(person => person.name === newName).id
        console.log("Button element", newName)
        personService      
          .update(id, personObject)      
          .then(returnedPerson => {      
            setPersons(persons.map(person => person.id !== returnedPerson.id ? person : returnedPerson))     
            setNewName('')      
            setNewNumber('')
        })
      } else {
        console.log("Update cancelled")
      }
    } else {
      personService      
        .create(personObject)      
        .then(returnedPerson => {        
          setPersons(persons.concat(returnedPerson))        
          setNewName('')      
          setNewNumber('')
      })
    }
  }

  const deletePerson = (event) => {
    console.log("Button element", event)
    if (window.confirm(`Delete ${event.target.parentElement.firstChild.textContent}?`)) {
      const id = event.target.getAttribute("person_id")
      console.log("Id", id)
      personService      
        .remove(id)
        .then(data => {     
          console.log("data", data)   
          setPersons(persons.filter(person => person.id !== id))
      })
    } else {
      console.log("Deletion cancelled")
    }
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <h2>Add a new person</h2>
      <PersonForm newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} addPerson={addPerson} />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} deletePerson={deletePerson}></Persons>
    </div>
  )

}

export default App