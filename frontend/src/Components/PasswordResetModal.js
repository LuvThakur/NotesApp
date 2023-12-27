// PasswordResetModal.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';


function PasswordResetModal(props) {

    const [credentail, setcredentail] = useState({ email: ""});


    const onchangefun = (e) => {
        setcredentail({ ...credentail, [e.target.name]: e.target.value });
    };


    const handleSendResetLink = async (e) => {

        e.preventDefault();

        const host = process.env.REACT_APP_API_HOST;

        try {

            const response = await fetch(`${host}/api/auth/resetpassword`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",

                },
                body: JSON.stringify({ email: credentail.email })
            })

            if (response.ok) {
                props.aboutalert('Forget Password email sent successfully', 'success');
            } else {

                const errorData = await response.json();
                console.error('Forget Password Error:', errorData);
                props.aboutalert('Forget Password request failed', 'error');
            }

        }
        catch (error) {
            console.error('Forget Password Error:', error.message);
            props.aboutalert('Internal Server Error', 'error');
        }

    };

    return (
        <div className='container my-auto p-4'>

            <div className='container border py-4 my-5 col-md-4 mx-auto'>

                <div className="text-center mb-4">
                    <span className="fa fa-user-circle-o fa-5x text-danger"></span>
                </div>

                <div className="text-center mb-4">
                    <h1 className="mb-3">Trouble logging in?</h1>
                </div>

                <div className="text-center mb-4">
                    <p>Enter your email, and we'll send you a link to get back into your account.</p>
                </div>

                <div className="text-center mb-4">
                    <input type="email" className="form-control" placeholder="Enter your email" id="email" aria-describedby="emailHelp" onChange={onchangefun} name="email" requireds="true" />
                </div>

                <div className="text-center mb-4">
                    <button className="btn btn-outline-danger" onClick={handleSendResetLink}>
                        Send Reset Link
                    </button>
                </div>

                <div className="text-center my-4">
                    <h5>-------------OR--------------</h5>
                </div>

                <div className="text-center mb-4">
                    <Link to='/signup' className="text-danger text-decoration-none">
                        Create New Account
                    </Link>
                </div>

                <div className="text-center">
                    <Link to='/login' className="btn btn-outline-danger" >
                        Back to Login
                    </Link>
                </div>

            </div>

        </div>

    )
}

export default PasswordResetModal;
