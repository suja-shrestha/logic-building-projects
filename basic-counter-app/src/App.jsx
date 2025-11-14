import React, { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  // ✅ Correct Counter (useRef + functional update)
  const [countCorrect, setCountCorrect] = useState(0);
  const intervalRef = useRef(null);

  const startCorrect = () => {
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => {
        setCountCorrect(prev => prev + 1); // functional update ✅
      }, 1000);
    }
  };

  const stopCorrect = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const resetCorrect = () => setCountCorrect(0);

  // ❌ Stale Closure Counter
  const [countStale, setCountStale] = useState(0);
  const staleIntervalRef = useRef(null);

  const startStale = () => {
    if (!staleIntervalRef.current) {
      staleIntervalRef.current = setInterval(() => {
        setCountStale(countStale + 1); // stale closure ❌
        console.log("Stale closure count:", countStale + 1);
      }, 1000);
    }
  };

  const stopStale = () => {
    if (staleIntervalRef.current) {
      clearInterval(staleIntervalRef.current);
      staleIntervalRef.current = null;
    }
  };

  const resetStale = () => {
    setCountStale(0);
    stopStale();
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>React Counter Comparison</h1>

      {/* Correct Counter */}
      <div style={{ margin: "30px", padding: "20px", border: "2px solid green" }}>
        <h2>✅ Correct Counter (useRef + prev)</h2>
        <h3>{countCorrect}</h3>
        <button onClick={startCorrect}>Start</button>
        <button onClick={stopCorrect}>Stop</button>
        <button onClick={resetCorrect}>Reset</button>
      </div>

      {/* Stale Closure Counter */}
      <div style={{ margin: "30px", padding: "20px", border: "2px solid red" }}>
        <h2>❌ Stale Closure Counter</h2>
        <h3>{countStale}</h3>
        <button onClick={startStale}>Start</button>
        <button onClick={stopStale}>Stop</button>
        <button onClick={resetStale}>Reset</button>
      </div>
    </div>
  );
}

export default App;
