import React, { Component } from 'react'
import {  Grid, TextField ,Button} from '@material-ui/core'
import withStyles from '@material-ui/core/styles/withStyles';
import AddListStyle from '../Styles/AddList'
import '../Spinner/Spinner.css'
import { getDatabase,ref, set } from "firebase/database";
import { initializeApp } from "firebase/app";
const querystring = require('querystring');
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
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
class AddList extends Component{
    state = {
        kg: '',
        rate: '',
        date: '',
        loading: false,
        enable: false,
        userName:''
        
    }
    componentDidMount() {
        console.log('hello', this.props.data)
         let queryParams = window.location.search;
        queryParams = querystring.parse(queryParams);
        console.log(queryParams)
        this.setState({
            userName:queryParams['?user']
        })
        if (this.props.data) {
            this.setState({
                kg: this.props.data.kg,
                rate: this.props.data.rate,
                date: this.props.data.date,
            })
        }
    }
    onChangehandler = async(value) => {
        await this.setState({
            [value.target.id]:value.target.value
        })
        let {kg,rate,date}=this.state
        if (kg !=='' && rate !== '' && date !== '') {
            this.setState({
                enable:true
            })
        }
    }
    sendListToDB = () => {
        let queryParams = window.location.search;
        queryParams = querystring.parse(queryParams);
        console.log(queryParams)
        this.setState({
            loading:true
        })
        if (this.props.data) {
            this.props.closedialog()
        }
        let data = {
            kg: this.state.kg,
            rate: this.state.rate,
            date: this.state.date,
            cost: this.state.rate * this.state.kg
            
        }
        const db = getDatabase();
        set(ref(db, `sambanki/${this.state.userName}/` + this.state.date), data);
        this.setState({
             kg: '',
                rate: '',
                date: '',
                loading: false,
                enable:false
        })
        // axios.post('https://goweb-1c5e7-default-rtdb.firebaseio.com/flower.json'+username,data).then(res => {
        //     this.setState({
        //         kg: '',
        //         rate: '',
        //         date: '',
        //         loading: false,
        //         enable:false
        //     })
        // }).catch(err => {
        //     console.log(err)
        // })
    }
    goToShowList = () => {
        this.props.history.push(`/showlist?user=${this.state.userName}`)
    }
    render() {
      console.log(this.state)
    const { classes } = this.props;
        return (
            <Grid item style={{ margin: '50px' }} className={classes.outerContainer}>
                <div>
        {this.state.loading && (<div style={{textAlign:'center',marginLeft:'50%',marginTop:'10%'}}className="lds-dual-ring"></div>)}
      </div>
                {!this.state.loading && (<Grid container >
                    <Grid item lg={6} xs={12} >
                        <TextField className={classes.width} inputProps={{
                            style: {
                                width: '100%',
                                fontSize: '14px'
                            }
                        }} variant='standard' label="Weight" id="kg" placeHolder="kilogram" onChange={(event) => this.onChangehandler(event)} value={this.state.kg} />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                        <TextField className={classes.width} id="rate" variant='standard' label="Rate" placeHolder="rate" onChange={(event) => this.onChangehandler(event)} value={this.state.rate} />
                    </Grid>
                    <Grid lg={6} xs={12}>
                        <TextField className={classes.width} id="date" type='date' label="Date" onChange={(event) => this.onChangehandler(event)} value={this.state.date} />
                    </Grid>
                    
                    <Grid lg={6} xs={12}>
                        <Button className={classes.loginButton} onClick={this.sendListToDB} disabled={!this.state.enable}>Add</Button>
                    </Grid>
                </Grid>
                )}
                <Grid>
                    <p onClick={ this.goToShowList}style={{ textAlign:'center',color:'blue', fontSize: '16px', fontWeight: 700, cursor: 'pointer' }}>
                       Go to TableList</p>
                </Grid>
            </Grid>
        )
    }
}
export default withStyles(AddListStyle)(AddList)