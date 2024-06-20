import React, { useState } from 'react'
import './forgetpassword.scss'
import { useNavigate } from 'react-router-dom'
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebase/firebase.config';
import { Dialog } from '@capacitor/dialog';

const ForgetPassword = () => {
    const [email, setEmail] = useState('');
    const [resetSent, setResetSent] = useState(false);
    const [forgetPassBtn, setForgetPassBtn] = useState(false);

    const navigate = useNavigate();

    const isValidEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();

        if (!isValidEmail(email)) {
            await Dialog.alert({
                title: "Invalid email",
                message: "Make sure your email follows the standard format.",
            });
            return;
        }

        try {
            setForgetPassBtn(true)
            await sendPasswordResetEmail(auth, email);
            setResetSent(true);
            setForgetPassBtn(false)
            await Dialog.alert({
                title: "Password reset email sent!",
                message: ""
            })
            navigate('/')
        } catch (error) {
            await Dialog.alert({
                title: "Error",
                message: "Error sending password reset email"
            })
        }
    };



    return (
        <div className='forget-pass'>

            <div className="forget-pass-input">

                <div className="forget-pass-input-heading">
                    <h5>
                        {" "}
                        {/* <MdOutlinePhoneIphone size={30} />  */}
                        Forget Password
                    </h5>
                </div>
                <form onSubmit={handleResetPassword}>
                    <input
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        // pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                        placeholder="Enter your email"
                    />

                    <button disabled={forgetPassBtn} type="submit">
                        Reset Password
                    </button>
                    <span
                        // eslint-disable-next-line no-unused-expressions
                        onClick={() => navigate('/')}
                        style={{
                            fontSize: "15px",
                            textDecoration: "underline",
                            color: "blue",
                            fontWeight: "bold"
                        }}
                    >Login</span>
                </form>
            </div>
        </div>
    )
}

export default ForgetPassword
