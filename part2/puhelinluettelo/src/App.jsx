import { useState, useEffect } from 'react'
import personService from './services/persons'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'
import Error from './components/Error'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const personsToShow = persons.filter(person => person.name.includes(newFilter))

  const showNotification = (message) => {
    setNotificationMessage(          
      message
    )        
    setTimeout(() => {          
      setNotificationMessage(null)        
    }, 5000)
  }

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
            showNotification(`Updated ${personObject.name}`)
        })
        .catch(error => {
          setErrorMessage(          
            `Information of ${personObject.name} has already been removed from server`
          )     
          setTimeout(() => {          
            setErrorMessage(null)        
          }, 5000)
          setPersons(persons.filter(n => n.id !== id))   
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
          showNotification(`Added ${personObject.name}`)
      })
    }
  }

  const deletePerson = (event) => {
    console.log("Button element", event)
    const person_name = event.target.parentElement.firstChild.textContent
    console.log("person_name", person_name)
    if (window.confirm(`Delete ${person_name}?`)) {
      const id = event.target.getAttribute("person_id")
      console.log("Id", id)
      personService      
        .remove(id)
        .then(data => {     
          console.log("data", data)   
          setPersons(persons.filter(person => person.id !== id))
          showNotification(`Removed ${person_name}`)
      })
    } else {
      console.log("Deletion cancelled")
    }
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} />
      <Error message={errorMessage} />
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <h2>Add a new person</h2>
      <PersonForm newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} addPerson={addPerson} />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} deletePerson={deletePerson}></Persons>
    </div>
  )

}

export default App