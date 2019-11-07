import React from "react";

import { makeStyles } from '@material-ui/core/styles';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import ThumbDown from '@material-ui/icons/ThumbDown';

import Style from '../components/Style';

const useStyles = makeStyles(Style);

export default function NotFound() {
    const classes = useStyles();

    return (
        <Container maxWidth="lg" className={classes.container} >
            <Typography variant="h4" >
            Page Not Found < ThumbDown />
            </Typography>
        </Container>
    );
}