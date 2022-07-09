import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import React, { useState } from 'react'
import { NDEFRecordInit, useNfc } from 'use-nfc-hook'
import Alert from '@mui/material/Alert'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import FormHelperText from '@mui/material/FormHelperText'
import TapAndPlayIcon from '@mui/icons-material/TapAndPlay';
import Snackbar from '@mui/material/Snackbar'

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

  const isValidUrl = (value: string) => {
    try {
      const url = new URL(value)
      return true
    } catch (error) {
      return false
    }
  }

  const validation = (recordType: string, value: string) => {
    if (recordType === '') {
      setHelperText('Please select a Record Type')
      return false
    } else {
      if (recordType === 'text') {
        return true
      } else if (recordType === 'url') {
        const isValid = isValidUrl(value)
        if ( value === '') {
          setHelperText('Content for url Record Type can not be empty!')
          return false
        } else if (!isValid) {
          setHelperText('Invalid url format!')
          // return false
          return true
        } else {
          return true
        }
      }
    }
  }
  const handleSubmit = async () => {
    try {
      if (validation(recordType, data)) {
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

  const handleCloseErrorSnackbar = () => {
    setIsError(false);
  };

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        justifyContent: 'start',
        alignItems: 'center',
        paddingTop: 10
      }}
    >
      <form onSubmit={(e) => {
        e.preventDefault()
        handleSubmit()
      }}>
        <FormControl>
          <FormLabel
            id="demo-controlled-radio-buttons-group"
          >
            Record Type
          </FormLabel>
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
          <div className='flex flex-col mt-5'>
            <FormHelperText
              sx={{
                display: 'flex',
                marginBottom: 2
              }}
            >
              {helperText}
            </FormHelperText>
            <Button
              onClick={handleSubmit}
              type="button"
              variant='contained'
            >
              Write
            </Button>
          </div>
        )}
      </form>
      {isScanning && (
        <div className='flex flex-col justify-center items-center'>
          <div className='flex mb-4'>
            <TapAndPlayIcon color='primary' sx={{ fontSize: 70 }} />
          </div>
          <div className='flex text-normal'>
            Please tap the NFC tag with your device...
          </div>
        </div>
      )}
      {isOk && <Alert severity="success">Content written successfully</Alert>}

      <Snackbar open={isError} autoHideDuration={5000} onClose={handleCloseErrorSnackbar}>
        <Alert onClose={handleCloseErrorSnackbar} severity="error" sx={{ width: '100%' }}>
          Something went wrong!
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default Write