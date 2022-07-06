import Container from '@mui/material/Container';
import React, { useState } from 'react';
import SensorsIcon from '@mui/icons-material/Sensors';
import Button from '@mui/material/Button';
import { useNfc } from 'nfc'
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';

const Scan = () => {
  const { isNDEFAvailable, permission, read, abortReadCtrl, write } = useNfc()
  const [data, setData] = useState<string | null>(null)
  const [open, setOpen] = useState(false)
  const [isScanning, setIsScanning] = useState<boolean>()

  console.log("isNDEFAvailable: ", isNDEFAvailable);
  const handleRead = async () => {
    try {
      setIsScanning(true)
      const re = await read()
      
      const record = re.message.records[0]
      
      console.log("RAW RECORD:", re.message.records[0]);
      
      const decoder = new TextDecoder('utf-8');
      
      const decodedContent = decoder.decode(record.data)

      console.log("DECODED RECORD:", decodedContent);
      setData(decodedContent)
      setOpen(true)
      
    } catch (error) {
      console.log("ERROR ", error);
    }
  }
  
  const handleClose = () => {
    setOpen(false)
    setData(null)
    setIsScanning(false)
  }

  return (
    <Container
      sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', justifyContent: 'center', alignItems: 'center' }}
    >
      <SensorsIcon sx={{ fontSize: 100 }}/>
      {!isScanning && <Button variant="contained" endIcon={<SensorsIcon />} onClick={handleRead}>
        Start Scan
      </Button>}
      {isScanning && <div>Please tap the NFC tag with your device...</div>}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"CONTENT"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {data && data}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default Scan