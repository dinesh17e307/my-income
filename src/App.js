
import './App.css';
import AddList from './Pages/AddList'
import ShowList from './Pages/ShowList';
import Home from './Home/Home'
import Login from'./Pages/LoginPage'
import React ,{Component}from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from "history";
import { Card } from '@material-ui/core';
const history = createBrowserHistory();
class App extends Component {
  render() {
    return (
      <>
        <Card style={{backgroundColor:'#2196f3',width:'100%',height:'70px',textAlign:'center'}}>
        <h1> MY DIARY</h1>
        </Card>
      <Router history={history}>
          <Switch>
         <Route exact component={Login} path="/" />
          <Route  component={Home} path="/home" />
           
          <Route component={AddList} path="/addlist" />
           
          <Route component={ShowList} path="/showlist" />
        </Switch>
     
      </Router>
   </>
    );
  }
}
export default App;
