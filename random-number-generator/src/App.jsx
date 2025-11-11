import { useState } from "react";
import "./App.css";

function App() {
  const [randomNumber, setRandomNumber] = useState(
    Math.floor(Math.random() * 100) + 1
  );
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("");
  const [attempts, setAttempts] = useState(0);

  const handleGuess = () => {
    const numGuess = Number(guess);

    if (numGuess < 1 || numGuess > 100) {
      setMessage("Please enter a number between 1 and 100.");
      setGuess(""); // clear input
      return;
    }

    setAttempts(prev => prev + 1); // increment attempts

    if (numGuess === randomNumber) {
      setMessage(
        `🎉 Congratulations! You guessed the number ${randomNumber} in ${attempts + 1} attempts.`
      );
    } else if (numGuess < randomNumber) {
      setMessage("⬆️ Too low! Try again.");
    } else {
      setMessage("⬇️ Too high! Try again.");
    }

    setGuess(""); // clear input after each guess
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleGuess();
    }
  };

  const resetGame = () => {
    setRandomNumber(Math.floor(Math.random() * 100) + 1);
    setGuess("");
    setMessage("");
    setAttempts(0);
  };

  return (
    <div className="container">
      <h1>Number Guessing Game</h1>
      <input
        type="number"
        value={guess}
        onChange={e => setGuess(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Enter your guess"
      />
      <div>
        <button onClick={handleGuess}>Guess</button>
        <button onClick={resetGame}>Reset</button>
      </div>
      <h2>{message}</h2>
      <p>Attempts: {attempts}</p>
    </div>
  );
}

export default App;
