import { Button, ButtonGroup, Grid, Select ,Card} from '@material-ui/core';
import React, { Component } from 'react'
import NativeSelect from '@material-ui/core/NativeSelect';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import withStyles from '@material-ui/core/styles/withStyles';
import { getDatabase, ref,child, set, get } from "firebase/database";
import { initializeApp } from "firebase/app";
import CommonStyle from '../Styles/CommonStyle'
const querystring = require('querystring');
const firebaseConfig = {
    apiKey: "AIzaSyAAI3gpzWCvFAn6O2WS1FkrZEPG2_ykHcA",
    authDomain: "my-income-fbd33.firebaseapp.com",
    databaseURL: "https://my-income-fbd33-default-rtdb.firebaseio.com",
    projectId: "my-income-fbd33",
    storageBucket: "my-income-fbd33.appspot.com",
    messagingSenderId: "571957745936",
    appId: "1:571957745936:web:99190cd33c602ad45eed95"
};
const app = initializeApp(firebaseConfig);

const buttons = [
    100, 200, 300, 500, , 1000, 2000, 3000, 5000, 10000

];
const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 60,
    lineHeight: '60px',
    margin: '10px 10px 0px 3px'
}));
let bidArray=[]
class Bidding extends Component {
    state = {
        members: [],
        member: '',
        baseAmount:1000,
        bidArray:[],
        LockBidAmount:0,
        LockBidMember:'',
        showFinalVal:false,
        totalAmount:600000
    }
    componentDidMount(){
        bidArray=[]
        let queryParams = window.location.search;
        queryParams = querystring.parse(queryParams);
        let lastBid=0
        var valueArray=window.sessionStorage.getItem('bidArray')
        let CurrentBid=window.sessionStorage.getItem('currentBid');
        if(CurrentBid){
            CurrentBid=JSON.parse(CurrentBid)
            let count=0
                for(let key of CurrentBid.members){
                    
                     if(key.taken){
                         count=count+1;
                     }
                }
            
            
            
            this.setState({
                userName: queryParams['?user'],
                members:CurrentBid.members,
                totalAmount:CurrentBid.totalAmount,
                Nickname:CurrentBid.nickName,
                member:CurrentBid.members[0].name,
                currentCount:count+1
            })
        }
        
        
        if(valueArray){
           
            JSON.parse(valueArray).map(item=>{
                lastBid=lastBid<item.Amount?item.Amount:lastBid
                bidArray.push(item)
            })
            this.setState({
                baseAmount:lastBid
            })
        }
    }
    changeAmount = async(item) => {
        await this.setState({
            baseAmount:this.state.baseAmount+parseInt(item.key)
        })
      
        
       let currentObj={
            name:this.state.member,
                Amount:this.state.baseAmount
        }
        bidArray.push(currentObj)

        
    
       window.sessionStorage.setItem('bidArray',JSON.stringify(bidArray))
       
    }
    SelectMember = (event) => {
        this.setState({
            member: event.target.value
        })
    }
    getFinalAmount=async()=>{
       
        await this.setState({
            LockBidAmount:bidArray[bidArray.length-1].Amount,
            LockBidMember:bidArray[bidArray.length-1].name,
            showFinalVal:true
        })
        
    }
    finishThisBid=()=>{
       
        let data=this.state.members
      for(let key of data){
          if(key.name===this.state.LockBidMember){
               key.amount=this.state.LockBidAmount
               key.Sno=this.state.currentCount
               key.taken=true
          }
      }
        
        const db = getDatabase();
        set(ref(db, `bidding/${this.state.userName}/${this.state.Nickname}/members`), data);
        this.props.history.push(`/bidHome?user=${this.state.userName}`)
    }
    render() {
        const{classes}=this.props;
        return (


            <Grid style={{margin:'20px'}}>
                <Grid style={{fontSize:'20px',color:'#9c27b0'}}>{`Total Amount: ${this.state.totalAmount}`}</Grid>
                <Grid xs={12} md={6} lg={4} style={{ marginBottom: '20px', marginTop: '20px' }}><NativeSelect variant="outlined" fullWidth onChange={(event) => this.SelectMember(event)}>
                    {this.state.members.map(item => {
                        return !item.taken&&(<option value={item.name}>{item.name}</option>)
                    })}
                </NativeSelect></Grid>
                <Grid container lg={12} xs={12} >
                    {
                        buttons.map(item => {
                            let ButtonItem = (<Item style={{ background: '#b2dfdb' }} key={item}>{item}</Item>)
                            return (
                                <Grid item lg={3} xs={4} onClick={() => this.changeAmount(ButtonItem)}>{ButtonItem}</Grid>
                            )
                        })
                    }
                </Grid>
                <Grid container>
                <Grid lg={4} xs={6}style={{ marginBottom: '20px', marginTop: '20px' }}><Button disabled={!this.state.member!=''} onClick={this.getFinalAmount}variant="contained"className={classes.commonbutton}  >Lock</Button></Grid>
                <Grid lg={4} xs={6}style={{ marginBottom: '20px', marginTop: '20px' }}><Button variant="contained"className={classes.commonbutton} onClick={()=>this.finishThisBid()}  >Finish</Button></Grid>
            </Grid>
            <Grid>{this.state.showFinalVal&&(
            <Card style={{boxShadow:'10px 3px 10px #00897b',height:'160px',backgroundColor:'#ffd54f',textAlign:'center'}}>
                <Grid container style={{margin:'10px'}}>
            <Grid lg={6} xs={6} style={{fontSize:'18px',fontFamily:'sans-serif',fontWeight:500}}>{this.state.LockBidMember}</Grid>
            <Grid lg={6} xs={6}style={{fontSize:'16px',fontFamily:'sans-serif',fontWeight:500}}>&#8377;{this.state.LockBidAmount}</Grid>  
            
            </Grid>
            <Grid  style={{textAlign:'center',fontSize:'16px',color:'blue',fontWeight:500}}>{'Take Away Home'}&#8377;{this.state.totalAmount-this.state.LockBidAmount}</Grid>
            </Card>
                 )}
            </Grid>
            </Grid>
        )
    }
}

export default withStyles(CommonStyle)(Bidding);