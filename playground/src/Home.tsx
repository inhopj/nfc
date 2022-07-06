import React, { useEffect, useState } from 'react';
import { useNfc } from 'nfc'
import NfcIcon from '@mui/icons-material/Nfc';

const Home = () => {
  const { isNDEFAvailable } = useNfc()
  // const [mounted, setMounted] = useState(false)
  // useEffect(() => {
  //   setMounted(true)
  // }, [])
  console.log("isNDEFAvailable: ", isNDEFAvailable);
  
  return (
    <div
      className='flex flex-col min-h-screen justify-start items-center p-4 md:p-8'
    >
      <div className='flex justify-start items-center p-4 md:p-8'>
        <div>
          <NfcIcon />
        </div>
        <div>
          Web-NFC PLAYGROUND
        </div>
      </div>

      {!isNDEFAvailable && (
        <>
          Hey there! Looks like NFC is not available! <br />
          Please be sure to:<br />
          - Visit this page using a mobile phone {'('}NFC capable{')'}<br />
          - Use Chrome{'('}v89+{')'} or Opera{'('}v63+{')'}, more info at https://developer.mozilla.org/en-US/docs/Web/API/Web_NFC_API<br />
          - Turn on NFC on your device - usually under Settings {'>'} Connections or Control Center
        </>
      )}
    </div>
  );
}

export default Home