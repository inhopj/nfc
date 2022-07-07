import React from 'react';
import { useNfc } from 'nfc'
import TapAndPlayIcon from '@mui/icons-material/TapAndPlay';

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
      <div className='flex justify-center items-center w-full'>
        <div className='flex text-xl text-gray-500'>
          useNfc Playground
        </div>
      </div>

      {isNDEFAvailable !== undefined && !isNDEFAvailable && (
        <>
          Hey there! Looks like NFC is not available! <br />
          Please be sure to:<br />
          - Visit this page using a mobile phone {'('}NFC capable{')'}<br />
          - Use Chrome{'('}v89+{')'} or Opera{'('}v63+{')'}, more info at https://developer.mozilla.org/en-US/docs/Web/API/Web_NFC_API<br />
          - Turn on NFC on your device. It's usually under Settings {'>'} Connections or Control Center
        </>
      )}
      {isNDEFAvailable !== undefined && isNDEFAvailable && (
        <>
          Hey there! Your browser looks NFC capable, you're good to go!<br />
          Try a Scan or a Write from one of the below tabs<br />
        </>
      )}
    </div>
  );
}

export default Home