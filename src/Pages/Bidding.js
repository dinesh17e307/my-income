import { Button, ButtonGroup, Grid, Select, Card } from '@material-ui/core';
import React, { Component } from 'react'
import NativeSelect from '@material-ui/core/NativeSelect';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import withStyles from '@material-ui/core/styles/withStyles';
import { getDatabase, ref, child, set, get } from "firebase/database";
import { initializeApp } from "firebase/app";
import CommonStyle from '../Styles/CommonStyle'
import { map } from '@firebase/util';
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
var biddingPerson = [];
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
let bidArray = []
class Bidding extends Component {
    state = {
        members: [],
        member: '',
        baseAmount: 0,
        bidArray: [],
        LockBidAmount: 0,
        LockBidMember: '',
        showFinalVal: false,
        totalAmount: 600000
    }
    async componentDidMount() {
        bidArray = []
        var notTakenMembers = [];
        let queryParams = window.location.search;
        queryParams = querystring.parse(queryParams);
        let lastBid = 0
        var valueArray = window.sessionStorage.getItem('bidArray')
        let CurrentBid = window.sessionStorage.getItem('currentBid');
        let IndBidArray = window.sessionStorage.getItem('IndbidArray');
        let commissionDet = window.sessionStorage.getItem('commissionDet');
        if (commissionDet) commissionDet = JSON.parse(commissionDet)
        if (IndBidArray) IndBidArray = JSON.parse(IndBidArray)
        if (CurrentBid) {
            CurrentBid = JSON.parse(CurrentBid)
            let count = 0
            for (let key of CurrentBid.members) {

                if (key.taken) {
                    count = count + 1;
                }
                else {
                    notTakenMembers.push(key)
                }
            }




            await this.setState({
                userName: queryParams['?user'],
                members: CurrentBid.members,
                totalCount:CurrentBid.totalCount,
                totalAmount: CurrentBid.totalAmount,
                Nickname: CurrentBid.nickName,
                indAmount: CurrentBid.indAmount,
                member: notTakenMembers && notTakenMembers.length > 0 && notTakenMembers[0].name,
                currentCount: count + 1,
                IndBidArray: IndBidArray,
                commission: commissionDet && commissionDet.commission,
                balanceAmount: commissionDet && commissionDet.balanceAmount
            })
        }


        if (valueArray) {

            JSON.parse(valueArray).map(item => {
                lastBid = lastBid < item.Amount ? item.Amount : lastBid
                bidArray.push(item)
            })
            this.setState({
                baseAmount: lastBid
            })
        }
        console.log(this.state.members)
    }
    changeAmount = async (item) => {
        console.log(item, this.state.baseAmount)

        await this.setState({
            baseAmount: this.state.baseAmount + parseInt(item.key)
        })

        let data = this.state.IndBidArray ? this.state.IndBidArray : this.state.members
        console.log(data)
        for (let key of data) {

            if (key.name === this.state.member) {
                key.amountArray = [...key.amountArray, this.state.baseAmount]
            }
        }

        let currentObj = {
            name: this.state.member,
            Amount: this.state.baseAmount
        }

        bidArray.push(currentObj)
        let commission = bidArray.length > 0 && bidArray[bidArray.length - 1].Amount / ((parseInt(this.state.totalCount)-(parseInt(this.state.currentCount))))
        console.log(bidArray[bidArray.length - 1].Amount,(parseInt(this.state.totalCount)-(parseInt(this.state.currentCount))) )
        let balanceAmount = this.state.indAmount - commission
        await this.setState({
            IndBidArray: data,
            commission: commission,
            balanceAmount: balanceAmount
        })

        window.sessionStorage.setItem('commissionDet', JSON.stringify({
            commission: commission,
            balanceAmount: balanceAmount
        }))
        window.sessionStorage.setItem('bidArray', JSON.stringify(bidArray))
        window.sessionStorage.setItem('IndbidArray', JSON.stringify(data))


    }
    SelectMember = (event) => {
        this.setState({
            member: event.target.value
        })
    }
    getFinalAmount = async () => {


        await this.setState({
            LockBidAmount: bidArray[bidArray.length - 1].Amount,
            LockBidMember: bidArray[bidArray.length - 1].name,

        })
        let data = this.state.members
        for (let key of data) {
            if (key.name === this.state.LockBidMember) {
                key.amount = this.state.LockBidAmount
                key.Sno = this.state.currentCount
                key.taken = true

            }
            else {
                console.log(key)
                if (!key.taken)
                    key.amountArray = ['0']
            }
        }
        console.log('db', data)

        const db = getDatabase();
        set(ref(db, `bidding/${this.state.userName}/${this.state.Nickname}/members`), data);
        this.setState({
            showFinalVal: true
        })
    }
    finishThisBid = () => {


        this.props.history.push(`/bidHome?user=${this.state.userName}`)
    }
    render() {
        const { classes } = this.props;
        return (


            <Grid style={{ margin: '20px' }}>
                <Grid style={{ fontSize: '20px', color: '#9c27b0' }}>{`Total Amount: ${this.state.totalAmount}`}</Grid>
                <Grid xs={12} md={6} lg={4} style={{ marginBottom: '20px', marginTop: '20px' }}><NativeSelect variant="outlined" fullWidth onChange={(event) => this.SelectMember(event)}>
                    {this.state.members.map(item => {
                        return !item.taken && (<option value={item.name}>{item.name}</option>)
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
                    <Grid lg={4} xs={6} style={{ marginBottom: '20px', marginTop: '20px' }}><Button disabled={!this.state.member != ''} onClick={this.getFinalAmount} variant="contained" className={classes.commonbutton}  >Lock</Button></Grid>
                    <Grid lg={4} xs={6} style={{ marginBottom: '20px', marginTop: '20px' }}><Button variant="contained" className={classes.commonbutton} onClick={() => this.finishThisBid()}  >Finish</Button></Grid>
                </Grid>
                <Grid>
                    <Card style={{ boxShadow: '10px 3px 10px #00897b', height: '160px', backgroundColor: '#1a237e', overflowY: 'scroll' }}>
                        <Grid container style={{ margin: '10px' }} lg={12} xs={12}>
                            {this.state.IndBidArray && this.state.IndBidArray.length > 0 && this.state.IndBidArray.map(items => {

                                return (<>
                                    <Grid item>
                                        <Grid container style={{ margin: '10px' }} lg={12} xs={12}>
                                            <Grid item lg={6} xs={6} style={{ fontSize: '18px', fontFamily: 'sans-serif', fontWeight: 500, color: 'white' }}>{!items.taken && items.amountArray.length > 1 && items.name}</Grid>

                                            <Grid item lg={6} xs={6}>{items.amountArray && items.amountArray.length > 1 && !items.taken && items.amountArray.map(rs => {
                                                return (
                                                    <p style={{ fontWeight: 500, fontSize: '16px', color: 'white' }}>
                                                        {rs != '0' ? rs : ''}
                                                    </p>
                                                )
                                            })} </Grid>

                                        </Grid>
                                    </Grid>
                                </>)
                            })}
                        </Grid>
                        <Grid item xs={12} lg={12} style={{ border: '4px solid white', color: 'white', margin: '15px' }}>
                            <p >commission &#8377;{parseFloat(this.state.commission).toFixed(2)}</p>
                            <p>Amount to be paid &#8377;{parseFloat(this.state.balanceAmount).toFixed(2)}</p>
                        </Grid>
                    </Card>
                </Grid>
                <Grid style={{ marginTop: '20px' }}>{this.state.showFinalVal && (
                    <Card style={{ boxShadow: '10px 3px 10px #00897b', height: '560px', backgroundColor: '#ffd54f', textAlign: 'center' }}>
                        <Grid container style={{ margin: '10px' }}>
                            <Grid lg={6} xs={6} style={{ fontSize: '18px', fontFamily: 'sans-serif', fontWeight: 500 }}>{this.state.LockBidMember}</Grid>
                            <Grid lg={6} xs={6} style={{ fontSize: '16px', fontFamily: 'sans-serif', fontWeight: 500 }}>&#8377;{this.state.LockBidAmount}</Grid>

                        </Grid>
                        
<hr/>
                        <Grid lg={12} xs={12} style={{ fontSize: '18px', fontFamily: 'sans-serif', fontWeight: 700 }}>{'Taken'}</Grid>


                        <Grid container lg={12} xs={12} style={{ fontSize: '18px', fontFamily: 'sans-serif', fontWeight: 500 }}>
                            <Grid> {this.state.members.map(names => {
                                return names.taken && (
                                    <p>{names.name}{'-'} &#8377;{this.state.indAmount}</p>
                                )
                            })}</Grid>
                        </Grid>
                        <hr/>
                        <Grid lg={12} xs={12} style={{ fontSize: '16px', fontFamily: 'sans-serif', fontWeight: 700 }}>{'NonTaken'}</Grid>
                        <Grid container lg={12} xs={12} style={{ fontSize: '16px', fontFamily: 'sans-serif', fontWeight: 500 }}>
                            <Grid> {this.state.members.map(names => {
                                return !names.taken && (
                                    <p>{names.name}{'-'}  &#8377;{parseFloat(this.state.balanceAmount).toFixed(2)}</p>
                                )
                            })}</Grid>
                        </Grid>
                        <Grid style={{ textAlign: 'center', fontSize: '16px', color: 'blue', fontWeight: 500 }}>{'Take Away Home   '}<span style={{ color: 'InfoText' }}>{`${this.state.totalAmount} - ${this.state.LockBidAmount}+${this.state.indAmount} = `}</span>&#8377;{(parseInt(this.state.totalAmount) - (parseInt(this.state.LockBidAmount) + parseInt(this.state.indAmount)))}</Grid>

                    </Card>
                )}
                </Grid>
            </Grid>
        )
    }
}

export default withStyles(CommonStyle)(Bidding);