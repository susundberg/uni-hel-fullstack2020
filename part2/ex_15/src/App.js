import React, { useState, useEffect } from 'react'


import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';
import PersonsService from './services/Persons'


const App = () => {
    const [persons, setPersons] = useState([])

    const stateNewPerson = useState({ 'name': '', 'number': '' })
    const stateFilters = useState('')


    useEffect(() => {
        console.log('effect');
        PersonsService.getAll()
            .then(data => {
                console.log('got data', data)
                setPersons(data);
            }
            )
            .catch(error => { console.log("Failed", error) })
    }, []);

    console.log('render', persons.length, 'persons');


    const onFilterChange = (event) => {
        const value = event.target.value
        stateFilters[1](value)
        console.log("filter", value)
    }

    const onDelete = (event) => {
        const targetID = parseInt(event.target.name)
        console.log("delete", targetID)
        console.log(persons)

        const index = persons.findIndex((loop) => (loop.id === targetID))
        console.log('Remove index', index)

        if (index < 0)
            return; // not good!

        if (window.confirm("Really delete " + persons[index].name + "?") === false)
            return;

        console.log('Confirmation ok')

        PersonsService.remove(targetID)
            .then(resp => {
                const newPers = [...persons]
                newPers.splice(index, 1);
                console.log(newPers)
                setPersons(newPers)
            })
            .catch(error => { console.log("Failed", error) })
    }

    const onNewPersonSubmit = (event) => {
        event.preventDefault()
        console.log('Submit new', stateNewPerson[0])
        const newName = stateNewPerson[0].name.toUpperCase()

        const index = persons.findIndex((loop) => (loop.name.toUpperCase() === newName))

        console.log("found", index)
        const newPerson = { ...stateNewPerson[0] }

        const finalizeSubmit = ( newPersons ) => {
            stateNewPerson[1]({ 'name': '', 'number': '' })
            setPersons( newPersons );
            
        }

        if (index >= 0) {

            if (window.confirm("Person " + newName + " exists! Replace with new?") === false) {
                console.log('bail out!')
                return
            }

            PersonsService.update(persons[index].id, newPerson)
            .then( dbPerson => {
                let newPersons = [...persons]
                newPersons[index] = dbPerson
                finalizeSubmit( newPersons );
            })
            .catch(error => { console.log("Failed", error) })

            return;
        }
        else {
            // Did not exists, create new.
            PersonsService.create(newPerson)
                .then(dbPerson => {
                    finalizeSubmit( persons.concat(dbPerson) )
                    
                })
                .catch(error => { console.log("Failed", error) })
        }
    }

    const onNewPersonChange = (event) => {
        const item = event.target.name
        const value = event.target.value


        const newPerson = { ...stateNewPerson[0], [item]: value };
        console.log("new person", newPerson)
        stateNewPerson[1](newPerson)
    }

    return (
        <div>
            <h2>Phonebook</h2>

            <Filter text={stateFilters[0]} change={onFilterChange} />

            <h3>Add a new</h3>

            <PersonForm state={stateNewPerson[0]} submit={onNewPersonSubmit} change={onNewPersonChange} />

            <h3>Numbers</h3>

            <Persons filterWith={stateFilters[0]} persons={persons} remove={onDelete} />
        </div>
    )


}

export default App

