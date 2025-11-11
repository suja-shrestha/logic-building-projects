import './App.css';
import { useState, useRef } from 'react';

function App() {
  const [count, setCount] = useState(0);
  const intervalRef = useRef(null);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count > 0 ? count - 1 : 0);
  const reset = () => setCount(0);

  // Start automatic increment
  const startAutoIncrement = () => {
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => {
        setCount(prev => prev + 1);
      }, 1000);
    }
  };

  // Stop automatic increment
  const stopAutoIncrement = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Counter App</h1>
      <h2>{count}</h2>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>Reset</button>
      <button onClick={startAutoIncrement}>Start Auto</button>
      <button onClick={stopAutoIncrement}>Stop Auto</button>
    </div>
  );
}

export default App;
