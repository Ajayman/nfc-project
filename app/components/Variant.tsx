"use client"
import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

export default function ChooseSize({type}) {
  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <TabPanel value="1">{type} &emsp; S</TabPanel>
        <TabPanel value="2">{type} &emsp; M</TabPanel>
        <TabPanel value="3">{type} &emsp; L</TabPanel>
        <Box sx={{}}>
          <TabList onChange={handleChange}  aria-label="lab API tabs example">
            <Tab sx={{border:1, backgroundColor: 'lightgrey', borderRadius: 3}} label="S"  value="1" />
            <Tab sx={{border:1, backgroundColor: 'lightgrey', borderRadius: 3}} label="M" value="2" />
            <Tab sx={{border:1, backgroundColor: 'lightgrey', borderRadius: 3}} label="L" value="3" />
          </TabList>
        </Box>
      </TabContext>
    </Box>
  );
}
