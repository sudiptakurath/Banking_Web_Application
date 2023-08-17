import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SideNav from './sideNav';
import Box from '@mui/material/Box';
import { Toolbar } from '@mui/material';
import { useParams } from 'react-router-dom';
import { TableContainer,Table,TableHead,TableBody,TableRow,TableCell } from '@material-ui/core';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


export default function TransactionDetails() {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchText, setSearchText] = useState('');
    
    const data = users;

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
    
    const handleSearch = (event) => {
      setSearchText(event.target.value);
      setPage(0);
    };
    
    const filteredData = data.filter(item => 
      Object.values(item).some(value =>
        value && value.toString().toLowerCase().includes(searchText.toLowerCase())
      )
    ).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  
    useEffect(() => {
      fetchUsers();
    }, []);
    
    const params = useParams();
    const aid = params.accountId;
    const eid = params.email;
    const navigate = useNavigate();
  
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
                {users.length === 0 ? (
                <h2>No records to display</h2>
                ) : (
                  <div>
                  <TextField
                    label="Global Search"
                    value={searchText}
                    onChange={handleSearch}
                    InputProps={{
                      endAdornment: (
                        <IconButton>
                          <SearchIcon />
                        </IconButton>
                      ),
                    }}
                    style={{marginBottom:5,width:300}}
                  />
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
                        {filteredData.map((user) => (
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
                    <TablePagination
                      rowsPerPageOptions={[5, 10, 25]}
                      component="div"
                      count={data.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    />      
                </TableContainer>
                </div>
                )}
                <br/>
                <Button variant='outlined' size='large' onClick={()=>navigate(`/account-details/${aid}/${eid}`)}>
                    <ArrowBackIcon/>Back to Account details    
                </Button> 
            </Box>
    </Box>
  )
}
