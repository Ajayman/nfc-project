"use client"
import * as React from 'react';
import Box from '@mui/material/Box';
import { Button, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';

export default function ChooseVariant({ type }: String) {
  const [variant, setVariant] = React.useState<string | null>(type);
  // const [size, setSize] = React.useState(type)
  const handleVariant = (
    event: React.MouseEvent<HTMLElement>,
    newVariant: string | null,
  ) => {
    setVariant(newVariant);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <Typography variant="h6">
        Color {variant}
      </Typography>
      <ToggleButtonGroup
        value={variant}
        exclusive
        onChange={handleVariant}
        aria-label="variant select"
      >
        <ToggleButton value="Red" aria-label="left aligned">
          <Button variant="contained" color='warning' sx={{ height: 40, width: 40 }}></Button>
        </ToggleButton>
        <ToggleButton value="Green" aria-label="centered">
          <Button variant="contained" color='success' sx={{ height: 40, width: 40 }}></Button>
        </ToggleButton>
        <ToggleButton value="Blue" aria-label="right aligned">
          <Button variant="contained" color='primary' sx={{ height: 40, width: 40 }}></Button>
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
}
