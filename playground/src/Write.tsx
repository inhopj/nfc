import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import React, { useState } from 'react'
import { useNfc } from 'nfc'

const Write = () => {
  const { isNDEFAvailable, permission, write } = useNfc()
  const [value, setValue] = useState<string>('')
  const handleWrite = async () => {
    const re = await write(value)
  }
  return (
    <Container
      sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', justifyContent: 'center', alignItems: 'center' }}
    >
      <TextField id="outlined-basic" label="Url" variant="outlined" value={value} onChange={(e) => {setValue(e.target.value)}}/>
      <Button onClick={handleWrite}>Write</Button>
    </Container>
  );
}

export default Write