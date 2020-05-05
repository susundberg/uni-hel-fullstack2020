import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({text}) => (
      <h1>{text}</h1>
    )

const Button = ({ onClick, text }) => (  
      <button onClick={onClick}>    {text}  </button>
      )
const Statistic = ({text,value}) => (
     <tr><td> {text} </td><td> {value} </td></tr>
)

const Statistics = ({values}) => {
  
  const val_sum = values.reduce( (val,loop) => ( val + loop ) )
  if ( val_sum === 0 )
  { 
    return ( <p> No feedback given</p> )
  }

  const val_avg = ( values[0]*1 + values[1]*0 + values[2]*-1 )/val_sum
  const val_pos = values[0] / val_sum

  return(
    <table><tbody>
      <Statistic text="good" value ={values[0]} />
      <Statistic text="neutral" value ={values[1]} />
      <Statistic text="bad" value ={values[2]} />
      <Statistic text="all" value ={val_sum} />
      <Statistic text="average" value ={val_avg} />
      <Statistic text="positive" value ={val_pos} />
      </tbody></table>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const craft_inc = ( value, handler ) => {
    return () => { handler( value + 1) }
  }

  return (
    <div>
      <Header text="Give feedback"/>
      <Button onClick={craft_inc(good, setGood)} text="good"/>
      <Button onClick={craft_inc(neutral, setNeutral)} text="neutra"/>
      <Button onClick={craft_inc(bad, setBad)} text="bad"/>

      <Header text="Statistics"/>
      <Statistics values={[good, neutral, bad]}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)