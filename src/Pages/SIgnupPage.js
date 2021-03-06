
import React, { Component } from 'react'
import { Grid, TextField, Button, Modal } from '@material-ui/core'
import LoginPageStyle from '../Styles/LoginPage'
import axios from 'axios'
import withStyles from '@material-ui/core/styles/withStyles';
import { getDatabase, ref, set } from "firebase/database";
import { initializeApp } from "firebase/app";
import { getAuth, sendEmailVerification, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import LogoCard from '../Pages/LogoCard';
var firebase = require("firebase/app");
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
const arr = ['', undefined, null]
export class SIgnupPage extends Component {
    state = {
        error: false,
        openModal: false,
        enable: false,

    }
    onChangehandler = async (event) => {
        let id = event.target.id;
        let value = event.target.value
        await this.setState({
            [event.target.id]: event.target.value
        })
        if(!(this.state.phonenumber&&this.state.phonenumber.length==10)){
     this.setState({
         phoneErr:true
     })
        }
        else{
            this.setState({
                phoneErr:false
            })
        }
      if(id=='password'||id=='rePassword'){
            if(this.state.password === this.state.rePassword) {
                this.setState({ errrePassword: false })
            }
            else {
                this.setState({ errrePassword: true })
            }
        
      }
        if (!arr.includes(this.state.email) && !arr.includes(this.state.UserName) && !arr.includes(this.state.password) 
        && !arr.includes(this.state.rePassword) && !arr.includes(this.state.phonenumber)&&!this.state.errrePassword&&!this.state.phoneErr
        ) {
            console.log(this.state)
            this.setState({
                enable: true
            })
            
        }
        else{
            this.setState({
                enable: false
            })
        }
    }
    signup = async () => {
        localStorage.setItem('emailForSignIn', this.state.email)
        this.setState({
            loading: true
        })
        const authdata = {
            email: this.state.email,
            userName: this.state.UserName,
            password: this.state.password,
            rePassword: this.state.rePassword,
            phoneNumber: this.state.phonenumber
        };
        console.log(authdata)


        // Confirm the link is a sign-in with email link.



        const auth = getAuth();
        const users = await createUserWithEmailAndPassword(auth, this.state.email, this.state.password)
            .then(async (userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(userCredential)
                this.props.history.push('/success')

            })
            .catch((error) => {
                console.log(error.message)
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });
        updateProfile(auth.currentUser, {
            displayName: this.state.UserName
        })
        sendEmailVerification(auth.currentUser)
            .then((res) => {
                console.log(res)
            }).catch(err => {
                console.log(err)
            })

        if (this.state.UserName !== '' && this.state.Password !== '') {
            const db = getDatabase();
            set(ref(db, `signup/${this.state.email.split('.')[0]}`), authdata);

            const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAAI3gpzWCvFAn6O2WS1FkrZEPG2_ykHcA'
            axios
                .post(url, authdata)
                .then((res) => {
                    console.log(res.data);
                    // this.props.history.push(`/home?user=${this.state.email.split('.')[0]}`)
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
                        // loading:false,
                        errMsg: err.response.data.error.message
                    }, () => this.props.history.push(`/signup`))
                });
        };
    }
    render() {
        const { classes } = this.props;
        return (
            <>
                <LogoCard title={'SignUp'} />
                <Grid item lg={11} md={11} sm={11} xs={12} className={classes.outerContainer}>

                    <Grid container className={classes.marginFields} item lg={12} xs={12}>
                        <Grid lg={12} xs={12}>
                            <TextField className={classes.width} variant='outlined' inputProps={{ style: { color: 'red' } }} type="text" placeHolder="(e.g) dinesh@gmail.com" value={'Please Register Yourself in this portal ,you are not Excisting user'} />
                        </Grid>
                        <Grid lg={6} xs={12}>
                            <TextField className={classes.width} ty variant='standard' id="UserName" required size="small" label="UserName" type="text" placeHolder="(e.g) dinesh@gmail.com" onChange={(event) => this.onChangehandler(event)} />
                        </Grid>
                        <Grid lg={6} xs={12}>
                            <TextField className={classes.width} variant='standard' id="email" size="small" required label="Email" type="email" placeHolder="(e.g) dinesh@gmail.com" onChange={(event) => this.onChangehandler(event)} />
                        </Grid>
                        <Grid lg={6} xs={12}>
                            <TextField className={classes.width} variant='standard' id="phonenumber" size="small" required label="PhoneNumber" type="phonenumber" placeHolder="1234567899" onChange={(event) => this.onChangehandler(event)} />
                            <p>{this.state.phoneErr && (<p className={classes.errorItem}>phoneNumber should be 10 digits </p>)}</p>
                        </Grid>
                        <Grid lg={6} xs={12} >
                            <TextField className={classes.width} variant='standard' id="password" size="small" required type="password" placeHolder="password" label="Password" onChange={(event) => this.onChangehandler(event)} />
                        </Grid>
                        <Grid lg={6} xs={12} >
                            <TextField className={classes.width} variant='standard' id="rePassword" size="small" required type="password" placeHolder="password" label="Re-enetr Password" onChange={(event) => this.onChangehandler(event)} />
                            <p>{this.state.errrePassword && (<p className={classes.errorItem}>Password not matched </p>)}</p>
                        </Grid>
                    </Grid>


                    <Grid container className={classes.marginFields}>

                        {this.state.error && (<div style={{ color: 'red' }}>{this.state.errMsg}</div>)}

                        <Grid item lg={12} className={classes.outerButton}>

                            <Button className={classes.signupButton} disabled={!this.state.enable } onClick={this.signup}>SignUp</Button>
                        </Grid>

                    </Grid>


                </Grid>
            </>
        )
    }
}

export default withStyles(LoginPageStyle)(SIgnupPage)
