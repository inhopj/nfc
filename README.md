# useNfc

A React Hook that wraps the [Web NFC api](https://w3c.github.io/web-nfc/#handover-records)

# Features

- Browser availability check
- NFC Permission check
- Read NFC tag
- Abort Reading operation (uses Abort Controller)
- Automatic re-initialization after (scan start failure, read error, successful reading, reading abortion)
- Write NFC tag
- Make Read only an NFC tag (soon)

# Quickstart

```jsx
import React from 'react';
import { useNfc } from 'nfc';

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
      <button
        onClick={handleRead}
        disabled={permission as PermissionState === 'denied'}
      >
        Start Scan
      </button>
    
    
    {permission}
    </>
  );
}
```
