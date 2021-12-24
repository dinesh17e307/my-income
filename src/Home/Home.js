import {
    Button,
    Grid,
    TextField
} from '@material-ui/core';
import React, {
    Component
} from 'react';
import {
    Card
} from '@mui/material';
import withStyles from '@material-ui/core/styles/withStyles';
import HomeStyles from '../Styles/HomeStyles';
import EditSharpIcon from '@mui/icons-material/EditSharp';
import {
    getDatabase,
    ref,
    child,
    set,
    get
} from "firebase/database";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import '../Spinner/Spinner.css'
import LogoCard from '../Pages/LogoCard';
const querystring = require('querystring');
class Home extends Component {
    state = {
        userAllowed: [{
            label: 'Sambangi',
            url: '/sambangi',
            tamil: 'சம்பங்கி ',
            dev: false,
        },
        {
            label: 'Milk',
            url: '/milk',
            tamil: 'பால்',
            dev: false
        },
        {
            label: 'Bidding',
            url: '/bidHome',
            tamil: 'ஏலம்',
            dev: true
        },




        ],
        open: false,
        isEdit: false,
        todayPrice: 0,
        loading: false,
        userName: ''
    }
    componentDidMount = async () => {
        let isAdmin = false
        let queryParams = window.location.search;
        queryParams = querystring.parse(queryParams);
        console.log(queryParams, this.props)
        if (queryParams['?user'] === 'dheena5880@gmail') {
            isAdmin = true
        }
        // this.props.checkHeader(queryParams)
        if (isAdmin) {
            this.setState({

                userAllowed: [...this.state.userAllowed,

                {
                    label: 'Users',
                    url: '/users',
                    tamil: '',
                    dev: true
                },
                ]
            })
        }
        this.setState({
            loading: true,
            userName: queryParams['?user']

        })
        this.setState({
            loading: false
        })
    }
    navigate = (url) => {
        this.props.history.push(`${url}?user=${this.state.userName}`);
    }
    getPriceForm = () => {
        return (<Grid>
            <TextField variant="outlined"
                color="primary"
                placeholder="set Today price"
                onChange={
                    (event) => this.setState({
                        todayPrice: event.target.value
                    })
                }
            /> <Button onClick={
                this.todayPrice
            }
                color="primary" > SET Price </Button>
        </Grid>
        )
    }

    getHome = () => {
        return (<Grid container xs={
            12
        }
            lg={
                12
            }
            style={
                {
                    justifyContent: 'center',
                    display: 'flex',
                    marginTop: '20px'
                }
            } >

            {
                this.state.userAllowed.map((item, index) => (

                    <Grid item xs={
                        3
                    }
                        lg={
                            3
                        }
                        onClick={
                            () => this.navigate(item.url)
                        }
                        style={
                            {
                                margin: '10px',
                                width: '100%',
                                height: '100px',
                                border: '1px solid #028DE1',
                                color: '#028DE1',
                                backgroundColor: 'white',
                            }
                        } >
                        <div style={
                            {
                                textAlign: 'center',
                                fontSize: '14px',
                                fontWeight: 700,
                            }
                        }
                            onClick={
                                () => this.navigate(item.url)
                            } > {
                                item.label
                            } </div> < div style={
                                {
                                    fontSize: '9px'
                                }
                            } > {
                                item.decription && item.decription
                            } </div> <div style={
                                {
                                    textAlign: 'center',
                                    fontSize: '14px',
                                    fontWeight: 700,
                                }
                            } > {
                                item.tamil
                            } </div> </Grid >
                ))
            } </Grid>
        )
    }
    render() {
        return (<div 
         >
         
             <LogoCard/>
            {
                this.state.loading && (<div style={
                    {
                        textAlign: 'center',
                        marginLeft: '40%',
                        marginTop: '10%'
                    }
                }
                    className="lds-dual-ring"> </div>)}

            {
                !this.state.loading && this.getHome()
            } </div>
        )
    }
}
export default withStyles(HomeStyles)(Home)