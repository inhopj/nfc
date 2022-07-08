import React, { useState } from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import NfcIcon from '@mui/icons-material/Nfc';
import SensorsIcon from '@mui/icons-material/Sensors';
import CreateIcon from '@mui/icons-material/Create';
import { Link, useLocation } from 'react-router-dom';
import { useNfc } from 'use-nfc-hook';


const BottomNav = () => {
  const pathname = useLocation().pathname
  const [value, setValue] = useState(pathname)
  const { isNDEFAvailable } = useNfc()
  
  return (
    <BottomNavigation
      showLabels
      value={pathname}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
    >
      <BottomNavigationAction
        label="Home"
        icon={<NfcIcon />}
        component={Link}
        to="/"
        value='/'
        />
      <BottomNavigationAction
        label="Scan"
        icon={<SensorsIcon />}
        component={Link}
        to="/scan"
        value='/scan'
        disabled={!isNDEFAvailable}
        />
      <BottomNavigationAction
        label="Write"
        icon={<CreateIcon />}
        component={Link}
        to="/write"
        value='/write'
        disabled={!isNDEFAvailable}
        />
    </BottomNavigation>
  );
};

export default BottomNav
