import { useState } from 'react'

const StatisticLine = props => (
  <tr>
    <td>{props.text}</td> 
    <td>{props.value}</td>
  </tr>
)


const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Statistics = (props) => {

  const good = props.good
  const neutral = props.neutral
  const bad= props.bad
  const total = good + neutral + bad

  const average = (good - bad)/total

  const positive = () => {
    const percentage = (good * 100)/total
    return percentage + ' %';
  }

  if (total === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  return (
    <div>
      <table>
        <tbdoy>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={total} />
          <StatisticLine text="average" value={average} />
          <StatisticLine text="positive" value={positive()} />
        </tbdoy>
      </table>
    </div>
  )
  }

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text="good" />
      <Button handleClick={handleNeutralClick} text="neutral" />
      <Button handleClick={handleBadClick} text="bad" />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App