# use-nfc-hook

A React Hook that wraps the [Web NFC api](https://w3c.github.io/web-nfc/#handover-records)

## Live Playground

If you feel like experimenting just grab some of these [NFC tags](https://www.amazon.it/Outus-Moneta-riscrivibile-Bianco-Schede/dp/B08CRLRT5J/ref=sr_1_7?__mk_it_IT=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=2LYA7M87LYH0T&keywords=nfc+tag&qid=1657730581&sprefix=nfc+tag%2Caps%2C90&sr=8-7) and use the [Playground](https://nfc-inhopj.vercel.app/)

## Features

- NFC (NDEF actually) feature detection.
- NFC permission detection.
- NFC permission change detection.
- Read NFC tag
- Abort Reading operation (uses Abort Controller)
- Automatic re-initialization after (scan start failure, read error, successful reading, reading abortion)
- Write NFC tag
- Make Read only an NFC tag (soon)

## Install

```bash
npm i use-nfc-hook
```

## Quickstart

```jsx
import React from 'react';
import { useNfc } from 'use-nfc-hook';

const App = () => {
  const { isNDEFAvailable, permission, read, abortReadCtrl, write } = useNfc()
  
  // decode an NFC tag containing a single record
  const handleRead = async () => {
    try {
      
      const response = await read()

      const record = response.message.records[0]

      const decoder = new TextDecoder('utf-8');

      const decodedContent = decoder.decode(record.data)

      console.log("DECODED CONTENT:", decodedContent);

    } catch (error) {
      console.log("ERROR ", error);
    }
  }
  
  return (
    <>
      {isNDEFAvailable !== undefined && !isNDEFAvailable && (
        <div>Looks like NDEF is not available</div>
      )}
      {isNDEFAvailable && <button
        onClick={handleRead}
        disabled={permission as PermissionState === 'denied'}
      >
        Start Scan
      </button>}
    
    
    {permission}
    </>
  );
}
```

## Development

1. Run rollup with watch flag to watch the `/src` folder and automatically recompile it into `/dist` whenever you ake a change.

```bash
npm run dev
```

2. Start the React playground app you have under `/playground` In another terminal tab

```bash
cd playground && npm run start
```

This way webpack will automatically open your browser, lunch the React playground app and whenever you make a change to `/src` or `/playground` it will [hot-reload](https://webpack.js.org/concepts/hot-module-replacement/) allowing to see the changes in real time.