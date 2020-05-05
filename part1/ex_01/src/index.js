import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
      <h1>{props.course.name}</h1>
    )
}
const Total = (props) => {
 
    const reducer = ( loop, val) => { return loop + val.exercises } 
    return (
      <p>Number of exercises { props.parts.reduce( reducer,0 ) }</p>
    )
}

const Part = (props) => {
  return (
  <p>{props.part.name} {props.part.exercises}</p>
  )
}

const Content = (props) => {
  return (
    <div>
      { props.parts.map( part => <Part part={part}/> ) }  
    </div>
  )
}

const App = () => {
  const course = {
    name : 'Half Stack application development',
        parts : [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }]
  }

  return (
    <div>
      <Header course={course}/>
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))