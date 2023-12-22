import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

export default function ResetPassword(props) {

    let Navigate = useNavigate();

    const { token } = useParams();
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [passwordMatch, setpasswordMatch] = useState(true);
    const [passwordLengthError, setPasswordLengthError] = useState(false);


    const [err1, setSerr1] = useState(true);
    const [err2, setSerr2] = useState(true);


    const handleResetPassword = async () => {

        if (newPassword !== confirmPassword) {
            setpasswordMatch(false);
            props.aboutalert('confirm  password not match', 'error');


            return;
        }

        try {

            const response = await fetch('http://localhost:5000/api/auth/resetpassword/' + token, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ newPassword }),
            });
            if (response.ok) {
                console.log('Password reset successfully');
                props.aboutalert('Reset Password  successfully', 'success');
                Navigate('/login');

                // Handle success, e.g., redirect to login page
            } else {
                console.error('Failed to reset password');
                props.aboutalert('Token Expire', 'error');

                // Handle error, e.g., display an error message
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };


    const handlenewPasswordchange = (e) => {

        const newPasswordValue = e.target.value;
        setNewPassword(newPasswordValue);
        setpasswordMatch(true);

        // Check if the password meets the minimum length requirement
        if (newPasswordValue.length < 5) {
            setSerr1(true);
            setPasswordLengthError(true);
        } else {
            setSerr1(false);
            setPasswordLengthError(false);
        }
    }

    const handleconfirmPassword = (e) => {

        const confirmPasswordValue = e.target.value;
        setConfirmPassword(confirmPasswordValue);
        setpasswordMatch(true);

        // Check if the password meets the minimum length requirement
        if (confirmPasswordValue.length < 5) {
            setSerr2(true);
            setPasswordLengthError(true);
        } else {
            setSerr2(false);
            setPasswordLengthError(false);
        }

    }

    return (
        <div className="container my-auto d-flex justify-content-center align-items-center vh-100">
            <div className="border p-5 col-md-4">
                <div className="text-center mb-4">
                    <h5>Reset Password</h5>
                    <p>
                        Your password must be at least 5 characters and should include a combination of numbers, letters, and special characters (!$@%).
                    </p>
                </div>

                <div className="mb-3">
                    <label htmlFor="newPassword" className="form-label">
                        New Password:
                    </label>
                    <input
                        type="password"
                        className="form-control mb-3"
                        id="newPassword"
                        placeholder="New Password"
                        value={newPassword}
                        onChange={
                            handlenewPasswordchange

                        }

                        required
                    />

                    <label htmlFor="confirmPassword" className="form-label">
                        Confirm Password:
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="confirmPassword"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={
                            handleconfirmPassword
                        }

                        required={true}

                    />


                    {
                        passwordLengthError && (
                            <div className="text-danger">Password must be at least 5 characters long</div>
                        )
                    }
                </div>

                <button disabled={err1 || err2} className="btn btn-primary w-100" onClick={handleResetPassword}>
                    Reset Password
                </button>


            </div>
        </div>
    )
}
