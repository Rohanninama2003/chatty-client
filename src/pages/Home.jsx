import React from 'react'
import AppLayout from '../components/layout/AppLayout'
import { Box, Typography } from '@mui/material';
import { grayColor } from '../Constants/Color';

const Home = () => {
  return (
    <Box bgcolor={grayColor} height={"100%"}>
            <Typography padding={"2rem"} variant='h5' textAlign={"center"}>
        Select a Member to Talk
    </Typography>
    </Box>
   
  )
}

export default AppLayout()(Home);
