import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TableContainer,Table,TableHead,TableBody,TableRow,TableCell } from '@material-ui/core';
import Paper from '@mui/material/Paper';
import SideNav from './sideNav';
import Box from '@mui/material/Box';
import { Toolbar } from '@mui/material';
import TablePagination from '@mui/material/TablePagination';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

export default function UserList() {
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
                {filteredData.map((user) => (
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
      </Box>
    </Box>
    );
  }
  