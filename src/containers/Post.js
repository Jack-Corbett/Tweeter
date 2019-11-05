import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import Style from '../components/Style';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'

const useStyles = makeStyles(Style);

export default function Followers() {
  const classes = useStyles();


  return (
    <Container maxWidth="lg" className={classes.container}>
      <Typography variant="h4" gutterBottom>
        Post
      </Typography>
      
      {/* Compose a post */}
      <form className={classes.form}>
        <TextField
          multiline={true}
          rows={4}
          rowsMax={8}
          fullWidth
          autoFocus
          variant="outlined"
          margin="normal"
          id="content"
          label="Content"
          name="content"
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.submit}
        >
        Publish
        </Button>
        </form>

      
        
    </Container>
  );
}