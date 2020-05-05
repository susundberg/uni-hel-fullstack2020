import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
      <h1>{props.course}</h1>
    )
}
const Total = (props) => {
    return (
      <p>Number of exercises {props.count}</p>
    )
}

const Part = (props) => {
  return (
  <p>{props.name} {props.ex}</p>
  )
}

const Content = (props) => {
  return (
    <div>
    <Part name={props.part[0]} ex={props.ex[0]} />
    <Part name={props.part[1]} ex={props.ex[1]} />
    <Part name={props.part[2]} ex={props.ex[2]} />
    </div>
  )
}
const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course}/>
      <Content part={[part1,part2,part3]} ex={[exercises1,exercises2,exercises3]} />
      <Total count={exercises1 + exercises2 + exercises3} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))