import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]
const Header = ({text}) => (
      <h1>{text}</h1>
      )
  

const Button = ({ onClick, text }) => (  
  <button onClick={onClick}>    {text}  </button>
  )
const Display = ({text, votes}) => (
  <div> <p> {text}</p><p>has {votes} votes</p></div>
)

const App = (props) => {
  const select_random = () => ( Math.floor(Math.random() * ( anecdotes.length) ) )
  const [selected, setSelected] = useState( select_random() )
  const [votes, setVotes] = useState( anecdotes.map( (v) => (0) ) )
  const vote = () => { 
    const copy = [...votes]  
    copy[selected] += 1
    setVotes( copy )
  } 

  const most_votes = votes.reduce( (a,b,i) => a[0] < b ? [b,i] : a, [Number.MIN_VALUE,0] )

  
  return (
    <div>
      <Header text="Anecdote of the day"/>
      <Display text={anecdotes[selected]} votes={votes[selected]}/>
      <Button text="next anecdote" onClick={ () => { setSelected( select_random() )} }/>
      <Button text="vote" onClick={ () => { vote(  )} }/>
      <Header text="Anecdote with most votes"/>
      <Display text={anecdotes[most_votes[1]]} votes={votes[most_votes[1]]}/>
    </div>
  )
}


ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)