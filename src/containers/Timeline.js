import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import PersonIcon from '@material-ui/icons/Person';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';

import Style from '../components/Style';

const useStyles = makeStyles(Style);

export default function Timeline() {
  const classes = useStyles();

  return (
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <Container maxWidth="lg" className={classes.container}>
        <Typography variant="h4" gutterBottom>
          Timeline
        </Typography>

        <Box mt={3}/>
        
        <Grid container spacing={3}>
          
          <Grid item xs={12}>
              <Card className={classes.card}>
                <CardHeader
                  avatar = {
                  <Avatar className={classes.avatar}>
                    <PersonIcon />
                  </Avatar>
                  }
                  title="Jack Corbett"
                  subheader="October 8th, 2019"
                />
                <CardContent>
                  <Typography variant="body2" color="textSecondary" component="p">
                    This is a test post to check that everything is working, how are you today?
                  </Typography>
                  
                </CardContent>
              </Card>
          </Grid>

          <Grid item xs={12}>
              <Card className={classes.card}>
                <CardHeader
                  avatar = {
                  <Avatar className={classes.avatar}>
                    <PersonIcon />
                  </Avatar>
                  }
                  title="Zoe Hunt"
                  subheader="October 12th, 2019"
                />
                <CardContent>
                  <Typography variant="body2" color="textSecondary" component="p">
                    Here is another post just to test out how it scales!
                  </Typography>
                  
                </CardContent>
              </Card>
          </Grid>

        </Grid>
      </Container>
    </main>
  );
}