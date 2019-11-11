import React, { useState } from 'react';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import LinearProgress from '@material-ui/core/LinearProgress';

import Style from '../components/Style';

const useStyles = makeStyles(Style);

export default function Login(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const classes = useStyles();

    // Keep the login button disabled until at least 1 character has been entered into the username and password fields
    function validateForm() {
        return username.length > 0 && password.length > 0;
    }

    // Submit the login data to the azure function
    async function handleSubmit(event) {
        event.preventDefault();
        // Trigger display of the loading bar
        setLoading(true);

        try {
            const result = await axios.post("https://tweetersocial.azurewebsites.net/api/Login?code=nEMA1fDDIsxWoasb2x0qJ7jOpurajoqbCQzaIRua34YEouZo6Hw2Dw==", {
                username: username,
                password: password
            });
            // If success, authenticate the user and redirect to their timeline
            props.userHasAuthenticated(true);
            props.setAuthenticatedUser(result.data.userid);
            props.history.push("/timeline");
        } catch (e) {
            // If it failed display the alert, remove the loading bar and trigger the error highlight on the form inputs
            alert("Login failed, please check your credentials and retry");
            setError(true);
            setLoading(false);
        }
    }

    return (
        <>
        { loading ? <LinearProgress color="secondary"/> : null }
        <Container maxWidth="lg" className={classes.container}>
        <Typography variant="h4" gutterBottom>
            Login
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
            autoFocus
            variant="outlined"
            margin="normal"
            fullWidth
            id="username"
            label="Username"
            name="username"
            error={error}
            value={username}
            onChange={e => setUsername(e.target.value)}
            />
            <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            error={error}
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
            Sign In
            </Button>
        </form>
        </Container>
        </>
    );
}
