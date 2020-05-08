import React from 'react'

const DisplayShort = ({ item, onExpand }) => (
    <li >Name: {item.name} <button name={item.name} onClick={onExpand}> show </button></li>
)

const DisplayFullLan = ({ name }) => (
    <li>{name}</li>
)

const DisplayFull = ({ item }) => (
    <div>
        Capital: {item.capital} <br />
        Population: {item.population}
        <ul>
            {item.languages.map((litem) => (
                <DisplayFullLan name={litem.name} key={litem.name} />
            ))}
            <img src={item.flag} alt="Flag" width="100" ></img>
        </ul>
    </div>
)

const Display = ({ filterWith, countries, expand, onExpand }) => {

    const flen = filterWith.length
    const fval = filterWith.toUpperCase()

    const name_filter = (v) => {
        const vcut = v.name.substring(0, flen)
        return vcut.toUpperCase() === fval
    }

    const countriesFiltered = countries.filter(name_filter);
    console.log('filtered', countriesFiltered.length)

    if (countriesFiltered.length > 10) {
        return (<p> Too many matches </p>)
    }
    console.log("Expend with:", expand )
    if (countriesFiltered.length > 1) {
        return (
            <div>
                <ul>
                    {countriesFiltered.map((item) => {
                        if (expand === item.name)
                            return (
                                <DisplayFull key={item.name} item={item} />
                            )
                        else
                            return (
                                <DisplayShort key={item.name} item={item} expand={expand} onExpand={onExpand} />
                            )
                    })
                    }
                </ul>
            </div>)
    }

    return (
        <DisplayFull item={countriesFiltered[0]} />
    )


}

export default Display