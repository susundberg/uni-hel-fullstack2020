import React, { useState } from 'react'

import Persons from './Persons';
import PersonForm from './PersonForm';
import Filter from './Filter';



const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Ada Lovelace', number: '39-44-5323523' },
        { name: 'Dan Abramov', number: '12-43-234345' },
        { name: 'Mary Poppendieck', number: '39-23-6423122' }
      ])

    const stateNewPerson = useState({'name':'','number':''})
    const stateFilters = useState('') 


    const onFilterChange = (event) => {
        const value = event.target.value
        stateFilters[1]( value )
        console.log("filter", value)
    }

    const onNewPersonSubmit = (event) => {
        event.preventDefault()    
        console.log('Submit new', stateNewPerson[0] )
        const newName = stateNewPerson[0].name.toUpperCase()

        const found = persons.reduce( (v,f) => ( v + (f.name.toUpperCase() === newName)), false  )
        console.log("found", found)
        if (found)
        {
            alert("Person " + newName + " exists!");
            return
        }
        const newPerson = {...stateNewPerson[0] } 
        stateNewPerson[1]( {'name':'', 'number':''})  
        setPersons( persons.concat(newPerson)  )
        
    }

    const onNewPersonChange = (event) => {
        const item = event.target.name
        const value = event.target.value

   
        const newPerson = {...stateNewPerson[0], [item]: value};
        console.log("new person", newPerson)
        stateNewPerson[1]( newPerson )
    }

    return (
        <div>
            <h2>Phonebook</h2>

            <Filter text={stateFilters[0]} change={onFilterChange}/> 

            <h3>Add a new</h3>

            <PersonForm state={stateNewPerson[0]} submit={onNewPersonSubmit} change={onNewPersonChange}/>

            <h3>Numbers</h3>

            <Persons filterWith={stateFilters[0]} persons={persons} />
        </div>
    )


}

export default App