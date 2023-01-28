import React from 'react'

const PersonForm = (props) => {
    return(
    <div>
        <form>
        <div>
          filter shown with <input
          value={props.newFilter} 
          onChange={props.handleFilter}
        />
        </div>
      <h3>add a new</h3>
      </form>
      <form onSubmit={props.addPerson}>
        <div>
          name: <input
            value={props.newName}
            onChange={props.handlePersonChange}
          />
        </div>
        <div>
          number: <input
            value={props.newNumber}
            onChange={props.handleNumberChange}
            />
        </div>
        <button type='submit'>add</button>
      </form>
    </div>
    )
}

export default PersonForm;