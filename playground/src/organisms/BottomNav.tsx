import React, { useState } from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import NfcIcon from '@mui/icons-material/Nfc';
import CreateIcon from '@mui/icons-material/Create';
import { Link } from 'react-router-dom';


const BottomNav = () => {
  const [value, setValue] = useState()
  return (
    <BottomNavigation
      showLabels
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
    >
      <BottomNavigationAction
        label="Home"
        icon={<HomeIcon />}
        component={Link}
        to="/"
      />
      <BottomNavigationAction
        label="Scan"
        icon={<NfcIcon />}
        component={Link}
        to="/scan"
      />
      <BottomNavigationAction
        label="Write"
        icon={<CreateIcon />}
        component={Link}
        to="/write"
        />
    </BottomNavigation>
  );
};

export default BottomNav
