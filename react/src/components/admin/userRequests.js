import React from 'react'
import SideNav from './sideNav'
import Box from '@mui/material/Box';
import { Toolbar } from '@mui/material';

export default function UserRequests() {
  return (
    <Box sx={{ display: 'flex' }}>
      <SideNav/>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar/>
        <h1>User Requests table here</h1>
      </Box>
    </Box>
  )
}
