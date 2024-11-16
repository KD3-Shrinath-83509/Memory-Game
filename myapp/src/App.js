import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';


const cardImages = [
  {"src":"/images/bluefire.png", matched: false},
  {"src":"/images/ghost.png", matched: false},
  {"src":"/images/guitar.png", matched: false},
  {"src":"/images/home.png", matched: false},
  {"src":"/images/letter.png", matched: false},
  {"src":"/images/rockstar.png", matched: false}
]

function App() {

  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false);

  // shuffle card

  const shuffleCards = ()=>{
    const shuffleCards = [...cardImages, ...cardImages]
    .sort(()=> Math.random() - 0.5)
    .map((card)=>({...card,id: Math.random() }))

    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffleCards)
    setTurns(0)
  }

 // handle choice

 const handleChoice = (card) =>{
     choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
 }

 // compare two selected cards
 useEffect(()=>{
   if(choiceOne && choiceTwo)
   {
    setDisabled(true);
    if(choiceOne.src === choiceTwo.src)
    {
      setCards(prevCard =>{
        return prevCard.map(card =>{
          if(card.src === choiceOne.src)
          {
            return {...card, matched: true}
          }else{
            return card
          }
        })
      })
      resetTurn()
    }else{
      setTimeout(() => resetTurn(), 1000)
    }
   }
 },[choiceOne,choiceTwo])

 // turns count 

 useEffect(() =>{
  shuffleCards()
 },[])

 // reset choice & increase turn

 const resetTurn = () =>{
  setChoiceOne(null);
  setChoiceTwo(null);
  setTurns(prevTurns => prevTurns + 1)
  setDisabled(false)
 }

  return (
    <div className="App">
     <h1>Magic Match</h1>
     <button onClick={shuffleCards}>New Game</button>
     <p className='T'>Turns: {turns}</p>
     <div className='card-grid'>
       {cards.map(card => (
        <SingleCard 
        key={card.id} 
        card={card}
        handleChoice={handleChoice}
        flipped = {card === choiceOne || card === choiceTwo || card.matched}
        disabled = {disabled}
        />
       ))}
     </div>
    </div>
  );
}

export default App;
