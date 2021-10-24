import React, { Component } from 'react';
import { Grid, TextField ,Button} from '@material-ui/core'
import LoginPageStyle from '../Styles/LoginPage'
import withStyles from '@material-ui/core/styles/withStyles';
class LoginPage extends Component{
   state = {
      errMsg: '',
      error: false,
      Password: '',
      UserName:'',

   }
   onChangehandler = (event) => {
      console.log(event)
      this.setState({
         [event.target.id]:event.target.value
      })
   }
   login = () => {
      if(this.state.UserName!=='' &&this.state.Password!=='')
         this.props.history.push(`/home?user=${this.state.UserName}`)
      else
         this.setState({
            error:true,
            errMsg:'please enter credentials'
         })
   }
    render() {
        const { classes } = this.props;
        return (
           <>
           <Grid item lg={11} md={11} sm={11} xs={12} className={classes.outerContainer}>
                <Grid container className={classes.marginFields} item lg={12} xs={12}>
                    
                     <Grid lg={6} xs={12}>
                        <TextField className={classes.width} variant='standard' id="UserName" size="small" label="UserName" placeHolder="username" onChange={ (event)=>this.onChangehandler(event) } />
                    </Grid>
                    </Grid>
                
                    <Grid container className={classes.marginFields} item lg={12} xs={12}>
                    
                     <Grid lg={6} xs={12} >
                        <TextField className={classes.width} variant='standard' id="Password" size="small" placeHolder="passworf" label="Password"onChange={ (event)=>this.onChangehandler(event) } />
                     </Grid>
              </Grid>
              <Grid item lg={12} >
                        {this.state.error && (<p style={{ color: 'red' ,marginLeft:'20px'}}>{this.state.errMsg}</p>)}
                     </Grid>
                 <Grid container className={classes.marginFields}>
                   
                   
                 
                    <Grid item lg={12} className={classes.outerButton}>
                        <Button className={classes.loginButton} onClick={this.login}>Login</Button>
                        {/* <Button className={classes.signupButton}>SignUp</Button> */}
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
        </>
        )
    }
}
export default withStyles(LoginPageStyle)(LoginPage)