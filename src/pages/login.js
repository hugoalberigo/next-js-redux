// import {useNavigate} from 'react-router-dom'

import { useRouter } from 'next/router';
import DynamicButton from "../components/DynamicButton";
import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useState, useEffect } from 'react';
import { database } from '../services/firebase';
import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox
}
from 'mdb-react-ui-kit';
import { 
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendEmailVerification
   } from 'firebase/auth';
// import authFirebase from '../services/firebase';
// import Button from '@mui/material/Button';
import {  
    setDoc, doc 
  } from 'firebase/firestore';
  
// import {useNavigate} from 'react-router-dom'
import { checkLogout } from '../action/auth';
import { useDispatch } from 'react-redux';
import { setUsername } from '../../redux/usernameSlice';

  
function Signin() {
    // const navigate = useNavigate()
    const router = useRouter()
    const dispatch = useDispatch();
    const [data, setData] = useState({
      name:'',
      username:'',
      email:'',
      password:'',
      score: 0,
      rpsPlayed: '',
      latoPlayed: '',
      punchPlayed: ''
    })
    const [signUpProcessing, setSignUpProcessing] = useState('Sign Up');
    const [loginProcessing, setLoginProcessing] = useState('Sign In');
const auth = getAuth();
  const handleInputs = (event) => {
    let inputs = {[event.target.name] : event.target.value}

    setData({...data, ...inputs})

  }

  const handleInputSignup = (event) => {
    let inputs = {[event.target.name] : event.target.value}

    setData({...data, ...inputs})

  }
  const handleSubmitSignup = () => {
    createUserWithEmailAndPassword(auth, data.email, data.password)
    .then(() => {
      setDoc(doc(database, "users", `${auth.currentUser.uid}`), data)
      .then(() => {
        setSignUpProcessing('processing ...');
        const timeout = 5000;
        setTimeout(() => {
          sendEmailVerification(auth.currentUser)
          alert('verify your email first before login')
          // useNavigate('/') 
          window.location= "/login"
          setSignUpProcessing('Done');
        }, timeout);
      })
      .catch(err => alert(err.message))
      })
    .catch((err) => {
      alert(err.message)
    })  
  }

  const handleSubmit = () => {
    signInWithEmailAndPassword(auth, data.email, data.password)
    .then(authUser => {
      if(authUser.user.emailVerified){ //This will return true or false
        console.log('email is verified')
        setLoginProcessing('processing ...');
        const timeout = 5000;
        setTimeout(() => {
          localStorage.setItem('token', authUser.user.accessToken)
          localStorage.setItem('uid', authUser.user.uid)
          const username = data.email;
          dispatch(setUsername(username));
          setLoginProcessing('Done');
          // navigate('/')
          router.push('/home')

        }, timeout);
        
      }else{
        console.log('email not verified')
        alert("verify your email first before login")
      }
      
      }).catch((err) => {
        alert(err.message)

    });
  }

  useEffect(() => {
    checkLogout()
  }, [])

  const [justifyActive, setJustifyActive] = useState('tab1');;

  const handleJustifyClick = (value) => {
    if (value === justifyActive) {
      return;
    }

    setJustifyActive(value);
  };

  return (
    <MDBContainer className="p-3 my-5 d-flex flex-column w-25" style={{border:'solid 1px', backgroundColor:'white'}}>

      <MDBTabs pills justify className='mb-3 d-flex flex-row justify-content-between'>
        <MDBTabsItem color='red'>
          <MDBTabsLink onClick={() => handleJustifyClick('tab1')} active={justifyActive === 'tab1'} id="login-form">
            Login
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleJustifyClick('tab2')} active={justifyActive === 'tab2'} id="register-form">
            Register
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>

      <MDBTabsContent>

        <MDBTabsPane show={justifyActive === 'tab1'}>

          <div className="text-center mb-3">
            <p>Sign in:</p>

            {/* <div className='d-flex justify-content-between mx-auto' style={{width: '40%'}}>
              <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                <MDBIcon fab icon='facebook-f' size="sm"/>
              </MDBBtn>

              <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                <MDBIcon fab icon='twitter' size="sm"/>
              </MDBBtn>

              <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                <MDBIcon fab icon='google' size="sm"/>
              </MDBBtn>

              <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                <MDBIcon fab icon='github' size="sm"/>
              </MDBBtn>
            </div> */}

            <p className="text-center mt-3"></p>
          </div>

          <MDBInput wrapperClass='mb-4' label='Email address' id='form1' type='email' name="email" onChange={event => handleInputs(event)}/>
          <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password' name="password" onChange={event => handleInputs(event)} />

          <div className="d-flex justify-content-between mx-4 mb-4">
            <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
            <a href="/forgotpassword">Forgot password?</a>
          </div>
          
            <button type="button" className="btn btn-primary btn-rounded mb-4 w-100" onClick={handleSubmit}>{loginProcessing}</button>
            {/* Dynamic button di bawah ini belum terhubungkan dengan handleSubmit */}
            {/* <DynamicButton /> */}

        </MDBTabsPane>

        <MDBTabsPane show={justifyActive === 'tab2'}>

          <div className="text-center mb-3">
          <p>Sign up:</p>


          </div>

          <MDBInput wrapperClass='mb-4' label='Name' id='form1' type='string' name="name" onChange={event => handleInputSignup(event)}/>
          <MDBInput wrapperClass='mb-4' label='Username' id='form1' name="username" onChange={event => handleInputSignup(event)} type='string'/>
          <MDBInput wrapperClass='mb-4' label='Email' id='form1'name="email" type='email'  onChange={event => handleInputSignup(event)}/>
          <MDBInput wrapperClass='mb-4' label='Password' id='form1' name="password" type='password' onChange={event => handleInputSignup(event)} />

          <div className='d-flex justify-content-center mb-4'>
            <MDBCheckbox name='flexCheck' id='flexCheckDefault' label='I have read and agree to the terms' />
          </div>

          <button type="button" className="btn btn-primary btn-rounded mb-4 w-100" onClick={handleSubmitSignup} id='signup-btn'>{signUpProcessing}</button>

        </MDBTabsPane>

      </MDBTabsContent>

    </MDBContainer>
  );
}


export default Signin;