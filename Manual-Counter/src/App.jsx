import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
/*✅ Requirements

Initial count = 0

Step value = 2

Max limit = 10

Min limit = 0

Increment:

Adds step

Cannot go above max

Decrement:

Subtracts step

Cannot go below min

Reset:

Sets count back to 0

Buttons must disable automatically at limits*/
function App() {
  const [count, setCount] = useState(0)
  const maxLimit = 10;
  const minLimit = 0;

  const STEP = 2;

  const increment = () => {
    setCount(prev => Math.min(prev + STEP, maxLimit));
  };

  const decrement = () => {
    setCount(prev => Math.max(prev - STEP, minLimit));
  };
  const reset = () => {
    setCount(0);
  }

  return (
    <>
      <div className="hero">
        <div className="section">
          <h1>Manual Counter</h1>
          <h2>Count : {count}</h2>
          <div className="buttons">
            <button onClick={increment} disabled={count >= maxLimit}>Increment</button>
            <button onClick={decrement} disabled={count <= minLimit}>Decrement</button>
            <button onClick={reset}>Reset</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
