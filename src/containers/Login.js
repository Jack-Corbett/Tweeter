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

    function validateForm() {
        return username.length > 0 && password.length > 0;
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setLoading(true);

        try {
            const result = await axios.post("https://tweetersocial.azurewebsites.net/api/Login?code=nEMA1fDDIsxWoasb2x0qJ7jOpurajoqbCQzaIRua34YEouZo6Hw2Dw==", {
                username: username,
                password: password
            });
            props.userHasAuthenticated(true);
            props.setAuthenticatedUser(result.data.userid);
            props.history.push("/timeline");
        } catch (e) {
            alert(e.message);
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
