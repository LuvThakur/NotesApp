import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";


function Login(props) {
    const [credentail, setcredentail] = useState({ email: "", password: "" });

    const navigate = useNavigate();


    const Loginfun = async (e) => {
        e.preventDefault();

        const host = process.env.REACT_APP_API_HOST

        try {
            const response = await fetch(`${host}/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: credentail.email, password: credentail.password }),
            });

            if (!response.ok) {
                if (response.status === 401) {
                    console.error("Invalid credentials");
                    props.aboutalert("Invalid Password", "error");

                } else if (response.status === 404) {
                    const errorData = await response.json();
                    console.error("Bad Request:", errorData);
                    props.aboutalert("Invalid Email", "error");
                } else {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return; // Exit the function to avoid further execution
            }

            const json = await response.json();


            if (json.success) {
                // save auth-token in local storage and  redirect

                localStorage.setItem('auth-token', json.authtoken);

                props.aboutalert("SuccessFullt Login", "success");
                navigate("/");

            }
            else {
                props.aboutalert("Invalid Credentials ", "error");

            }

        }
        catch (error) {
            console.error("error", error.message);
        }
    }

    const onchangefun = (e) => {
        setcredentail({ ...credentail, [e.target.name]: e.target.value });
    }

    return (
        <div className='container my-5 d-flex flex-column '>
            <h2 className='text-center my-5'> Login to Continue</h2>
            <form onSubmit={Loginfun}>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" onChange={onchangefun} name="email" requireds="true" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" onChange={onchangefun} name="password" minLength={5} requireds="true" />
                </div>

                <button type="submit" className="btn btn-primary" >Login</button>
            </form>
        </div>
    );
}

export default Login;
