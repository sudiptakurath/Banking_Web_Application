import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TableContainer,Table,TableHead,TableBody,TableRow,TableCell } from '@material-ui/core';
import Paper from '@mui/material/Paper';
import SideNav from './sideNav'
import Box from '@mui/material/Box';
import { Toolbar, Button } from '@mui/material';


export default function UserList() {
    const [users, setUsers] = useState([]);
  
    useEffect(() => {
      fetchUsers();
    }, []);
  
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8080/admin/getUsersByUserRequest');
        setUsers(response.data);
      } catch (error) {
        console.error(error);
      }
    };

     const handleAction = (userId, action) => {
    const updatedUsers = users.map(user => {
      if (user.userId === userId) {
        return { ...user, usertype: action };
      }
      return user;
    });

    axios.put(`http://localhost:8080/admin/updateUserByUsertype/${userId}`, { usertype: action })
      .then(response => {
        console.log('User updated successfully:', response.data);
        setUsers(updatedUsers);
      })
      .catch(error => {
        console.error('Error updating user:', error);
      });
      // window.location.reload(false);
  };

    return (
      <Box sx={{ display: 'flex' }}>
      <SideNav/>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar/>
        <h1>User Requests</h1>
        {users.length === 0 ? (
                <h2>No records to display</h2>
                ) : (
        <TableContainer component={Paper}>
            <Table>
                <TableHead> 
                    <TableRow style={{backgroundColor: "#1976d2"}}>
                        <TableCell style={{color:"#fff"}}><b>Username</b></TableCell>
                        <TableCell style={{color:"#fff"}}><b>Email</b></TableCell>
                        <TableCell style={{color:"#fff"}}><b>First Name</b></TableCell>
                        <TableCell style={{color:"#fff"}}><b>Last Name</b></TableCell>
                        <TableCell style={{color:"#fff"}}><b>Age</b></TableCell>
                        <TableCell style={{color:"#fff"}}><b>Contact</b></TableCell>
                        <TableCell style={{color:"#fff"}}><b>Action</b></TableCell>
                    </TableRow> 
                </TableHead>
                <TableBody>
                {users.map((user) => (
                    <TableRow key={user.userId}>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.firstName}</TableCell>
                        <TableCell>{user.lastName}</TableCell>
                        <TableCell>{user.age}</TableCell>
                        <TableCell>{user.contactNum}</TableCell>
                        <TableCell>
                          <Button variant="outlined" color="success" style={{marginRight:10}} onClick={() => handleAction(user.userId, 1)}>Accept</Button>
                          <Button variant="outlined" color="error" onClick={() => handleAction(user.userId, 2)}>Reject</Button>
                        </TableCell>
                    </TableRow>
                ))}  
                </TableBody> 
            </Table>      
        </TableContainer>
              )}
      </Box>
    </Box>
    );
  }
  