import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

import Style from '../components/Style';

const useStyles = makeStyles(Style);

export default function Register(props) {
    const classes = useStyles();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function validateForm() {
        // Checks in the email and password have been entered
        return email.length > 0 && password.length > 0;
    }


    async function handleSubmit(event) {
        event.preventDefault();

        try {
            // Sign up logic goes here
            // await Auth.signIn(email, password);

            // Set the authenticated prop and redirect to the user's timeline
            props.userHasAuthenticated(true);
            props.setAuthenticatedUser(1);
            props.history.push("/timeline")
        } catch (e) {
            alert(e.message);
            // setIsLoading(false);
        }
    }

    return (
        <Container maxWidth="lg" className={classes.container}>
        <Typography variant="h4" gutterBottom>
            Register
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
            autoFocus
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            />
            <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            />
            <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={!validateForm()}
            >
            Sign Up
            </Button>
        </form>
        </Container>
    );
}
