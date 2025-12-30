const Persons = ({ personsToShow, deletePerson }) => {
  console.log("Persons to show:", personsToShow)
  return (
    <div>
      {personsToShow.map(person => 
        <li key={person.id}>{person.name} {person.number}
          <button onClick={deletePerson} person_id={person.id}>delete</button>
        </li>
      )}
    </div>
  )
}

export default Persons