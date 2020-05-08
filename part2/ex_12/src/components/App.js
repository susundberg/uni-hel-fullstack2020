import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Filter from './Filter';
import Display from './Display';



const App = () => {

    const stateFilters = useState('')
    const [ stateData, stateDataSet ] = useState([])
    const stateExpand = useState('')

    useEffect(() => {
        console.log('effect');
        axios.get('https://restcountries.eu/rest/v2/all').then(response => {
            console.log('promise fulfilled');
            stateDataSet(response.data);
        });
    }, []);

    const onExpand = (event) => {
       console.log('Show', event.target.name )
       stateExpand[1]( event.target.name );
    }

    console.log('render', stateData.length, 'data');

    const onFilterChange = (event) => {
        const value = event.target.value
        stateFilters[1](value)
        console.log("filter", value)
    }

    if (stateData.length === 0)
        return (<div> Loading .. </div>)


    return (
        <div>
            <h3>Filter</h3>

            <Filter text={stateFilters[0]} change={onFilterChange} />

            <h3>Show</h3>

            <Display filterWith={stateFilters[0]} expand={stateExpand[0]} onExpand={onExpand} countries={stateData} />
        </div>
    )


}

export default App

