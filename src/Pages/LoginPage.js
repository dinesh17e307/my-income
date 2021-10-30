import React, { Component } from 'react';
import { Grid, TextField ,Button, Modal} from '@material-ui/core'
import LoginPageStyle from '../Styles/LoginPage'
import axios from 'axios'
import withStyles from '@material-ui/core/styles/withStyles';

   
class LoginPage extends Component{
   state = {
      errMsg: '',
      error: false,
      Password: '',
      UserName:'',
      loading:false

   }
 

   onChangehandler = (event) => {
      this.setState({
         [event.target.id]:event.target.value
      })
   }
   login = () => {
      this.setState({
         loading:true
      })
      const authdata = {
         email: this.state.UserName,
         password: this.state.Password,
         returnSecureToken: true,
       };
      if(this.state.UserName!=='' &&this.state.Password!==''){
      const url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAAI3gpzWCvFAn6O2WS1FkrZEPG2_ykHcA'
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
          loading:true
       })
      })
      .catch((err) => {
        console.log(err.response);
        this.setState({
         error:true,
         loading:false,
         errMsg:err.response.data.error.message
      })
      });
  };
}
         
   
    render() {
        const { classes } = this.props;
        return (
           <>
           <Grid item lg={11} md={11} sm={11} xs={12} className={classes.outerContainer}>
                <Grid container className={classes.marginFields} item lg={12} xs={12}>
                    
                     <Grid lg={6} xs={12}>
                        <TextField className={classes.width} variant='standard' id="UserName" size="small" label="UserName" type="email" placeHolder="(e.g) dinesh@gmail.com" onChange={ (event)=>this.onChangehandler(event) } />
                    </Grid>
                    </Grid>
                
                    <Grid container className={classes.marginFields} item lg={12} xs={12}>
                    
                     <Grid lg={6} xs={12} >
                        <TextField className={classes.width} variant='standard' id="Password" size="small" type="password" placeHolder="password" label="Password"onChange={ (event)=>this.onChangehandler(event) } />
                     </Grid>
              </Grid>
              <Grid item lg={12} >
                        {this.state.error && (<p style={{ color: 'red' ,marginLeft:'20px'}}>{this.state.errMsg}</p>)}
                     </Grid>
                 <Grid container className={classes.marginFields}>
                   
                   
                 
                    <Grid item lg={12} className={classes.outerButton} container>
                        <Button className={classes.loginButton} onClick={this.login}>Login</Button>
                        
                        <p style={{marginTop:'5px'}}>if you have not Registered? <a href="/signup" style={{color:'blue'}}>signup</a></p>
                     </Grid>
                     
                  </Grid>
                  
           </Grid>
           <Grid>
          <p style={{fontSize: '16px',
         fontFamily: 'Roboto',
         fontWeight: 700,
         color: '#9575cd',
         FontStyle:'normal'}}>Turmeric Price as of date mentioned</p>
        </Grid>
           <Grid>
           <iframe src=" https://mserode.com/price.html" width="100%" height="400vh !important" frameBorder='0'></iframe>
        </Grid>
        {this.state.loading && ( <Modal open>
        <div style={{textAlign:'center',marginLeft:'40%',marginTop:'10%'}}className="lds-dual-ring"></div>
        </Modal>)}
        </>
        )
    }
}
export default withStyles(LoginPageStyle)(LoginPage)