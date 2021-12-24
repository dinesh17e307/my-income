
import { Button, ButtonGroup, Grid, Select, Card } from '@material-ui/core';
import React, { Component } from 'react'
import NativeSelect from '@material-ui/core/NativeSelect';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import withStyles from '@material-ui/core/styles/withStyles';
import { getDatabase, ref, child, set, get } from "firebase/database";
import { initializeApp } from "firebase/app";
import LogoCardStyles from '../Styles/LogoCard'
import { map } from '@firebase/util';

class LogoCard extends Component {
    render() {
        const{classes}=this.props;
        return (
            <Grid container className={classes.margin}>
                <Card style={{ backgroundColor: 'blue', width: '100%', height: '70px', textAlign: 'center' ,display:'flex',justifyContent:'space-between'}}>
                    <Grid item>
                    
                    </Grid>
                    <Grid item>
                       
                    </Grid>
                </Card>

            </Grid>
        )
    }
}

export default withStyles(LogoCardStyles)(LogoCard)