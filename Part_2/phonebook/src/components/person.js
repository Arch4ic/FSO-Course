import React from 'react'

const Person = ({ person, handleRemove }) => {
    return(
    <p>{person.name} {person.number}&nbsp;
    <button onClick={handleRemove}>Remove</button></p>
    )
}


export default Person; 