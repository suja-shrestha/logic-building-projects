import React, { useState, useEffect, useRef } from "react";

function ReactionTimer() {
  // ------------------ State Variables ------------------
  const [gameState, setGameState] = useState("waiting"); // waiting, ready, now
  const [message, setMessage] = useState("Click to start");
  const [reactionTime, setReactionTime] = useState(null);

  const timeoutRef = useRef(null); // store timeout ID
  const startTimeRef = useRef(null); // store start time

  // ------------------ Handle Click ------------------
  const handleClick = () => {
    if (gameState === "waiting") {
      // User starts the game
      setGameState("ready");
      setMessage("Wait for green...");

      // Random delay between 2-5 seconds
      const randomDelay = Math.floor(Math.random() * 3000) + 2000;

      timeoutRef.current = setTimeout(() => {
        setGameState("now");
        setMessage("Click now!");
        startTimeRef.current = Date.now(); // record the start time
      }, randomDelay);
    } else if (gameState === "ready") {
      // User clicked too early
      clearTimeout(timeoutRef.current);
      setGameState("waiting");
      setMessage("Too soon! Click to try again.");
    } else if (gameState === "now") {
      // User clicked at the right time
      const endTime = Date.now();
      const reaction = endTime - startTimeRef.current;
      setReactionTime(reaction);
      setGameState("waiting");
      setMessage("Click to start");
    }
  };

  // ------------------ Reset Reaction Time ------------------
  const handleReset = () => {
    setReactionTime(null);
  };

  // ------------------ Component JSX ------------------
  return (
    <div
      onClick={handleClick}
      style={{
        width: "400px",
        height: "200px",
        backgroundColor: gameState === "now" ? "green" : "#ddd",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        userSelect: "none",
        flexDirection: "column",
        borderRadius: "10px",
        margin: "50px auto",
        fontSize: "20px",
      }}
    >
      <div>{message}</div>
      {reactionTime !== null && (
        <div style={{ marginTop: "20px" }}>
          Your reaction time: {reactionTime} ms
          <br />
          <button onClick={handleReset} style={{ marginTop: "10px" }}>
            Reset
          </button>
        </div>
      )}
    </div>
  );
}

export default ReactionTimer;
