import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import PersonIcon from '@material-ui/icons/Person';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';

import Style from '../components/Style';


const useStyles = makeStyles(Style);

export default function Followers() {
  const classes = useStyles();

  return (
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <Container maxWidth="lg" className={classes.container}>
        <Typography variant="h4" gutterBottom>
          Followers
        </Typography>

        <Box mt={3}/>
        
        {/* List of users who are following you */}
        <Grid container spacing={3}>
          <Grid item xs={3}>
              <Card className={classes.card}>
                <CardHeader
                  avatar = {
                  <Avatar className={classes.avatar}>
                    <PersonIcon />
                  </Avatar>
                  }
                  title="Jack Corbett"
                />
              </Card>
          </Grid>
        </Grid>
      </Container>
    </main>
  );
}