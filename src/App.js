import "./App.css";
import StartScreen from "./components/StartScreen";

import { useCallback, useEffect, useState } from "react";

import { wordList } from "./data/words";
import Game from "./components/Game";
import GameOver from "./components/GameOver";

const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" },
];

const guessesQty = 5;

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordList);

  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState("");

  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState();
  const [score, setScore] = useState(50);

  //random category
  const pickWordAndCategory = useCallback(() => {
    const categories = Object.keys(words);
    const category =
      categories[Math.floor(Math.random() * Object.keys(categories).length)];
    

    //random word

    const word =
      words[category][Math.floor(Math.random() * words[category].length)];
    

    return { word, category };
  }, [words]);

  //Começa o jogo
  const startGame = useCallback(() => {
    clearLetterStates();

    const { word, category } = pickWordAndCategory();

    
    //Cria um array de letras

    let wordLetters = word.toLowerCase().split("");


    //fill states
    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLetters);

    setGameStage(stages[1].name);
  }, [pickWordAndCategory])

  //Processa as letras
  const verifyLetter = (letter) => {
    const nomalizedLetter = letter.toLowerCase();

    //check if letter has already been utilized
    if (
      guessedLetters.includes(nomalizedLetter) ||
      wrongLetters.includes(nomalizedLetter)
    ) {
      return;
    }

    // push guessed letter or remove a guess

    if (letters.includes(nomalizedLetter)) {
      setGuessedLetters([...guessedLetters, nomalizedLetter]);
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        nomalizedLetter,
      ]);

      setGuesses((actualGuesses) => actualGuesses - 1);
    }
  };

  const clearLetterStates = () => {
    setGuessedLetters([]);
    setWrongLetters([]);
  };

  //reset all states
  useEffect(() => {
    if (guesses <= 0) {
      clearLetterStates();

      setGameStage(stages[2].name);
    }
  }, [guesses]);

  // Restart game
  const retry = () => {
    setScore(0);
    setGuesses(guessesQty);
    setGameStage(stages[0].name);
  };

  // check win conditions
  useEffect(() => {
    const uniqueLetters = [...new Set (letters)]

    if (guessedLetters.length === uniqueLetters.length) {
      setScore((actualScore) => (actualScore += 100))

      startGame();
    }

  }, [guessedLetters, letters, startGame])

  return (
    <div className="App">
      {gameStage === "start" && <StartScreen startGame={startGame} />}
      {gameStage === "game" && (
        <Game
          verifyLetter={verifyLetter}
          pickedWord={pickedWord}
          pickedCategory={pickedCategory}
          letters={letters}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}
        />
      )}
      {gameStage === "end" && <GameOver retry={retry} score={score} />}
    </div>
  );
}

export default App;
