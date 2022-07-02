
import './App.css';
import AddList from './Pages/AddList'
import ShowList from './Pages/ShowList';
import Home from './Home/Home'
import SambangiHome from './Home/SambangiHome'
import Login from './Pages/LoginPage'
import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from "history";
import { Card ,Grid} from '@material-ui/core';
import MilkHome from './Home/MilkHome';
import AddListMilk from './Pages/AddListMilk';
import ShowListMilk from './Pages/ShowListMilk';
import FlashScreen from './Screen/FlashScreen'
import SIgnupPage from './Pages/SIgnupPage';
import ShowWeekIncome from './Pages/ShowWeekIncome';
import Bidding from './Pages/Bidding';
import Users from './Pages/Users';
import Success from './Pages/Success';
import BiddingHome from './Pages/BiddingHome';
import SimpleReactFooter from "simple-react-footer";
import AllBills from './Pages/AllBills';
const querystring = require('querystring');
const history = createBrowserHistory();
class App extends Component {
  state = {
    heading: true
  }
  componentDidMount() {
    // setTimeout(() => {
    //   this.setState({
    //     heading:true
    //   })
    // }, 8000);
  }
  checkHeader = (queryParams) => {
    console.log('trigger')
    if (Object.keys(queryParams).length > 0) {
      this.setState({
        heading: true
      })
    }
  }
  render() {
    let queryParams = window.location.search;
    queryParams = querystring.parse(queryParams);
    console.log(queryParams, Object.keys(queryParams).length > 0)
    const description = "A Easiest portal for farmer to update their difficult work easily, stay touched with us to get more harder to make easy Passion towars morden world" 
    const title = "Goweb";
  const columns = [
    {
        title: "Resources",
        resources: [
            {
                name: "About",
                link: "/about"
            },
            
        ]
    },
    {
        title: "Legal",
        resources: [
            {
                name: "Privacy",
                link: "/privacy"
            },
            {
                name: "Terms",
                link: "/terms"
            }
        ]
    },
    {
        title: "Visit",
        resources: [
            {
                name: "Locations",
                link: "/locations"
            },
            {
                name: "Culture",
                link: "/culture"
            }
        ]
    }
 ];
    return (
      <div className='page-container'>
      <Grid className='wrap-content'>
        
        <Router history={history}>
          <Switch>
            {/* <Route exact component={FlashScreen} path="/" /> */}
            <Route exact component={Login} path="/" />
            <Route component={Home} path="/home" >

            </Route>
            <Route component={SambangiHome} path="/sambangi" />
            <Route component={MilkHome} path="/milk" />
            <Route component={AddListMilk} path="/addlistmilk" />
            <Route component={SIgnupPage} path="/signup" />
            <Route component={ShowWeekIncome} path="/showweeklyincome" />

            <Route component={ShowListMilk} path="/showlistmilk" />
            <Route component={Success} path="/success" />
            <Route component={AddList} path="/addlist" />

            <Route component={ShowList} path="/showlist" />
            <Route component={Bidding} path="/startBid" />
            <Route component={BiddingHome} path="/bidHome" />
            <Route component={Users} path="/users" />
            <Route component={AllBills} path="/banana" />
          </Switch>

        </Router></Grid>
        <div className='footer'>
        <div style={{flex:1}}>
          <Grid container style={{display:'flex',justifyContent:'flex-start'}}>
         
             <Grid item lg={12} xs={12}>
               <img style={{ marginTop: '-55px' }} src='/logo1.png' width={200} />
                
             </Grid>
           
          </Grid>
          </div>
          <Grid style={{textAlign:'center',textDecoration:'none'}}>
           Drop <a style={{textDecoration:'none'}} href="mailto:someone@example.com">mail</a>
            </Grid>
           
            <Grid style={{textAlign:'center'}}>
              &copy;Team Germinate
            </Grid>
        </div>
      </div>
    );
  }
}
export default App;
