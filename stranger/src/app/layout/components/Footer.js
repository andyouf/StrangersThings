import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';


// makestyles belongs to Material UI ... encapsulates the component styling
 
const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
    },
    footer: {
        fontSize: "12px",
        textAlign: 'center',
        padding: '1em',
    }
}));

const Footer = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <AppBar position="static" color="primary">
                <Typography className={classes.footer}>
                    Strange Things @ 2020 - All rights reserved
                </Typography>
            </AppBar>
        </div>
    )
}

export default Footer;