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
class AddWeeklyIncome extends Component{
    state = {
        totalincome: '',
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
                totalincome: this.props.data.totalincome,
                
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
        if(this.props.data){
            this.props.closedialog()
        }
        let data = {
           
            totalincome: this.state.totalincome,
            date: this.state.date,
            
            
        }
        const db = getDatabase();
        set(ref(db, `sambanki/weeklyincome/${this.state.userName}/` + this.state.date), data);
        this.setState({
             kg: '',
                rate: '',
                date: '',
                loading: false,
                enable:false,
                openForm:false
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
                    <Grid item lg={6} xs={12}>
                        <TextField className={classes.width} id="totalincome" variant='standard' label="Total Income" placeHolder="rate" onChange={(event) => this.onChangehandler(event)} value={this.state.totalincome} />
                    </Grid>
                    <Grid lg={6} xs={12}>
                        <TextField className={classes.width} id="date" type='date' label="Date" onChange={(event) => this.onChangehandler(event)} value={this.state.date} />
                    </Grid>
                    
                    <Grid lg={6} xs={12}>
                        <Button className={classes.loginButton} onClick={this.sendListToDB} disabled={!this.state.enable}>Add</Button>
                    </Grid>
            </Grid>
        )
    }
    </Grid>)
    }
}
export default withStyles(AddListStyle)(AddWeeklyIncome)