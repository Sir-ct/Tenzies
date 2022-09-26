import './App.css';
import Die from "./components/Die"
import Confetti from "react-confetti"
import {useEffect, useState} from "react"

function App() {
  const [diceArr, setDiceArr] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)

  useEffect(()=>{
    let allHeld = diceArr.every((die) => {return die.isHeld})
    let compval = diceArr[0].value
    let allEqual = diceArr.every((die)=>{return die.value === compval})
    
    if(allHeld && allEqual){
      setTenzies(true)
        console.log("you win")
    }
}, [diceArr])

  function allNewDice() {
      const newDice = []
      for (let i = 0; i < 10; i++) {
          newDice.push({value: Math.ceil(Math.random() * 6), isHeld:false, id: i})
      }
      return newDice
  }

  function rollDice(){
    let newEl;
    let newArr = [];
        
        for(let i=0; i < diceArr.length; i++){
            newEl = diceArr[i]
           if(newEl.isHeld === false){
               newEl.value = Math.ceil(Math.random()*6)
               newArr.push(newEl)
           }
           else {
               newArr.push(newEl)
           }
        }
        setDiceArr(newArr)
  }

  function holdDice(id) {
        let newEl;
        let newArr = [];
        console.log(id)
        for(let i=0; i < diceArr.length; i++){
            newEl = diceArr[i]
           if(newEl.id === id){
               newEl.isHeld = !newEl.isHeld
               newArr.push(newEl)
           }
           else {
               newArr.push(newEl)
           }
        }
        setDiceArr(newArr)
        
    }

    function restartGame(){
      diceArr.forEach((die)=>{
          holdDice(die.id)
      })
      setTenzies(false)
      setDiceArr(allNewDice())
  }
  
  let dice = diceArr.map((die, index)=>{
     return <Die key={index} value={die.value} isHeld={die.isHeld} id={die.id} click={holdDice} />
  })


  return (
    <main>
       <h1 className="title">Tenzies</h1>
        <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className="diecontainer">
           {dice}
        </div>
        <div className="roll" onClick={tenzies ? restartGame : rollDice}> {tenzies === true ? "New Game" : "Roll"} </div>

        {tenzies && <Confetti />}
    </main>
  );
}

export default App;
