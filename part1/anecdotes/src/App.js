import { useState } from 'react'

const random = (props) => {
  const max = props.length
  return Math.floor(Math.random() * max)
}

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const AnecdoteDisplay = (props) => (
  <div>
    <p>{props.anecdote}</p>
    <p>has {props.votes} votes.</p>
  </div>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
   
  const len = anecdotes.length
  const [selected, setSelected] = useState(0)
  const [votes, setVote] = useState(Array(len).fill(0))
  const [maxVote, setMax] = useState(0)

  const handleNextClick = () => {
    setSelected(random(anecdotes))
  }

  const handleVoteClick = () => {
    const copy = [...votes]
    copy[selected] += 1
    if (copy[selected] > maxVote) {
      setMax(selected)
    }
    setVote(copy)
  }

return (
    <div>
      <div>
        <h1>anecdote of the day</h1>
        <AnecdoteDisplay anecdote={anecdotes[selected]} votes={votes[selected]} />
      </div>
      <Button handleClick={handleVoteClick} text="vote" />
      <Button handleClick={handleNextClick} text="next anecdote" />
      <div>
        <h1>anecodte with the most votes</h1>
        <AnecdoteDisplay anecdote={anecdotes[maxVote]} votes={votes[maxVote]} />
      </div>

    </div>
  )
}

export default App
