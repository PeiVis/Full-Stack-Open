import { useState } from 'react'




const App = () => {
  const HandleIncrementClick = (arr, index) => {
    const newArr = arr.map((item, i) =>{
      if (i == index){ 
        item ++
        return item
      }
      else {
        return item
      }
    });
    setAry(newArr)
  }
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const min = 0;
  const max = anecdotes.length ;
  const [selected, setSelected] = useState(0)
  const [ary, setAry] = useState(new Uint8Array(max))
  console.log(ary)
  return (
    <div>
      <h1>Programming anecdotes:</h1>
      <p>{anecdotes[selected]}</p>
      <p>Votes: {ary[selected]}</p>
      <button onClick={() => setSelected(Math.floor(min + Math.random() * (max - min)))} >Next anecdote</button>
      <button onClick={() => HandleIncrementClick(ary,selected)} >Vote</button>
      <h1>Top voted anecdote:</h1>
      <p>{anecdotes[ary.indexOf(Math.max(...ary))]}</p>
      <p>Votes: {ary[ary.indexOf(Math.max(...ary))]}</p>
    </div>
  )
}

export default App 