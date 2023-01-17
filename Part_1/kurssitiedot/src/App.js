const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Content = (props) => {
  console.log(props)
  return (
    <div>
      <Part part={props.part1.name} exercises={props.exercises1.exercises} />
      <Part part={props.part2.name} exercises={props.exercises2.exercises} />
      <Part part={props.part3.name} exercises={props.exercises3.exercises}/>
    </div>
  )
}
const Part = (props) => {
  return (
    <div>
      <p> {props.part} {props.exercises}</p>
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <p>Number of exercises {props.exercises1.exercises + props.exercises2.exercises + props.exercises3.exercises}</p>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
  {
    name: 'Fundamentals of react',
    exercises: 10
  },
  {
    name: 'Using props to pass data',
    exercises: 7
  },
  { 
    name: 'State of a component',
    exercises: 14
  }
]

  return (
    <div>
      <Header course={course} />
      <Content part1={parts[0]} part2={parts[1]} part3={parts[2]} exercises1={parts[0]} exercises2={parts[1]} exercises3={parts[2]} />
      <Total exercises1={parts[0]} exercises2={parts[1]} exercises3={parts[2]} />
    </div>
  )
}

export default App