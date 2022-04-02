const Persons = ({ persons, handleDeleteRequest }) => 
  <>
    {persons.map(person => 
      <Person key={person.id} person={person} handleDeleteRequest={handleDeleteRequest} />
    )}
  </>

const Person = ({ person, handleDeleteRequest }) =>
<>
  <p>
    {person.name} {person.number} <DeleteButton id={person.id} handleDeleteRequest={handleDeleteRequest} />
  </p>
</>

const DeleteButton = ({ id, handleDeleteRequest }) => {
    // Deleting a name and number from the phone book
    return (
    <button onClick={handleDeleteRequest} id={id} >delete</button>
    )
  }

const PersonForm = ({addPerson, newName, handleNameChange, newNumber, handleNumberChange}) => (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>number: <input value={newNumber} onChange={handleNumberChange} /></div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
    )

const Filter = ({ newSearch, handleSearchChange }) => (
    <form>
        <div>
        filter show with <input value={newSearch} onChange={handleSearchChange} />
        </div>
    </form>
    )

const Notification = ({ message, status }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className={status}>
        {message}
      </div>
    )
}

export {
    Persons,
    PersonForm,
    Filter,
    Notification
}