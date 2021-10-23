import { Button, Grid, TextField } from '@material-ui/core';
import React, { Component } from 'react';
import { Card } from '@mui/material';
import withStyles from '@material-ui/core/styles/withStyles';
import HomeStyles from '../Styles/HomeStyles';
import EditSharpIcon from '@mui/icons-material/EditSharp';
import { getDatabase, ref, child, set,get } from "firebase/database";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import '../Spinner/Spinner.css'
const querystring = require('querystring');
class MilkHome extends Component{
    state = {
        userAllowed: [
            {
            label: 'Add List',
            url: '/addlistmilk'
            },
            {
            label: 'ShowList',
            url:'/showlistmilk'
            },
            
        ], open: false,
        isEdit: false,
        todayPrice: 0,
        loading: false,
        userName:''
    }
    componentDidMount = async () => {
        let queryParams = window.location.search;
        queryParams = querystring.parse(queryParams);
        console.log(queryParams)
        this.setState({
            loading: true,
            userName:queryParams['?user']
        })
        const dbRef = ref(getDatabase());
        await get(child(dbRef, `todayprice`)).then((snapshot) => {
  if (snapshot.exists()) {
      this.setState({
       todayPrice:snapshot.val()
   })
    console.log(snapshot.val());
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
})
         this.setState({
            loading:false
        })
    }
    navigate = (url)=> {
        this.props.history.push(`${url}?user=${this.state.userName}`);
    }
    getHome = () => {
        return (
            <Grid container xs={12} lg={12} style={{justifyContent:'center',display:'flex',marginTop:'20px'}}>
                
                {this.state.userAllowed.map((item, index) => (
            
                    <Grid item xs={6} lg={3}onClick={() => this.navigate(item.url)} style={{ margin:'10px', width: '100%',height:'100px', border: '1px solid #028DE1', color: '#028DE1', backgroundColor: 'white' ,}}>
                        <div style={{textAlign:'center',fontSize:'14px',fontWeight:700,}}onClick={() => this.navigate(item.url)}> {item.label}</div>
                    </Grid>
                ))
                }
            </Grid>
        )
    }
    render() {
        return (
            <div style={{ marginTop: '20px' }}>
                 
                   
    {this.state.loading && (<div style={{textAlign:'center',marginLeft:'40%',marginTop:'10%'}}className="lds-dual-ring"></div>)}
               
               {!this.state.loading && this.getHome()}
            </div>
        )
    }
}
export default withStyles(HomeStyles)(MilkHome)