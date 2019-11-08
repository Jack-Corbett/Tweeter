import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import PersonIcon from '@material-ui/icons/Person';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import LinearProgress from '@material-ui/core/LinearProgress';

import Style from '../components/Style';

const useStyles = makeStyles(Style);

export default function Followers(props) {
  const [followers, setFollowers] = useState();
  const classes = useStyles();

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await axios.get("https://tweetersocial.azurewebsites.net/api/GetFollowers?code=hwEPahgDT0raYxpKn9iVGqG0qRDqk4iyRJB7XsyXTjs6/AhUvOT3aQ==", {
          params: {
            id: props.authenticatedUser
          }
        });
        setFollowers(result.data);
      } catch (e) {
        alert("Failed to fetch followers");
      }
    };
    
    fetchData();
  }, [props.isAuthenticated, props.authenticatedUser]);

  return followers ? (
      <Container maxWidth="lg" className={classes.container}>
        <Typography variant="h4" gutterBottom>
          Followers
        </Typography>

        <Box mt={3}/>
        
        {/* List of users who are following you */}
        <Grid container spacing={3}>
          {followers.map(follower => (
            <Grid item xs={3} key={follower.userid}>
              <Card className={classes.card}>
                <CardHeader
                  avatar = {
                  <Avatar className={classes.avatar}>
                    <PersonIcon />
                  </Avatar>
                  }
                  title={follower.username}
                />
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
  ) : (
    <LinearProgress color="secondary"/>
  );
}