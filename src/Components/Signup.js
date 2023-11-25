
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


function Signup(props) {

  const [Credential, setCredential] = useState({ name: "", email: "", password: "", cpassword: "" });

  let navigate = useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();

    try {
      const host = process.env.REACT_APP_API_HOST;

      const { name, email, password, cpassword } = Credential;


      // Check if password and confirm password match
      if (password !== cpassword) {
        props.aboutalert("Password and Confirm Password do not match", "error");
        return;
      }

      const response = await fetch(`${host}/api/auth/createuser`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const json = await response.json();

      if (json.success) {
        localStorage.setItem('auth-token', json.authtoken);
        props.aboutalert("Successfully Created", "success");
        navigate("/login");
      } else {
        props.aboutalert("Invalid Email ");
        console.log("Validation Errors:", json.errors);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }

  const onchangefun = (e) => {

    setCredential({ ...Credential, [e.target.name]: e.target.value });

  }
  return (
    <div className='container my-5 d-flex flex-column '>
      <h2 className='text-center my-5'> Sign up to see your notes </h2>

      <form className="my-5 mx-5" onSubmit={handlesubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Enter Username</label>
          <input type="text" className="form-control" id="name" name='name' onChange={onchangefun} />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name='email' onChange={onchangefun} aria-describedby="emailHelp" required />
        </div>
        <div className="mb-3">
          <label htmlFor="Password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name='password' onChange={onchangefun} minLength={5} requireds="true" />
        </div>
        <div className="mb-3">
          <label htmlFor="cPassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="cpassword" name='cpassword' onChange={onchangefun} minLength={5} requireds="true" />
        </div>
        <button type="submit" className="btn btn-primary">Signup</button>

      </form>
    </div>
  )
}

export default Signup