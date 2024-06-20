import { Dialog } from "@capacitor/dialog";
import React, { useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import { MdOutlinePhoneIphone } from "react-icons/md";
import { auth, getUser, writeUserData } from "../../firebase/firebase.config";
import {
    signInWithPhoneNumber,
    RecaptchaVerifier,
    // getRedirectResult,
    // signInWithRedirect,
    // GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from "firebase/auth";
import Loder from "../../components/Loder";
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const [displayName, setDisplayName] = useState("");
    const [email, setEmail] = useState("");
    const [signUp, setSignUp] = useState(false);
    const [login, setLogin] = useState(true);
    const [password, setPassword] = useState();
    const [loading, setLoading] = useState(true);
    const [loginBtn, setLoginBtn] = useState(false);
    const [signUpBtn, setSignUpBtn] = useState();

    const navigate = useNavigate();


    const isValidEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    };

    const createUser = async (e) => {
        e.preventDefault();

        if (displayName.length < 3) {
            await Dialog.alert({
                title: "Invalid name",
                message: "Name should contains at least 3 characters.",
            });
            return;
        }

        if (!isValidEmail(email)) {
            await Dialog.alert({
                title: "Invalid email",
                message: "Make sure your email follows the standard format.",
            });
            return;
        }

        if (password.length < 6) {
            await Dialog.alert({
                title: "Invalid password",
                message: "Password must be six character long.",
            });
            return;
        }

        try {
            setSignUpBtn(true)
            const result = await createUserWithEmailAndPassword(auth, email, password);
            let currentUser = auth.currentUser
            currentUser.displayName = displayName;
            currentUser.email = email;
            const user = await getUser(result.user.uid);
            if (!user.exists()) {
                writeUserData(
                    result.user.uid,
                    displayName,
                    email,
                    // result.user.phoneNumber
                );
            }
            navigate("/home")
            setSignUpBtn(false)
        } catch (error) {
            await Dialog.alert({
                title: "Error",
                // message: "Error while creating user.",
                message: error == 'FirebaseError: Firebase: Error (auth/email-already-in-use).' ? "Email already in use." : "Error while creating user.",
            });
            setSignUpBtn(false)
        }
    }

    const loginUser = async (e) => {
        e.preventDefault();

        if (!isValidEmail(email)) {
            await Dialog.alert({
                title: "Invalid email",
                message: "Make sure your email follows the standard format.",
            });
            return;
        }

        try {
            setLoginBtn(true)
            await signInWithEmailAndPassword(auth, email, password)
            setEmail("")
            setPassword("")
            navigate("/home")
            setLoginBtn(false)
        } catch (error) {
            await Dialog.alert({
                title: "Error",
                message: error == 'FirebaseError: Firebase: Error (auth/invalid-credential).' ? "Invalid credential" : "Error while login.",
            });
            setLoginBtn(false)
        }

    }

    const getStoredUser = async () => {
        setLoading(true);

        auth.onAuthStateChanged(async (data) => {

            if (data) {
                navigate("/home");

            } else {
                setLoading(false);
            }

        });
    };

    useEffect(() => {
        setLoading(true);
        getStoredUser();

    }, []);

    return (
        <div className="signIn">
            <Loder state={loading} />
            {signUp && (
                <div className="phone-input">

                    <div className="phone-input-heading">
                        <h5>
                            {" "}
                            {/* <MdOutlinePhoneIphone size={30} />  */}
                            Sign Up
                        </h5>
                    </div>
                    <form onSubmit={createUser}>
                        {/* <label htmlFor="phone">Enter your phone number</label> */}

                        <input
                            required
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                            type="text"
                            placeholder="Enter your name"
                        />
                        <input
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            // pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                            placeholder="Enter your email"
                        />

                        <input
                            required
                            type="password"
                            value={password}
                            placeholder="Enter password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button disabled={signUpBtn} type="submit">
                            Sign Up
                        </button>
                        <span
                            // eslint-disable-next-line no-unused-expressions
                            onClick={() => { setLogin(true), setSignUp(false), setDisplayName(""), setEmail(""), setPassword("") }}
                            style={{
                                fontSize: "15px",
                                textDecoration: "underline",
                                color: "blue"
                            }}
                        >Already have account </span>
                    </form>
                    <div id="recaptcha-container"></div>
                </div>
            )}
            {login && (
                <div className="otp-input">
                    {/* <span
            className="dismiss"
            onClick={() => {
              // eslint-disable-next-line no-unused-expressions
              // eslint-disable-next-line
              setLogin(false),
                setDisplayName(""),
                setPassword(""),
                setEmail("");
              setLoginBtn(false);
            }}
          >
            <ImCross size={22} />
          </span> */}
                    <div className="phone-input-heading">
                        <h5>
                            {" "}
                            {/* <MdOutlinePhoneIphone size={30} />  */}
                            Login
                        </h5>
                    </div>
                    <form onSubmit={loginUser}>
                        <input
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            // pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                            placeholder="Enter your email"
                        />
                        <input
                            required
                            type="password"
                            value={password}
                            placeholder="Enter password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button disabled={loginBtn} type="submit">
                            Login
                        </button>
                        <div>
                            <span
                                // eslint-disable-next-line no-unused-expressions
                                onClick={() => { setLogin(false), setSignUp(true), setDisplayName(""), setEmail(""), setPassword("") }}
                                style={{
                                    fontSize: "15px",
                                    textDecoration: "underline",
                                    color: "blue",
                                    marginRight: "5px",
                                    fontWeight: "bold"
                                }}
                            >Sign Up</span>
                            <span
                                onClick={() => navigate('/forget-password')}
                                style={{
                                    fontSize: "15px",
                                    textDecoration: "underline",
                                    color: "blue",
                                    marginLeft: "5px",
                                    fontWeight: "bold"
                                }}
                            >
                                Forget Password
                            </span>
                        </div>
                    </form>
                </div>
            )}


        </div>
    );
};
