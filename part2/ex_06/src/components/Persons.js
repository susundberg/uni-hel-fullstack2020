import React from 'react'

const Person = ({person}) => (
    <li >Name: {person.name} Number: {person.number} </li>
)

const Persons = ({filterWith,persons}) => {

    const flen = filterWith.length
    const fval = filterWith.toUpperCase()

    const name_filter = (v) => { 
        const vcut = v.name.substring(0,flen)
        return vcut.toUpperCase() === fval
    }

    return (
    <div>
        <ul>
        { persons.filter(name_filter).map( (person) => (
            <Person key={person.name} person={person} />
            ) )
        }
        </ul>
    </div>)
}

export default Persons