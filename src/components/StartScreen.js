import React from 'react'
import "./StartScreen.css"

const StartScreen = ({ startGame }) => {
  return (
    <div className="comeco">
        <h1>Advinhe a palavra</h1>
        <p>Clique no botão para começar a jogar</p>
        <button onClick={startGame}>Começar o jogo</button>
    </div>
  )
}

export default StartScreen
