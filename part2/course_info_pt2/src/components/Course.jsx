const Header = (props) => {
  return (
      <div>
        <h1>{props.course}</h1>
      </div>
  )
}

const Content = (props) => {
  const mappedParts = props.parts.map(part => <Part key={part.id} part = {part.name} exercise = {part.exercises}></Part>)
  return (
      <div>
        {mappedParts}
      </div>
  )
}

const Total = (props) => {
  console.log(props.parts)
  const exerciseCount = props.parts.reduce((previousValue, currentValue) => {
    console.log(previousValue)
    return previousValue + currentValue.exercises
  }, 0)
  return (
      <div>
        <h3>Number of exercises {exerciseCount}</h3>
      </div>
  )
}

const Part = (props) => {
  return (
      <div>
        <p>
          {props.part} {props.exercise}
        </p>
      </div>
  )
}

const Course = (props) => {
  const { courseParts, courseName } = props

  return (
        <div>
          <Header course= {courseName}></Header>
          <Content parts = {courseParts}></Content>
          <Total parts = {courseParts}></Total>
        </div>
  )
}

export default Course
