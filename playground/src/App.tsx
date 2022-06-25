import React from 'react'
import { useCounter } from 'nfc'


function App() {
  const counter = useCounter()
  return (
    <div
      className='flex flex-col min-h-screen justify-start items-center p-4 md:p-8 bg-zinc-900 text-white'
    >
      FUCK
      {counter}
    </div>
  );
}

export default App;
