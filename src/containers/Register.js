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

export default function Register(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const classes = useStyles();

    // Keep the register button disabled until at least 1 character has been entered into the username and password fields
    function validateForm() {
        return username.length > 0 && password.length > 0;
    }

    // Submit the register data to the azure function
    async function handleSubmit(event) {
        event.preventDefault();
        // Trigger display of the loading bar
        setLoading(true);

        try {
            await axios.post("https://tweetersocial.azurewebsites.net/api/Register?code=0l2pl4wOaYLNd9YsfJthtOKn3McF5G660RvfqoX3yrvaGWPfA3eP8g==", {
                username: username,
                password: password
            });
            // If success, confirm with an alert and then redirect to the login page once it's been dismissed
            alert("Account created, please proceed to login")
            props.history.push("/")
        } catch (e) {
            // If it failed display an alert, remove the loading bar and trigger the error highlight on the form inputs
            alert("Account creation failed, please try a different username");
            setError(true);
            setLoading(false);
        }
    }

    return (
        <>
        { loading ? <LinearProgress color="secondary"/> : null }
        <Container maxWidth="lg" className={classes.container}>
        <Typography variant="h4" gutterBottom>
            Register
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
            Sign Up
            </Button>
        </form>
        </Container>
        </>
    );
}
