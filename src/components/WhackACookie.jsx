import { useState, useEffect } from "react";
import "../styles/App.css";
import "../styles/WhackACookie.css";

const GRID_SIZE = 7;
const TOTAL_CELLS = GRID_SIZE * GRID_SIZE;

export default function WhackACookie() {
  const [score, setScore] = useState(0);
  const [activeIndex, setActiveIndex] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameActive, setGameActive] = useState(false);

  useEffect(() => {
    let gameTimer, cookieTimer;

    if (gameActive) {
      gameTimer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(gameTimer);
            clearInterval[cookieTimer];
            setGameActive(false);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);

      cookieTimer = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * TOTAL_CELLS);
        setActiveIndex(randomIndex);
      }, 600);
    }
    return () => {
      clearInterval(gameTimer);
      clearInterval(cookieTimer);
    };
  }, [gameActive]);

  const handleClick = (index) => {
    if (index === activeIndex) {
      setScore((s) => s + 1);
      setActiveIndex(null);
    }
  };

  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setGameActive(true);
    0;
  };

  return (
    <div className="game-container">
      <h1>🍪🍪🍪 Whack-A-Cookie 🍪🍪🍪</h1>
      <div className="info">
        <p> ⏱️ {timeLeft}s</p>
        <p> 🍪 Score: {score}</p>
      </div>
      <button onClick={startGame} disabled={gameActive}>
        {gameActive ? "Game in Progress... nom nom nom" : "Start Game"}
      </button>
      <div className="grid">
        {Array.from({ length: TOTAL_CELLS }).map((_, index) => (
          <div
            key={index}
            className={`cell ${index === activeIndex ? "active" : ""}`}
            onClick={() => handleClick(index)}
          >
            {index === activeIndex ? (
              <img src="/cookie-1.0.png" alt="cookie" className="cookie-img" />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
