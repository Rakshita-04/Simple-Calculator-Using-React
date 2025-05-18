import React, { useState, useEffect } from 'react';
import './App.css';
import { evaluate } from 'mathjs';

function App() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [theme, setTheme] = useState('dark');

  // Handle button click
  const handleClick = (value) => {
    setInput((prev) => prev + value);
  };

  // Handle clear input
  const handleClear = () => {
    setInput('');
  };

  // Evaluate expression
  const handleEqual = () => {
    try {
      const result = evaluate(input).toString();
      const newEntry = { expression: input, result };

      setHistory((prevHistory) => {
        const updated = [newEntry, ...prevHistory];
        return updated.slice(0, 5); // Only last 5 entries
      });

      setInput(result);
    } catch {
      setInput('Error');
    }
  };

  // Handle keyboard input
  const handleKeyDown = (e) => {
    const key = e.key;

    if ((/[\d\+\-\*\/\.\(\)]/).test(key)) {
      setInput((prev) => prev + key);
    } else if (key === 'Enter') {
      handleEqual();
    } else if (key === 'Backspace') {
      setInput((prev) => prev.slice(0, -1));
    } else if (key === 'Escape') {
      handleClear();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  });

  // Toggle theme
  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className={`container ${theme}`}>
      <div className="calculator">
        <div className="theme-toggle">
          <button onClick={toggleTheme}>
            {theme === 'dark' ? '🌞 Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>
        <input type="text" value={input} readOnly />

        <div className="buttons">
          <button onClick={handleClear}>C</button>
          <button onClick={() => handleClick('(')}>(</button>
          <button onClick={() => handleClick(')')}>)</button>
          <button onClick={() => handleClick('/')}>/</button>
          <button onClick={() => handleClick('7')}>7</button>
          <button onClick={() => handleClick('8')}>8</button>
          <button onClick={() => handleClick('9')}>9</button>
          <button onClick={() => handleClick('*')}>*</button>
          <button onClick={() => handleClick('4')}>4</button>
          <button onClick={() => handleClick('5')}>5</button>
          <button onClick={() => handleClick('6')}>6</button>
          <button onClick={() => handleClick('-')}>-</button>
          <button onClick={() => handleClick('1')}>1</button>
          <button onClick={() => handleClick('2')}>2</button>
          <button onClick={() => handleClick('3')}>3</button>
          <button onClick={() => handleClick('+')}>+</button>
          <button onClick={() => handleClick('0')}>0</button>
          <button onClick={() => handleClick('.')}>.</button>
          <button onClick={handleEqual}>=</button>
        </div>

        <div className="sci-buttons">
          <button onClick={() => handleClick('sqrt(')}>√</button>
          <button onClick={() => handleClick('sin(')}>sin</button>
          <button onClick={() => handleClick('cos(')}>cos</button>
          <button onClick={() => handleClick('tan(')}>tan</button>
          <button onClick={() => handleClick('log(')}>log</button>
          <button onClick={() => handleClick('exp(')}>exp</button>
          <button onClick={() => handleClick('^')}>^</button>
        </div>
      </div>

      <div className="history">
        <h3>History (Last 5)</h3>
        <ul>
          {history.map((item, index) => (
            <li key={index}>
              <span>{item.expression} = </span>
              <strong>{item.result}</strong>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
