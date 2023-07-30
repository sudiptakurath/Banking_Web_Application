import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TableContainer,Table,TableHead,TableBody,TableRow,TableCell } from '@material-ui/core';
import Paper from '@mui/material/Paper';
import SideNav from './sideNav'
import Box from '@mui/material/Box';
import { Toolbar } from '@mui/material';

export default function UserList() {
    const [users, setUsers] = useState([]);
  
    useEffect(() => {
      fetchUsers();
    }, []);
  
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8080/bank/admin/getUserDetails');
        setUsers(response.data);
      } catch (error) {
        console.error(error);
      }
    };
  
    return (
      <Box sx={{ display: 'flex' }}>
      <SideNav/>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar/>
        <h1>User details</h1>
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Username</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>First Name</TableCell>
                        <TableCell>Last Name</TableCell>
                        <TableCell>Age</TableCell>
                        <TableCell>Contact</TableCell>
                        <TableCell>Address</TableCell>
                        <TableCell>City</TableCell>
                        <TableCell>Country</TableCell>
                    </TableRow> 
                </TableHead>
                <TableBody>
                {users.map((user) => (
                    <TableRow key={user.id}>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.first_name}</TableCell>
                        <TableCell>{user.last_name}</TableCell>
                        <TableCell>{user.age}</TableCell>
                        <TableCell>{user.contact_num}</TableCell>
                        <TableCell>{user.address}</TableCell>
                        <TableCell>{user.city}</TableCell>
                        <TableCell>{user.country}</TableCell>
                    </TableRow>
                ))}  
                </TableBody> 
            </Table>      
        </TableContainer>
      </Box>
    </Box>
    );
  }
  