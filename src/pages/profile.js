import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { checkLogin } from "../action/auth";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { database } from "../services/firebase";
import Header from '../components/Header';

const Profile = () => {
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    username:'',
    email:'',
    address: '',
    country: '',
    handphone: '',
    accountNumber: '',
    score: ''
  })
  const [loading, setLoading] = useState(true)

  const handleChange = (event) => {
    let inputs = {[event.target.name] : event.target.value}
    setData({...data, ...inputs})
  }

//   const handleSubmit = () => {
//     const uid = localStorage.getItem('uid')
//     const update = updateDoc(doc(database, "users", uid), data)
//     .then 
//     console.log(update)
//     (alert('Update success.'))
//   }

  useEffect(() => {
    checkLogin();
    const uid = localStorage.getItem('uid');
    getDoc(doc(database, "users", uid))
    .then
    (docSnap => {
      if(docSnap.exists()) {
        // console.log(docSnap.data())
        setData({
          ...data, ...docSnap.data() 
        })
        setLoading(false)
      } else {
        console.log("No such document!");
      }
    })
  }, [])

  if(loading) {
    return <h1>Loading ...</h1>
  }

    return (
      <>
      <Header />
      <div className="container rounded bg-white mt-5">
        <div className="row">
          <div className="col-md-4 border-right">
            <div className="d-flex flex-column align-items-center text-center p-3 py-5"><img className="rounded-circle mt-5" src="https://i.imgur.com/0eg0aG0.jpg" width={90} alt="profile"/><span className="font-weight-bold">{data.username}</span><span className="text-black-50">{data.email}</span><span>SCORE = {data.score}</span></div>
          </div>
          <div className="col-md-8">
            <div className="p-3 py-5">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="d-flex flex-row align-items-center back"><i className="fa fa-long-arrow-left mr-1 mb-1" />
                <a href={'/home'}>
                    <button className="btn .btn-back{background-color:#682773}">
                    <span className="relative text-black text-sm md:text-md group-hover:text-white">
                        Back to home
                    </span>
                    </button>
                </a>
                  {/* <a href="/home" className="text-black">Back to home</a> */}
                </div>
                <a href={'/edit'}>
                    <button className="btn .btn-back{background-color:#682773}">
                    <span className="relative text-black text-sm md:text-md group-hover:text-white">
                        Edit Profile
                    </span>
                    </button>
                </a>
                {/* <h6 className="text-right">Edit Profile</h6> */}
              </div>
              <div className="row mt-2">
                <div className="col-md-6"><input type="text" className="form-control" placeholder="First name" defaultValue={data.name} name="firstName" onChange={event => handleChange(event)} disabled='true' /></div>
                <div className="col-md-6"><input type="text" className="form-control" defaultValue={data.lastName} placeholder="Last Name" name="lastName" onChange={event => handleChange(event)} disabled='true'/></div>
              </div>
              <div className="row mt-3">
                <div className="col-md-6"><input type="text" className="form-control" placeholder="Username" defaultValue={data.username} name="username" onChange={event => handleChange(event)} disabled='true'/></div>
                <div className="col-md-6"><input type="text" className="form-control" defaultValue={data.email} placeholder="Email" name="email" onChange={event => handleChange(event)} disabled='true'/></div>
              </div>
              <div className="row mt-3">
                <div className="col-md-6"><input type="text" className="form-control" placeholder="Address" defaultValue={data.address} name="address" onChange={event => handleChange(event)} disabled='true'/></div>
                <div className="col-md-6"><input type="text" className="form-control" defaultValue={data.country} placeholder="Country" name="country" onChange={event => handleChange(event)} disabled='true'/></div>
              </div>
              <div className="row mt-3">
                <div className="col-md-6"><input type="text" className="form-control" placeholder="Handphone" defaultValue={data.handphone} name="handphone" onChange={event => handleChange(event)} disabled='true'/></div>
                <div className="col-md-6"><input type="text" className="form-control" defaultValue={data.accountNumber} placeholder="Account Number" name="accountNumber" onChange={event => handleChange(event)} disabled='true'/></div>
              </div>
              {/* <div className="mt-5 text-right"><button className="btn btn-primary profile-button" type="button">Update Profile</button></div> */}
            </div>
          </div>
        </div>
      </div>
      </>
    );
};
  
export default Profile;