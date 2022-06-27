import React, { useState } from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import NfcIcon from '@mui/icons-material/Nfc';
import CreateIcon from '@mui/icons-material/Create';
import { Link, useLocation } from 'react-router-dom';


const BottomNav = () => {
  const [value, setValue] = useState()
  const pathname = useLocation().pathname
  console.log(location);
  
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
        icon={<HomeIcon />}
        component={Link}
        to="/"
        value='/'
        />
      <BottomNavigationAction
        label="Scan"
        icon={<NfcIcon />}
        component={Link}
        to="/scan"
        value='/scan'
        />
      <BottomNavigationAction
        label="Write"
        icon={<CreateIcon />}
        component={Link}
        to="/write"
        value='/write'
        />
    </BottomNavigation>
  );
};

export default BottomNav
