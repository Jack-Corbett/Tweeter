import React, { useState } from 'react';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'

import Style from '../components/Style';

const useStyles = makeStyles(Style);

export default function Post(props) {
    const [content, setContent] = useState("");
    const classes = useStyles();

    // Keep the publish button disabled until the post has some content
    function validateForm() {
        return content.length > 0;
    }

    // Publish the post by calling the Azure function and if successful redirect to the timeline which will show the post
    async function handleSubmit(event) {
        event.preventDefault();

        try {
            await axios.post("https://tweetersocial.azurewebsites.net/api/CreatePost?code=7ikhkpr86a4lsCrEf5gDzsIIo3csJtt96pPnMlL/iTsAeUPxB/lCIQ==", {
                id: props.authenticatedUser,
                content: content
            });
            props.history.push("/timeline");
        } catch (e) {
            alert("Failed to publish post");
        }
    }

    return (
        <Container maxWidth="lg" className={classes.container}>
            <Typography variant="h4" gutterBottom>
                Post
            </Typography>

            {/* Compose a post form */}
            <form className={classes.form} onSubmit={handleSubmit}>
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
                    value={content}
                    onChange={e => setContent(e.target.value)}
                />

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    disabled={!validateForm()}
                >
                    Publish
                </Button>
            </form>
        </Container>
    );
}