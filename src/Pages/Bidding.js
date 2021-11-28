import { ButtonGroup, Grid, Select } from '@material-ui/core';
import React, { Component } from 'react'
import NativeSelect from '@material-ui/core/NativeSelect';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
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

class Bidding extends Component {
    state = {
        members: [
            'dinesh',
            "tamilselvi",
            "sellappan"
        ],
        member: ''
    }
    changeAmount = (item) => {
        console.log(item.key)
        console.log(this.state.member, item.key)
    }
    SelectMember = (event) => {
        this.setState({
            member: event.target.value
        })
    }
    render() {
        return (


            <Grid>
                <Grid xs={12} md={6} lg={4} style={{ marginBottom: '20px', marginTop: '20px' }}><NativeSelect variant="outlined" fullWidth onChange={(event) => this.SelectMember(event)}>
                    {this.state.members.map(item => {
                        return <option value={item}>{item}</option>
                    })}
                </NativeSelect></Grid>
                <Grid container lg={12} xs={12} style={{ marginLeft: '10px' }}>
                    {
                        buttons.map(item => {
                            let ButtonItem = (<Item style={{ background: 'white' }} key={item}>{item}</Item>)
                            return (
                                <Grid item lg={3} xs={4} onClick={() => this.changeAmount(ButtonItem)}>{ButtonItem}</Grid>
                            )
                        })
                    }
                </Grid>
            </Grid>
        )
    }
}

export default Bidding;