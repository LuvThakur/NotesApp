import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";


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
    };

    const onchangefun = (e) => {
        setcredentail({ ...credentail, [e.target.name]: e.target.value });
    };




    return (
        <div className="container my-5 rounded d-flex flex-column justify-content-center align-items-center">
            <div className="card my-5  p-5 shadow-sm" style={{ maxWidth: "500px", backgroundColor: "#f8f9fa", borderRadius: "10px" }}>
                <h2 className="text-center mb-4">Login to Continue</h2>
                <form onSubmit={Loginfun} className="mx-auto">
                    <div className="mb-4">
                        <label htmlFor="email" className="form-label">
                            <i className="fas fa-envelope me-2"></i>
                            Email address
                        </label>
                        <input
                            type="email"
                            className="form-control w-100"
                            id="email"
                            aria-describedby="emailHelp"
                            onChange={onchangefun}
                            name="email"
                            required
                        />
                        <div id="emailHelp" className="form-text">
                            We'll never share your email with anyone else.
                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="form-label">
                            <i className="fas fa-lock me-2"></i>
                            Password
                        </label>
                        <input
                            type="password"
                            className="form-control w-100"
                            id="password"
                            onChange={onchangefun}
                            name="password"
                            minLength={5}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">
                        Login
                    </button>
                    <Link to="/reset" className="mt-3 btn btn-danger w-100">
                        Forget Password
                    </Link>
                </form>
            </div>
        </div>

    );
}

export default Login;
