import React, { Component, PureComponent } from 'react';
import { Grid, TextField, Button, Modal, Hidden,Card,CardContent,Snackbar, Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core'
import LoginPageStyle from '../Styles/LoginPage'
import axios from 'axios'
import withStyles from '@material-ui/core/styles/withStyles';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Slider from 'react-slick';
import Carousel from './Carousel';
import { getDatabase, ref, child, set, get } from "firebase/database";
import { initializeApp } from "firebase/app";
const BannerImages = ['/logo1.png', '/milk.jpg']
var todaysNews = [{ title: 'hey', news: 'welcome' }, { title: 'hey', news: 'welcome' }, { title: 'hey', news: 'welcome' }, { title: 'hey', news: 'welcome' }]
const firebaseConfig = {
  apiKey: "AIzaSyAAI3gpzWCvFAn6O2WS1FkrZEPG2_ykHcA",
  authDomain: "my-income-fbd33.firebaseapp.com",
  databaseURL: "https://my-income-fbd33-default-rtdb.firebaseio.com",
  projectId: "my-income-fbd33",
  storageBucket: "my-income-fbd33.appspot.com",
  messagingSenderId: "571957745936",
  appId: "1:571957745936:web:99190cd33c602ad45eed95"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
class LoginPage extends PureComponent {
   state = {
      errMsg: '',
      error: false,
      Password: '',
      UserName: '',
      loading: false,
      manjalOpen: false,
      notVerified: false,
      todaysNews:[],

   }

   componentDidMount = async () => {
     console.log('getting')
       const dbRef = ref(getDatabase());
      await get(child(dbRef, `TodayNews`)).then((snapshot) =>
      {
         console.log(snapshot.exists(),snapshot.val())
            if (snapshot.exists()) {
                this.setState({
                    todaysNews: snapshot.val()
                })
                console.log(snapshot.val());
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        })
        this.setState({
           loading: false,
           
        })
      console.log(this.state.todaysNews)
   }

   onChangehandler = (event) => {
      this.setState({
         [event.target.id]: event.target.value
      })
   }
   renderSlides = () => {
    const { classes } = this.props;
    return BannerImages.map((image, indx) => (
      <div>
        <img width={200}
          key={indx}
          className={classes.bannerWidth}
          src={image}
        />
      </div>
    ));
  };
   login = () => {
      this.setState({
         loading: true
      })
      const authdata = {
         email: this.state.UserName,
         password: this.state.Password,
         returnSecureToken: true,
      };
      if (this.state.UserName !== '' && this.state.Password !== '') {
         const auth = getAuth();
         signInWithEmailAndPassword(auth, this.state.UserName, this.state.Password)
            .then((userCredential) => {

               const user = userCredential.user;
               if (user.emailVerified) {
                  this.props.history.push(`/home?user=${this.state.UserName.split('.')[0]}`)
               }
               else {
                  this.setState({
                     notVerified: true
                  })
               }
               this.setState({
                  loading: false
               })
            })
            .catch((error) => {
               const errorCode = error.code;
               const errorMessage = error.message;
            });
      }
   }

   render() {
      const { classes } = this.props;
      return (
         <Grid container>
         <Grid item lg={6} md={6} xs={12} sm={12} style={{
            width: '100%',
            overflowX: 'hidden',
            
            }}>
               <Grid container>
            <Grid item lg={8} md={8} sm={11} xs={12} className={classes.outerContainer}>
               <div style={{  marginTop: '-60px' }}><img src="/comlogo1.png" width='260px' height="160px" /></div>
               <Grid style={{margin:'auto 5px',width:'fit-content'}}>
                     <Card >
                  <CardContent>
               <Grid container className={classes.marginFields} item lg={12} xs={12}>

                  <Grid lg={12} xs={12} md={12}>
                     <TextField className={classes.width} variant='standard' id="UserName" size="small" label="UserName" type="email" placeHolder="(e.g) dinesh@gmail.com" onChange={(event) => this.onChangehandler(event)} />
                  </Grid>
               </Grid>

               <Grid container className={classes.marginFields} item lg={12} xs={12}>

                  <Grid lg={12} xs={12} md={12}>
                     <TextField className={classes.width} variant='standard' id="Password" size="small" type="password" placeHolder="password" label="Password" onChange={(event) => this.onChangehandler(event)} />
                  </Grid>
               </Grid>
               <Grid item lg={12} >
                  {this.state.error && (<p style={{ color: 'red', marginLeft: '20px' }}>{this.state.errMsg}</p>)}
               </Grid>
               <Grid container className={classes.marginFields}>



                  <Grid  style={{display:'flex',justifyContent:'space-between'}} >
                     <Grid item ><Button disabled={!(this.state.UserName !== '' && this.state.Password !== '')} className={classes.loginButton} onClick={this.login}>Login</Button></Grid>

                     <Grid item > <Button className={classes.signupButton} variant='text' onClick={()=>this.props.history.push('/signup')}>Sign Up</Button></Grid>

                              </Grid>
                              
                              {this.state.notVerified && (<Grid style={{ color: 'red' }}><Snackbar open autoHideDuration={6000}>
                                 Please verify link sent to mail
                              </Snackbar></Grid>)}

                           </Grid>
                           </CardContent>
                  </Card>
               </Grid>
                     </Grid>
                     
            
               
               
                 
                  
            {/* <Grid style={{backgroundColor:'black',height:"300px",width:"100%",bottom:0, position:'absolute',color:'white',}}>
                  <Grid container style={{fontSize:'12px',fontFamily:'Roboto',FontStyle:'italic',display:'block'}} >
                     <p style={{fontFamily:'Roboto',fontWeight:500,}}>More Details.....</p>
                  <p ><a href="mailto: dheena5880@gmail.com">contact: dheena5880@gmail.com</a></p>
                  </Grid>
                  <Grid style={{bottom:0,position:'fixed',width:'100%'}}>
                         
                  <p style={{textAlign:"center"}}>&copy;goWeb@2021</p>
                         
                  </Grid>
            </Grid> */}
            <Modal open={this.state.manjalOpen} ><Grid style={{ marginTop: '100px', textAlign: 'center' }}>
               <p><CancelOutlinedIcon style={{ color: "blue", width: "100px" }} onClick={() => this.setState({ manjalOpen: false })} /></p>
               <iframe src=" https://mserode.com/price.html" width="90%" height="400vh !important" frameBorder='0'></iframe>
            </Grid></Modal>
            <Hidden smDown>{this.state.loading && (<Modal open>
               <div style={{ textAlign: 'center', marginLeft: '40%', marginTop: '20%' }} className="lds-dual-ring"></div>
            </Modal>)}</Hidden>
            <Hidden mdUp>{this.state.loading && (<Modal open>
               <div style={{ textAlign: 'center', marginLeft: '40%', marginTop: '70%' }} className="lds-dual-ring"></div>
                  </Modal>)}</Hidden>
                  </Grid>
            </Grid>
            <Grid item lg={5} xs={12} sm={12} md={5} style={{margin:'50px auto'}}>
               <div style={{  height: '100%' }}>
                  {this.state.todaysNews.map(item => (<Accordion>
                     
                     <AccordionSummary>
                          <span style={{color:'blue',fontWeight:500}}>{item.title}</span>
                     </AccordionSummary>
                     <AccordionDetails>
                          <span style={{fontWeight:500}}> {item.message}</span>
                     </AccordionDetails>
                  </Accordion>))}
                  </div>
            </Grid>
         </Grid>
      )
   }
}
export default withStyles(LoginPageStyle)(LoginPage)