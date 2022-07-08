import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import React, { useState } from 'react'
import { NDEFRecordInit, useNfc } from 'use-nfc'
import Alert from '@mui/material/Alert'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import FormHelperText from '@mui/material/FormHelperText'

const Write = () => {

  // form related
  const [data, setData] = useState<string>('')
  const [recordType, setRecordType] = useState<string>('')
  const [helperText, setHelperText] = useState<string>('')

  // NFC related
  const { isNDEFAvailable, permission, write } = useNfc()
  const [isScanning, setIsScanning] = useState<boolean>()
  const [isOk, setIsOk] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)

  const handleSubmit = async () => {
    try {
      if (recordType === '') {
        setHelperText('Please select a Record Type')
      } else if (recordType === 'url' && data === '') {
        setHelperText('Content for url Record Type can not be empty!')
      } else {
        const record: NDEFRecordInit = { recordType: recordType, data: data as string }
        setIsScanning(true)
        const re = await write({ records: [record] })
        setIsOk(true)
      }
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
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel id="demo-controlled-radio-buttons-group">Record Type</FormLabel>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={recordType}
            onChange={(e) => {
              setHelperText('')
              setRecordType(e.target.value)
            }}
            >
            <FormControlLabel value="text" control={<Radio />} label="Text" />
            <FormControlLabel value="url" control={<Radio />} label="Url" />
          </RadioGroup>
          <TextField
            id="outlined-basic"
            label={recordType}
            required={recordType === 'url'}
            variant="outlined"
            value={data}
            onChange={(e) => {
              setHelperText('')
              setData(e.target.value)
            }}
          />
        </FormControl>
        {!isScanning && (
          <div>
            <br></br>
            <FormHelperText>{helperText}</FormHelperText>
            <Button
              onClick={handleSubmit}
              type="submit"
              variant='contained'
            >
              Write
            </Button>
          </div>
        )}
      </form>
      {isScanning && (
        <div>Please tap the NFC tag with your device...</div>
      )}
      {isOk && <Alert severity="success">Content written successfully</Alert>}

      {isError && <Alert severity="error">Something went wrong</Alert>}
    </Container>
  );
}

export default Write