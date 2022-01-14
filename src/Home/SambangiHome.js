import { Button, Grid, Hidden, TextField } from '@material-ui/core';
import React, { Component } from 'react';
import { Card } from '@mui/material';
import withStyles from '@material-ui/core/styles/withStyles';
import HomeStyles from '../Styles/HomeStyles';
import EditSharpIcon from '@mui/icons-material/EditSharp';
import { getDatabase, ref, child, set, get } from "firebase/database";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import '../Spinner/Spinner.css'
import LogoCard from '../Pages/LogoCard';
const querystring = require('querystring');
class SambangiHome extends Component {
    state = {
        userAllowed: [
            {
                label: 'Add List',
                url: '/addlist',
                tamil: ''
            },
            {
                label: 'ShowList',
                url: '/showlist',
                tamil: ''
            },
            {
                label: 'Weekly Income',
                url: '/showWeeklyincome',
                tamil: ''
            }

        ], open: false,
        isEdit: false,
        todayPrice: 0,
        loading: false,
        userName: ''
    }
    componentDidMount = async () => {
        let queryParams = window.location.search;
        queryParams = querystring.parse(queryParams);
        console.log(queryParams)
        this.setState({
            loading: true,
            userName: queryParams['?user']
        })
        const dbRef = ref(getDatabase());
        await get(child(dbRef, `todayprice`)).then((snapshot) => {
            if (snapshot.exists()) {
                this.setState({
                    todayPrice: snapshot.val()
                })
                console.log(snapshot.val());
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        })
        this.setState({
            loading: false
        })
    }
    navigate = (url) => {
        this.props.history.push(`${url}?user=${this.state.userName}`);
    }
    getPriceForm = () => {
        return (
            <Grid>
                <TextField variant="outlined" color="primary" placeholder="set Today price" onChange={(event) => this.setState({ todayPrice: event.target.value })} />
                <Button onClick={this.todayPrice} color="primary">SET Price</Button>
            </Grid>
        )
    }
    todayPrice = () => {
        const db = getDatabase();
        set(ref(db, 'todayprice'), this.state.todayPrice);
        this.setState({
            open: false
        })
    }
    getTodayRate = () => {
        const { classes } = this.props;
        return (
            <Grid item xs={12} lg={12} style={{ width: '80%' }}>
                <Card style={{ marginLeft: '40px', width: '100%', height: '100px', border: '1px solid #028DE1', padding: '10px auto' }}>
                    <Grid container>
                        <p className={classes.todayPrice}>இன்றைய விலை  <EditSharpIcon color="primary" onClick={() => this.setState({
                            open: true
                        })} /></p>


                    </Grid>

                    <p style={{ fontSize: '20px', color: 'GrayText', marginTop: '-12px', marginLeft: '20px', fontFamily: 'Roboto', fontWeight: 700 }}>{this.state.todayPrice} </p>

                </Card>
            </Grid>
        )
    }
    getHome = () => {
        return (
            <Grid container xs={12} lg={12} style={{ justifyContent: 'center', display: 'flex', marginTop: '20px' }}>

                {this.state.userAllowed.map((item, index) => (

                    <Grid item xs={6} lg={3} onClick={() => this.navigate(item.url)} style={{ margin: '10px', width: '100%', height: '100px', border: '1px solid #028DE1', color: '#028DE1', backgroundColor: 'white', }}>
                        <div style={{ textAlign: 'center', fontSize: '14px', fontWeight: 700, }} onClick={() => this.navigate(item.url)}> {item.label}</div>
                        <div style={{ textAlign: 'center', fontSize: '14px', fontWeight: 700, }}>{item.tamil}</div>
                    </Grid>
                ))
                }
            </Grid>
        )
    }
    render() {
        return (
            <div >

                <Dialog open={this.state.open} onClose={() => this.setState({
                    open: false
                })}>
                    <DialogTitle>Edit your Records and update</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {this.getPriceForm()}
                        </DialogContentText>

                    </DialogContent>

                </Dialog>
                <LogoCard/>
                <Hidden smDown>{this.state.loading && (
                    <div style={{ textAlign: 'center', marginLeft: '40%', marginTop: '20%' }} className="lds-dual-ring"></div>
                )}</Hidden>
                <Hidden mdUp>{this.state.loading && (
                    <div style={{ textAlign: 'center', marginLeft: '40%', marginTop: '70%' }} className="lds-dual-ring"></div>
                )}</Hidden>
                {!this.state.loading && this.getTodayRate()}
                {!this.state.loading && this.getHome()}
            </div>
        )
    }
}
export default withStyles(HomeStyles)(SambangiHome)