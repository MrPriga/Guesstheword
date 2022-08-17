import React from 'react'
import "./GameOver.css" 

const GameOver = ({ retry , score}) => {
  return (
    <div>
      <h1>Você perdeu :(</h1>
      <h2>A sua pontuação foi: {score}</h2>
      <button onClick={ retry }>Reiniciar</button>
    </div>
  )
}

export default GameOver
