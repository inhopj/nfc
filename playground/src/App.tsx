import React from 'react'
import BottomNav from './organisms/BottomNav';
import Paper from '@mui/material/Paper';
import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import Scan from './Scan';
import Write from './Write';

function App() {
  
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/scan" element={<Scan />} />
        <Route path="/write" element={<Write />} />
      </Routes>
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNav />
      </Paper>
    </>
  );
}

export default App;
