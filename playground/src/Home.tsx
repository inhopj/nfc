import React from 'react';
import { useNfc } from 'use-nfc'
import TapAndPlayIcon from '@mui/icons-material/TapAndPlay';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

const Home = () => {
  const { isNDEFAvailable } = useNfc()
  console.log("isNDEFAvailable: ", isNDEFAvailable);

  return (
    <div
      className='flex flex-col min-h-screen justify-start items-center p-6 pt-10'
    >
      <div className='flex mb-4'>
        <TapAndPlayIcon color='primary' sx={{ fontSize: 70 }} />
      </div>
      <div className='flex justify-center items-center w-full mb-10'>
        <div className='flex text-xl text-gray-400'>
          useNfc Playground
        </div>
      </div>

      {isNDEFAvailable !== undefined && !isNDEFAvailable && (
        <>
          <Alert severity="warning">
            <AlertTitle>On Snap!</AlertTitle>
            Looks like NFC is not available!<br />
            Please be sure to:<br />
            <strong>
              - Visit this page using a mobile phone {'('}NFC capable{')'}<br />
              - Use Chrome{'('}v89+{')'} or Opera{'('}v63+{')'}, more info at https://developer.mozilla.org/en-US/docs/Web/API/Web_NFC_API<br />
              - Turn on NFC on your device. It's usually under Settings {'>'} Connections or Control Center
            </strong>
          </Alert>
        </>
      )}
      {isNDEFAvailable !== undefined && isNDEFAvailable && (
        <>
          <Alert severity="success">
            <AlertTitle>Nice!</AlertTitle>
            <strong>
              Your browser looks NFC capable, you're good to go!<br /><br />
              Try to Write or Scan an NFC tag!<br />
            </strong>
          </Alert>
        </>
      )}
    </div>
  );
}

export default Home