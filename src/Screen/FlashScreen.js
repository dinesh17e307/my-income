import { Card } from '@material-ui/core'
import React, { Component } from'react'
import Blink from 'react-blink-text';
import FadeIn from 'react-fade-in';
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
           
            <Card style={{height:'100%',backgroundColor:'aquamarine',}}>
            <img className="img"style={{textAlign:'center'}} src="https://i.ibb.co/NWJGRqS/IMG-20211020-211416-removebg-preview.png" width="400px"  alt="Loading flash"/>
            <FadeIn delay='100'>
            <img  src="https://wallpapercave.com/wp/wp2024300.jpg" width="400px"/>
            <img  src="https://pixelz.cc/wp-content/uploads/2018/07/rice-farmer-vietnam-uhd-4k-wallpaper.jpg" width="400px"/>
            </FadeIn>
            <Blink color='green' text='Better Farms For Better Food. Better Life, Agriculture High' fontSize='25px'>
         
        </Blink> 
            </Card>
           
        )
    }
}
export default FlashScreen