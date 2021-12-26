import React, { Component } from 'react'
class Success extends Component {
    render() {
        return (<div style={{ textAlign: 'center',FontWeight:600,fontFamily:'Roboto' }}>
            <h1>Link sent to your Register mail ID ,Please verify that </h1>
            <p >click here to <a href="/login">login</a></p>
        </div>
        )
    }
}
export default Success