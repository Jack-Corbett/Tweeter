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
    const [username, setUsername] = useState("");
    const [error, setError] = useState(false);
    const classes = useStyles();

    useEffect(() => {
        // Fetch the users that are following you
        async function fetchData() {
            try {
                const result = await axios.get("https://tweetersocial.azurewebsites.net/api/GetFollowing?code=UeaTGBfdxI4B7ZaI2wNogWIWfH5NeGfqigilcCeL03tuzPbXnQukVw==", {
                    params: {
                        id: props.authenticatedUser
                    }
                });
                setFollowing(result.data);
            } catch (e) {
                alert("Failed to fetch following");
            }
        };

        fetchData();
    }, [props.isAuthenticated, props.authenticatedUser]);

    // Keep the submit button disabled until a username is input
    function validateForm() {
        return username.length > 0;
    }

    // Follow the user who's username has been input
    async function handleSubmit(event) {
        event.preventDefault();

        try {
            await axios.post("https://tweetersocial.azurewebsites.net/api/FollowUser?code=4zrWxaUKBeOfEjbE1hYgSCfFa79K7eQMqw99PHRkSiaTsNS1UbaVjA==", {
                id: props.authenticatedUser,
                username: username
            });
            setError(false);
            props.history.push("");
            props.history.replace("/following");
        } catch (e) {
            alert("Failed to follow user, please check their username and try again");
            setError(true);
        }
    }

    // Unfollow a user when the delete button is clicked
    async function unfollow(followed) {
        try {
            await axios.post("https://tweetersocial.azurewebsites.net/api/UnfollowUser?code=D5PdC07jX5x52VNyIEEvlJai4BFMUqOzl8tz2mQ/Afd2gEP6p2PawA==", {
                id: props.authenticatedUser,
                followed: followed
            });
            props.history.push("");
            props.history.replace("/following");
        } catch (e) {
            alert("Failed to unfollow user")
        }
    }

    return following ? (
        <Container maxWidth="lg" className={classes.container}>
            <Typography variant="h4" gutterBottom>
                Following
            </Typography>

            {/* Follow a user input form */}
            <form className={classes.form} onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    autoFocus
                    variant="outlined"
                    margin="normal"
                    id="username"
                    label="Username"
                    name="username"
                    error={error}
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    disabled={!validateForm()}
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
                                avatar={
                                    <Avatar className={classes.avatar}>
                                        <PersonIcon />
                                    </Avatar>
                                }
                                title={follow.username}

                                action={
                                    <IconButton aria-label="unfollow" onClick={() => unfollow(follow.userid)}>
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
        <LinearProgress color="secondary" />
    );
}