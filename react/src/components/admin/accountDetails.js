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
import { useNavigate } from 'react-router-dom';

export default function AccountDetails() {
    const [users, setUsers] = useState([]);
  
    useEffect(() => {
      fetchUsers();
    }, []);
    
    const params = useParams();
    const uid = params.userId;
    const eid = params.email;
    const navigate = useNavigate();

    const fetchUsers = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/admin/getAccountDetailsByUserId/${uid}`);
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
                <h1>Account details of {eid}</h1>
                <br/>
                {users.map((user) => (
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} columns={{ xs: 2, sm: 8, md: 12 }}>
                  <Grid item xs={6}>
                    <Card>
                      <CardContent>
                        <Typography variant='h5'>
                          Account Number :
                        </Typography>
                        <br/>
                        <div>{user.accountNumber} </div>
                      </CardContent>
                    </Card>        
                  </Grid>
                  <Grid item xs={6}>
                    <Card>
                    <CardContent>
                    <Typography variant='h5'>
                          Account Type :
                      </Typography>
                      <br/>
                      <div>{user.accountType} </div>
                      </CardContent>
                    </Card>        
                  </Grid>
                  <Grid item xs={6}>
                    <Card>
                      <CardContent>
                        <Typography variant='h5'>
                            Balance :
                        </Typography>
                        <br/>
                        <div>{user.balance} </div>
                      </CardContent>
                    </Card>        
                  </Grid>
                  <Grid item xs={6}>
                    <Card>
                      <CardContent>
                        <Typography variant='h5'>
                          Branch :
                        </Typography>
                        <br/>
                        <div>{user.branchName} </div>
                      </CardContent>
                    </Card>        
                  </Grid>
                  <Grid item xs={6}>
                    <Button onClick={()=>navigate(`/transaction-details/${user.accountId}/${eid}`)}>
                          Transaction details
                    </Button>            
                  </Grid>
                </Grid>  
                ))} 
            </Box>
    </Box>
  )
}
