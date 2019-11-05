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
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Close'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import LinearProgress from '@material-ui/core/LinearProgress';

import Style from '../components/Style';

const useStyles = makeStyles(Style);

export default function Following(props) {
  const [following, setFollowing] = useState();
  const classes = useStyles();

  useEffect(() => {
    async function fetchData() {
      if (!props.isAuthenticated) {
        return;
      }

      try {
        const result = await axios("https://tweetersocial.azurewebsites.net/api/GetFollowing", {
          params: {
            code: "UeaTGBfdxI4B7ZaI2wNogWIWfH5NeGfqigilcCeL03tuzPbXnQukVw==",
            id: props.authenticatedUser
          }
        });
        setFollowing(result.data);
      } catch (e) {
        alert(e);
      }
    };
    
    fetchData();
  }, [props.isAuthenticated, props.authenticatedUser]);

  return following ? (
    <Container maxWidth="lg" className={classes.container}>
      <Typography variant="h4" gutterBottom>
        Following
      </Typography>

      {/* Follow a user input form */}
      <form className={classes.form}>
        <TextField
          fullWidth
          autoFocus
          variant="outlined"
          margin="normal"
          id="name"
          label="Name"
          name="name"
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.submit}
        >
        Follow
        </Button>
      </form>

      <Box mt={2} />
      <Divider />
      <Box mt={4} />
      
      {/* List of users you are following */}
      <Grid container spacing={3}>
        {following.map(follow =>
          <Grid item xs={3} key={follow.userid}>
            <Card className={classes.card}>
              <CardHeader
                avatar = {
                <Avatar className={classes.avatar}>
                  <PersonIcon />
                </Avatar>
                }
                title={follow.username}
                
                action = {
                  <IconButton aria-label="unfollow">
                    <DeleteIcon />
                  </IconButton>
                }
              />
            </Card>
          </Grid>
        )}
      </Grid>
    </Container>
  ) : (
    <LinearProgress color="secondary"/>
  );
}