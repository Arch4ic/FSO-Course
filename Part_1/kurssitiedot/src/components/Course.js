import React from 'react'

const Header = ({ course }) => <h2>{course}</h2>

const Content = ({ parts }) => (
  <div>
    {parts.map(part => (
      <Part key={part.id} name={part.name} exercises={part.exercises} />
    ))}
  </div>
);

const Part = ({ name, exercises }) => (
  <p>
    {name} {exercises}
  </p>
);

const Course = ({ course }) => 
{
  const total = course.parts.reduce((sum, amount) => ({
    exercises: sum.exercises + amount.exercises
  }))

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <strong> total of {total.exercises} exercises </strong>
    </div>
  )
};

export default Course;