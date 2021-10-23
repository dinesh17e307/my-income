import { Card } from '@material-ui/core'
import React, { Component } from'react'
import '../Styles/SplashScreen.css'
const image='./Images/companyLogo.jpeg'

class FlashScreen extends Component{
    componentDidMount(){
       setTimeout(() => {
           this.props.history.push('/login')
       }, 8000);
    }
    render(){
        
        return(
            <Card style={{height:'100vh',backgroundColor:'aquamarine'}}>
            <img className="img"style={{marginTop:'150px',marginLeft:'-30px'}} src="https://i.ibb.co/NWJGRqS/IMG-20211020-211416-removebg-preview.png" width="400px"  alt="Loading flash"/>
            </Card>
        )
    }
}
export default FlashScreen