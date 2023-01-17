import React, { useState } from 'react';

const Statistics = (props) => {
  if(props.sum === 0) {
    return (
      <div>No feedback given</div>
    )
  }
  return (
    <div>
      <StatisticLine value={props.value.good} text='good'/>
      <StatisticLine value={props.value.neutral} text='neutral' />
      <StatisticLine value={props.value.bad} text='bad' />
      <StatisticLine value={props.value.all} text='all' />
      <StatisticLine value={props.value.average} text='average' />
      <StatisticLine value={props.value.positive} text='positive' />  
    </div>
  )
}

const StatisticLine = (props) => {
  if (props.sum === 0) {
    return (
     <div>No feedback given</div>
    )
  }
  return (
    <div style={{padding: '5px'}}>{props.text} {props.value}</div>
  )}

const Button = (props) => {
  return (
  <button style={{background: '#FFFFFF',borderColor: '#D5D2D2',borderRadius: 4}} onClick={props.handleClick}>
    {props.text}
  </button>
)}

function App() {

  //counter funcs
  const goodPlusOne = () => SetGood(good + 1)
  const neutralPlusOne = () => SetNeutral(neutral + 1)
  const badPlusOne = () => SetBad(bad + 1)


  //seting up states
  const [ good, SetGood ] = useState(0)
  const [ neutral, SetNeutral ] = useState(0)
  const [ bad, SetBad ] = useState(0)
  
  const all = good+neutral+bad
  const average = ((good - -1*bad)/all).toFixed(4)
  const positive = ((good/all).toFixed(4) + '%')
  
  const nums = {good,neutral,bad,average,positive}
  
  return (
    <div style={{padding: '10px'}} className="App">
     <h1>give feedback</h1>
     <Button 
     handleClick={goodPlusOne}
     text='good'
    />
    <Button 
     handleClick={neutralPlusOne}
     text='neutral'
    />
    <Button 
     handleClick={badPlusOne}
     text='bad'
    />

    <h1>statistics</h1>
    <Statistics sum={all} value={nums} /> 
    </div>
  );
}

export default App;
