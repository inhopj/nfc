import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import React, { useState } from 'react'
import { useNfc } from 'nfc'
import Alert from '@mui/material/Alert'

const Write = () => {
  const { isNDEFAvailable, permission, write } = useNfc()
  const [value, setValue] = useState<string>('')
  const [isScanning, setIsScanning] = useState<boolean>()
  const [isOk, setIsOk] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)
  const handleWrite = async () => {
    setIsScanning(true)
    try {   
      const re = await write(value)
      setIsOk(true)
    } catch (error) {
      setIsError(true)
      console.log("ERROR ", error);
    } finally {
      setIsScanning(false)
    }
  }
  return (
    <Container
      sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', justifyContent: 'center', alignItems: 'center' }}
    >
      {isScanning && <div>Please tap the NFC tag with your device...</div>}
      {!isScanning &&
        <div>
          <TextField id="outlined-basic" label="Url" variant="outlined" value={value} onChange={(e) => { setValue(e.target.value) }} />
          <br></br>
          <Button onClick={handleWrite}>Write</Button>
        </div>
      }
      {isOk && <Alert severity="success">Content Wrote successfully</Alert>}

      {isError && <Alert severity="error">Something went wrong</Alert>}
    </Container>
  );
}

export default Write