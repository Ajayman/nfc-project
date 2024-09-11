"use client"
import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Avatar } from '@mui/material';

export default function ChooseSize({ type }) {
  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <div className='flex justify-between'>
          <div>
            <TabPanel value="1">{type} &emsp; S</TabPanel>
            <TabPanel value="2">{type} &emsp; M</TabPanel>
            <TabPanel value="3">{type} &emsp; L</TabPanel>
          </div>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab icon={<Avatar alt="test avatar" src="https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg" />} value="1" />
            <Tab icon={<Avatar alt="test avatar" src="https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg" />} value="2" />
            <Tab icon={<Avatar alt="test avatar" src="https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg" />} value="3" />
          </TabList>
        </div>
      </TabContext>
    </Box>
  );
}
