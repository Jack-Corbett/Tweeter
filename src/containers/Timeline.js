import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PersonIcon from '@material-ui/icons/Person';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import LinearProgress from '@material-ui/core/LinearProgress';

import Style from '../components/Style';

const useStyles = makeStyles(Style);

export default function Timeline(props) {
  const [posts, setPosts] = useState();
  const classes = useStyles();

  useEffect(() => {
    async function fetchData() {
      if (!props.isAuthenticated) {
        return;
      }

      try {
        const result = await axios.get("https://tweetersocial.azurewebsites.net/api/GetTimeline?code=WlUrP2AcLFK9xcboMM7YeP91CjqijqFvE3q18Vljun0r8surs9xGxQ==", {
          params: {
            id: props.authenticatedUser
          }
        });
        setPosts(result.data);
      } catch (e) {
        alert(e);
      }
    };
    
    fetchData();
  }, [props.isAuthenticated, props.authenticatedUser]);

  return posts ? (
      <Container maxWidth="lg" className={classes.container}>
        <Typography variant="h4" gutterBottom>
          Timeline
        </Typography>

        <Box mt={3}/>
        
        <Grid container spacing={3}>
          {posts.map(post => (
            <Grid item xs={12} key={post.postid}>  
              <Card className={classes.card}>
                <CardHeader
                    avatar = {
                    <Avatar className={classes.avatar}>
                    <PersonIcon />
                    </Avatar>
                    }
                    title={post.username}
                    subheader={new Date(post.time).toLocaleString()}
                />
                <CardContent>
                    <Typography variant="body2" color="textPrimary" component="p">
                      {post.content}
                    </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
  ) : (
    <LinearProgress color="secondary"/>
  );
}