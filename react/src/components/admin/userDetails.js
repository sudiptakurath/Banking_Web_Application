import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TableContainer,Table,TableHead,TableBody,TableRow,TableCell } from '@material-ui/core';
import Paper from '@mui/material/Paper';
import SideNav from './sideNav';
import Box from '@mui/material/Box';
import { Toolbar } from '@mui/material';

export default function UserList() {
    const [users, setUsers] = useState([]);
  
    useEffect(() => {
      fetchUsers();
    }, []);
  
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8080/admin/getUsersByUserType');
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
        <h1>Users list</h1>
        <br/>
        <TableContainer component={Paper}>
            <Table>
                <TableHead> 
                    <TableRow style={{backgroundColor: "#1976d2"}}>
                        <TableCell style={{color:"#fff"}}><b>Email</b></TableCell>
                        <TableCell style={{color:"#fff"}}><b>First Name</b></TableCell>
                        <TableCell style={{color:"#fff"}}><b>Last Name</b></TableCell>
                        <TableCell style={{color:"#fff"}}><b>Age</b></TableCell>
                        <TableCell style={{color:"#fff"}}><b>Contact</b></TableCell>
                        <TableCell style={{color:"#fff"}}><b>Address</b></TableCell>
                        <TableCell style={{color:"#fff"}}><b>City</b></TableCell>
                        <TableCell style={{color:"#fff"}}><b>Country</b></TableCell>
                    </TableRow> 
                </TableHead>
                <TableBody>
                {users.map((user) => (
                    <TableRow key={user.userId}>
                        <TableCell><a href={`/account-details/${user.userId}/${user.email}`}>{user.email}</a></TableCell>
                        <TableCell>{user.firstName}</TableCell>
                        <TableCell>{user.lastName}</TableCell>
                        <TableCell>{user.age}</TableCell>
                        <TableCell>{user.contactNum}</TableCell>
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
  