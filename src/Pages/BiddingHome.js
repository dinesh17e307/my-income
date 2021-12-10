import { Button,Grid, Modal,TextField ,Dialog,DialogContent,DialogContentText,DialogTitle,Card} from '@material-ui/core';
import React,{Component} from 'react';
import AddIcon from '@mui/icons-material/Add';
import withStyles from '@material-ui/core/styles/withStyles';
import CommonStyle from '../Styles/CommonStyle'
import { getDatabase, ref,child, set, get } from "firebase/database";
import { initializeApp } from "firebase/app";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
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
class BiddingHome extends React.PureComponent{
    state={
        openModal:false,
        date:new Date().toLocaleDateString(),
        loading: false,
        bidArray:[]
    }
    componentDidMount =async()=> {
       
        let queryParams = window.location.search;
        queryParams = querystring.parse(queryParams);
      
        this.setState({
            userName: queryParams['?user'],
            loading:true
        })
        window.sessionStorage.removeItem('currentBid')
        window.sessionStorage.removeItem('bidArray')
        window.sessionStorage.removeItem('IndbidArray')
        const dbRef = ref(getDatabase());
        get(child(dbRef, `bidding/${queryParams['?user']}`)).then((snapshot) => {
            if (snapshot.exists()) {
               
                let arr = [];
                let data=snapshot.val()
                for (let key in data) {
                
                  let value = data[key]
            
                  arr.push({
                    bidOwner: value.bidOwner,
                    indAmount: value.indAmount,
                    members: value.members,
                    nickName:value.nickName,
                   totalAmount: value.totalAmount,
                    totalCount: value.totalCount,
                    startDate:value.startDate
            
            
                  })
                }
                

              this.setState({
               
                bidArray:arr,
                loading:false
                
               
            })
            } else {
                this.setState({
                  
                    loading:false
                   
                })
              console.log("No data available");
             
            }
          }).catch((error) => {
            console.error(error);
          })
         
        
    }
    fetchValue(){
        let queryParams = window.location.search;
        queryParams = querystring.parse(queryParams);
        
        const dbRef = ref(getDatabase());
        get(child(dbRef, `bidding/${queryParams['?user']}`)).then((snapshot) => {
            if (snapshot.exists()) {
               
                let arr = [];
                let data=snapshot.val()
                for (let key in data) {
                
                  let value = data[key]
            
                  arr.push({
                    bidOwner: value.bidOwner,
                    indAmount: value.indAmount,
                    members: value.members,
                    nickName:value.nickName,
                   totalAmount: value.totalAmount,
                    totalCount: value.totalCount,
                    startDate:value.startDate
            
            
                  })
                }
                
              console.log(snapshot.val());
              this.setState({
                
                bidArray:arr,
                loading:false
                
               
            })
            } else {
                this.setState({
                  
                    loading:false
                   
                })
              console.log("No data available");
             
            }
          }).catch((error) => {
            console.error(error);
          })
    }
    AddDetails=()=>{
        
        let queryParams = window.location.search;
        queryParams = querystring.parse(queryParams);
    
        let data={
            bidOwner: this.state.bidOwner,
             indAmount: this.state.indAmount,
             members: this.state.members,
             nickName:this.state.nickName,
            totalAmount: this.state.totalAmount,
             totalCount: this.state.totalCount,
             startDate:this.state.date
        }
        this.setState({
            loading: true
        })
        const db = getDatabase();
        set(ref(db, `bidding/${this.state.userName}/` + this.state.nickName), data);
        this.setState({
            loading: false,
            openModal:false
        },()=>this.fetchValue())
    }
    onChangehandler=(event)=>{
        if(event.target.id==='members'){
            let arr=[]
            for(let i of event.target.value.split(',')){
               arr.push({
                   name:i,
                   taken:false,
                   amount:'0',
                   Sno:'',
                   amountArray:['0']
               })
            }
            this.setState({
                [event.target.id]:arr
            })  
        }
        else{
         this.setState({
             [event.target.id]:event.target.value
         })
        }
    }
    handleChange=(id,event)=>{
        event.stopPropagation()
        this.setState({
            openAccord:id,
            
        })
    }
    navigateToStart=(data)=>{
        window.sessionStorage.setItem('currentBid',JSON.stringify(data))
        this.props.history.push(`/startBid?user=${this.state.userName}`)
    }
    getAllBiddingArray=()=>{
        return(
       <>
           {!this.state.loading&&Object.keys(this.state.bidArray).map(items=>{
               var data=this.state.bidArray[items]
               return(
                <Card style={{margin:'10px',boxShadow:'10px 3px 10px #00897b',minHeight:'160px',backgroundColor:'#ffd54f',marginBottom:'15px'}} onClick={()=>this.navigateToStart(data)} >
                        <Grid container style={{color:'blue',margin:'10px',fontSize:'18px',fontWeight:600,textAlign:'center'}}>
                        <Grid item xs={6} lg={6} >{data.bidOwner}</Grid>
                        <Grid item xs={6} lg={6}>{data.startDate}</Grid>
                        </Grid>
                       <Grid container style={{color:'red',margin:'10px',fontSize:'18px',fontWeight:600,textAlign:'center'}}>
                           <Grid item xs={6} lg={6}>{`NickName: ${data.nickName}`}</Grid>
                           <Grid item xs={6} lg={6}>{`TotalCount: ${data.totalCount}`}</Grid>
                           <Grid item xs={6} lg={6}>{`TotalAmount: ${data.totalAmount}`}</Grid>
                           
                       </Grid>
                       <Grid style={{margin:'10px'}}>
                       <Accordion expanded={this.state.openAccord===data.nickName} onChange={(event)=>this.handleChange(data.nickName,event)}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            Members
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
           <Grid container>
               
                 {data.members.map(key=>{
           
                     return(
                         <Grid xs={12} lg={3} md={4}>
                             <div style={{display:'flex',justifyContent:'space-around',color:key.taken?'green':'',fontWeight:key.taken?600:400}}>
                             <p >{key.name}</p>
                             {key.taken?(<p>&#8377;{key.amount}</p>):(<p> </p>)}
                             {key.taken?(<p style={{border:'4px solid lightgrey',backgroundColor:'skyblue',width:'25px',textAlign:"center"}}>{key.Sno}</p>):(<p> </p>)}
                             </div>
                         </Grid>
                     )
                 })}
           </Grid>
          </Typography>
        </AccordionDetails>
      </Accordion>
                       </Grid>
                   </Card>
               )
           })}
           </>
       )
    }
    render(){
        const{classes}=this.props;

        return(
            <>
            
            <Grid style={{margin:'20px'}}>
                             <Button className={classes.commonbutton} onClick={()=>this.setState({
                                 openModal:true
                             })} variant="outlined" startIcon={<AddIcon />}>Add</Button>

                             
             </Grid>
             <div>
        {this.state.loading && (<div style={{ textAlign: 'center', marginLeft: '40%', marginTop: '10%' }} className="lds-dual-ring"></div>)}
      </div>
             <Grid>
                 {!this.state.loading&&this.getAllBiddingArray()}
             </Grid>
             {
                this.state.openModal&&(
                   <Dialog open >
                   <DialogTitle>ஏலத்தைத் தொடங்குவதற்கான விவரங்கள்</DialogTitle>
                   <DialogContent>
                     
                      
                     
                    <Grid container>
                        <Grid xs={12} lg={6}>
                            <TextField  className={classes.width} id="bidOwner" variant='outlined' label="ஏல உரிமையாளர்" placeHolder="rate" onChange={(event) => this.onChangehandler(event)}  />
                            </Grid>
                            <Grid xs={12} lg={6}>
                            <TextField className={classes.width} id="nickName" variant='outlined' label="ஏலத்தின் பெயர்" placeHolder="rate" onChange={(event) => this.onChangehandler(event)}  />
                            </Grid>
                            <Grid xs={12} lg={6}>
                            <TextField className={classes.width} id="totalAmount" variant='outlined' label="மொத்த தொகை" placeHolder="rate" onChange={(event) => this.onChangehandler(event)}  />
                            </Grid>
                            <Grid xs={12} lg={6}>
                            <TextField className={classes.width} id="totalCount" variant='outlined' label="மொத்த எண்ணிக்கை" placeHolder="rate" onChange={(event) => this.onChangehandler(event)}  />
                            </Grid>
                            <Grid xs={12} lg={6}>
                            <TextField className={classes.width} id="members" variant='outlined' label="உறுப்பினர்கள்" multiline
          maxRows={9} placeHolder="rate" onChange={(event) => this.onChangehandler(event)}  />
                            </Grid>
                            <Grid xs={12} lg={6}>
                            <TextField className={classes.width} id="indAmount" variant='outlined' label="ஒவ்வொரு நபரின் தொகை" placeHolder="rate" onChange={(event) => this.onChangehandler(event)}  />
                            </Grid>
                            <Grid xs={12} lg={6}>
                                <Button className={classes.commonbutton} onClick={this.AddDetails} variant="outlined" >Add</Button>
                           </Grid>

                    </Grid>
                   
                       </DialogContent>
                       </Dialog>
                )
            }
            </>
        )
    }
}
export default withStyles(CommonStyle)(BiddingHome);