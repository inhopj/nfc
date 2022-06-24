import React from 'react'
import { useCounter } from 'nfc'


function App() {
  const counter = useCounter()
  return (
    <div className="App">
      FUCK
      {counter}
    </div>
  );
}

export default App;
