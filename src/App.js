
import './App.css';
import AddList from './Pages/AddList'
import ShowList from './Pages/ShowList';
import Home from './Home/Home'
import SambangiHome from './Home/SambangiHome'
import Login from './Pages/LoginPage'
import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from "history";
import { Card } from '@material-ui/core';
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
    return (
      <>
        
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
          </Switch>

        </Router>
      </>
    );
  }
}
export default App;
