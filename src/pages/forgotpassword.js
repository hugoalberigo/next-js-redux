import React, { Component } from 'react';
// import Button from '@mui/material/Button';
// import Container from '@mui/material/Container';
// import Grid from '@mui/material/Grid';
// import TextField from '@mui/material/TextField';
// import Link from '@mui/material/Link';
import {
  MDBContainer,
  MDBInput,
//   MDBCheckbox,
//   MDBBtn,
//   MDBIcon
}
from 'mdb-react-ui-kit';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { authFirebase } from '../services/firebase';
// import { Button, Container, Grid, TextField } from '@material-ui/core'
// const auth = getAuth()
export default class ForgotPassword extends Component{
    state = {
        email:'',
    }
    handleInputForgot = (e) =>{
        this.setState({[e.target.name]: e.target.value})
    }
    handleSubmitForgot = (e) =>{
        e.preventDefault();
        const {email} = this.state
        // const auth = getAuth()
        sendPasswordResetEmail(authFirebase, email)
        .then(()=>{
            alert('Silahkan periksa email anda untuk mengubah password')
            window.location='/login'
        })
        .catch(error=>{
            alert(error.message)
        })
    }
    render(){
        const {email} = this.state
        return(
            <MDBContainer className="p-3 my-5 d-flex flex-column w-25">

<MDBInput wrapperClass='mb-4' label='Email address' id='form1' type='email' name="email" onChange={event => this.handleInputForgot(event)}/>

      
<button type="button" className="btn btn-primary btn-rounded mb-4 w-100" onClick={this.handleSubmitForgot}>Forgot Password</button>
      
        
      
          </MDBContainer>
            
        )
    }
}
