import React, { Component } from 'react';
import { Grid, TextField, Button, Modal, Hidden } from '@material-ui/core'
import LoginPageStyle from '../Styles/LoginPage'
import axios from 'axios'
import withStyles from '@material-ui/core/styles/withStyles';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

class LoginPage extends Component {
   state = {
      errMsg: '',
      error: false,
      Password: '',
      UserName: '',
      loading: false,
      manjalOpen: false

   }


   onChangehandler = (event) => {
      this.setState({
         [event.target.id]: event.target.value
      })
   }
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
         const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAAI3gpzWCvFAn6O2WS1FkrZEPG2_ykHcA'
         axios
            .post(url, authdata)
            .then((res) => {
               console.log(res.data);
               this.props.history.push(`/home?user=${this.state.UserName.split('.')[0]}`)
               const expirationDate = new Date(
                  new Date().getTime() + res.data.expiresIn * 1000
               );

               localStorage.setItem("token", res.data.idToken);
               localStorage.setItem("expirationDate", expirationDate);
               localStorage.setItem("userId", res.data.localId);
               this.setState({
                  loading: true
               })
            })
            .catch((err) => {
               console.log(err.response);
               this.setState({
                  error: true,
                  loading: false,
                  errMsg: err.response.data.error.message
               })
            });
      };
   }


   render() {
      const { classes } = this.props;
      return (
         <div style={{
            width: '100%',
            overflowX: 'hidden'
         }}>
            <Grid item lg={11} md={11} sm={11} xs={12} className={classes.outerContainer}>
               <div style={{ textAlign: 'center', marginTop: '-60px' }}><img src="/tablogo.png" width='160px' height="160px" /></div>
               <Grid container className={classes.marginFields} item lg={12} xs={12}>

                  <Grid lg={6} xs={12}>
                     <TextField className={classes.width} variant='standard' id="UserName" size="small" label="UserName" type="email" placeHolder="(e.g) dinesh@gmail.com" onChange={(event) => this.onChangehandler(event)} />
                  </Grid>
               </Grid>

               <Grid container className={classes.marginFields} item lg={12} xs={12}>

                  <Grid lg={6} xs={12} >
                     <TextField className={classes.width} variant='standard' id="Password" size="small" type="password" placeHolder="password" label="Password" onChange={(event) => this.onChangehandler(event)} />
                  </Grid>
               </Grid>
               <Grid item lg={12} >
                  {this.state.error && (<p style={{ color: 'red', marginLeft: '20px' }}>{this.state.errMsg}</p>)}
               </Grid>
               <Grid container className={classes.marginFields}>



                  <Grid item lg={12} className={classes.outerButton} container>
                     <Button className={classes.loginButton} onClick={this.login}>Login</Button>

                     <p style={{ marginTop: '5px' }}>if you have not Registered? <a href="/signup" style={{ color: 'blue' }}>signup</a></p>
                  </Grid>

               </Grid>

            </Grid>
            <Grid>
               <p style={{
                  fontSize: '16px',
                  fontFamily: 'Roboto',
                  fontWeight: 700,
                  textAlign: 'center',
                  color: '#9575cd',
                  FontStyle: 'normal'
               }} onClick={() => this.setState({
                  manjalOpen: true
               })}>மஞ்சள் விலை</p >
            </Grid>
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
         </div>
      )
   }
}
export default withStyles(LoginPageStyle)(LoginPage)