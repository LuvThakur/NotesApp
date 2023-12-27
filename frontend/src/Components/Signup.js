
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
    <div className='container my-5 d-flex flex-column'>

      <div className='container my-5 border p-4 col-md-5' style={{ backgroundColor: '#f8f9fa' }}>
        <h2 className='text-center mb-4'>Sign up to see your notes</h2>

        <form onSubmit={handlesubmit} className="mx-3">
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Enter Username</label>
            <input type="text" className="form-control" id="name" name='name' onChange={onchangefun} />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" name='email' onChange={onchangefun} aria-describedby="emailHelp" required />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" name='password' onChange={onchangefun} minLength={5} required />
          </div>

          <div className="mb-3">
            <label htmlFor="cpassword" className="form-label">Confirm Password</label>
            <input type="password" className="form-control" id="cpassword" name='cpassword' onChange={onchangefun} minLength={5} required />
          </div>

          <button type="submit" className="btn btn-primary">Signup</button>
        </form>
      </div>
    </div>

  )
}

export default Signup