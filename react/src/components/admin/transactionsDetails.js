import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SideNav from './sideNav';
import Box from '@mui/material/Box';
import { Toolbar, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { TableContainer,Table,TableHead,TableBody,TableRow,TableCell } from '@material-ui/core';
import Paper from '@mui/material/Paper';


export default function TransactionDetails() {
    const [users, setUsers] = useState([]);
  
    useEffect(() => {
      fetchUsers();
    }, []);
    
    const params = useParams();
    const aid = params.accountId;
    const eid = params.email;
  
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/admin/getTransactionDetailsByAccountId/${aid}`);
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
                <h1>Transaction details of {eid}</h1>
                <br/>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead> 
                            <TableRow style={{backgroundColor: "#1976d2"}}>
                                <TableCell style={{color:"#fff"}}><b>Transaction ID</b></TableCell>
                                <TableCell style={{color:"#fff"}}><b>Transaction Date</b></TableCell>
                                <TableCell style={{color:"#fff"}}><b>Receiver's Account Number</b></TableCell>
                                <TableCell style={{color:"#fff"}}><b>Receiver's Name</b></TableCell>
                                <TableCell style={{color:"#fff"}}><b>Amount</b></TableCell>
                            </TableRow> 
                        </TableHead>
                        <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.transactionId}>
                                <TableCell>{user.transactionId}</TableCell>
                                <TableCell>{user.transactionDate}</TableCell>
                                <TableCell>{user.toAccountNumber}</TableCell>
                                <TableCell>{user.toAccountName}</TableCell>
                                <TableCell>{user.amount}</TableCell>
                            </TableRow>
                        ))}  
                        </TableBody> 
                    </Table>      
                </TableContainer>
            </Box>
    </Box>
  )
}
