import React, { useState, useEffect } from 'react'
import SideNav from './sideNav'
import Box from '@mui/material/Box';
import { Toolbar } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { Button, Card, CardActions, CardContent } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Home() {
  const [usersList, setUsersList] = useState([]);
  const [usersRequests, setUsersRequests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsersList();
    fetchUsersRequests();
  }, []);

  const fetchUsersList = async () => {
    try {
      const response = await axios.get('http://localhost:8080/admin/getUsersByUserType');
      setUsersList(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUsersRequests = async () => {
    try {
      const response = await axios.get('http://localhost:8080/admin/getUsersByUserRequest');
      setUsersRequests(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <SideNav/>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }} >
        <Toolbar/>
        <h1>Welcome to admin dashboard</h1>
        <h2 style={{margin:10}}>Quick Links</h2>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 2, sm: 6, md: 12 }}>
            <Grid xs={2} sm={4} md={4} >
              <Card>
                <CardContent>
                  <h3>Users List</h3>
                  <br/>
                  <p>This Lists all the active users in the system</p>
                </CardContent>
                <CardActions>
                  <Button variant='outlined' color='primary' onClick={()=>navigate('/users-list')}>View Users List</Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid xs={2} sm={4} md={4} >
            <Card>
                <CardContent>
                  <h3>Users Request</h3>
                  <br/>
                  <p>This Lists all the users requests and allows you to accept or reject the request</p>
                </CardContent>
                <CardActions>
                  <Button variant='outlined' color='primary' onClick={()=>navigate('/users-requests')}>View Users Requests</Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid xs={2} sm={4} md={4} >
            <Card>
                <CardContent>
                  <h3>Open Account</h3>
                  <br/>
                  <p>This allows you to open account on behalf of the customer</p>
                </CardContent>
                <CardActions>
                  <Button variant='outlined' color='primary' onClick={()=>navigate('/open-account')}>Open Account</Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
          <h2 style={{margin:10}}>Insights</h2>
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 2, sm: 6, md: 12 }}>
          <Grid xs={2} sm={4} md={4} >
            <Card>
              <CardContent>
              <h3>Total number of Active users :</h3>
                  <br/>
                <h1>{usersList.length}</h1>
              </CardContent>
            </Card>
          </Grid>
          <Grid xs={2} sm={4} md={4} >
            <Card>
              <CardContent>
              <h3>Pending User Requests for Approval :</h3>
                  <br/>
              <h1>{usersRequests.length}</h1>
              </CardContent>
            </Card>
          </Grid>
      </Grid>
      </Box>
    </Box>
  )
}
