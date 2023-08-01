import React from 'react'
import SideNav from './sideNav'
import Box from '@mui/material/Box';
import { Toolbar } from '@mui/material';

export default function Home() {
  return (
    <Box sx={{ display: 'flex' }}>
      <SideNav/>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar/>
        <h1>Welcome to admin dashboard</h1>
      </Box>
    </Box>
  )
}
