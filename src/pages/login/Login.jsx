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
} from "firebase/auth";
import Loder from "../../components/Loder";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [loginThroughPhone, setLoginThroughPhone] = useState(false);
  const [enterOtp, setEnterOtp] = useState(false);
  const [confirmation, setConfirmation] = useState();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [loading, setLoading] = useState(true);
  const [loginBtn, setLoginBtn] = useState(false);
  const [otpBtn, setOtpBtn] = useState(false);

  const navigate = useNavigate();


  // const signIn = async (e) => {
  //   const provider = new GoogleAuthProvider();
  //   signInWithRedirect(auth, provider);
  //   setLoading(true);
  //   ////----/////
  //   // return signInWithPopup(auth, provider).then(async (response) => {
  //   //   const user = await getUser(response.user.uid);
  //   //   if (!user.exists()) {
  //   //     writeUserData(
  //   //       response.user.uid,
  //   //       response.user.displayName,
  //   //       response.user.email,
  //   //       response.user.phoneNumber,
  //   //       response.user.photoURL
  //   //     );
  //   //   }
  //   //   setUser({
  //   //     displayName: response.user.displayName,
  //   //     accessToken: response.user.accessToken,
  //   //     email: response.user.email,
  //   //     phoneNumber: response.user.phoneNumber,
  //   //     uid: response.user.uid,
  //   //     photoURL: response.user.photoURL,
  //   //   });
  //   //   // await setDoc(doc(db, "Users", response.user.uid), { score: 0 });

  //   //   console.log("User :");
  //   // });
  // };

  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const phoneLogin = async (e) => {
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

    if (phoneNumber.length < 10) {
      await Dialog.alert({
        title: "Invalid phone number",
        message: "Phone number should be 10 digits long.",
      });
      return;
    }

    setLoginBtn(true);
    try {
      const recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {}
      );

      const confirmationResult = await signInWithPhoneNumber(
        auth,
        `+91 ${phoneNumber}`,
        recaptchaVerifier
      );

      setConfirmation(confirmationResult);
      setEnterOtp(true);
      setLoginThroughPhone(false);
      setLoginBtn(false);
    } catch (error) {
      await Dialog.alert({
        title: "Stop",
        message: "Error while sending OTP",
      });
      setLoginThroughPhone(false);
      setLoginBtn(false);
    }
  };

  const verifyOtp = (e) => {
    setLoading(true);
    setOtpBtn(true);
    e.preventDefault();
    confirmation
      .confirm(verificationCode)
      .then(async (result) => {
        const currentUser = auth.currentUser;

        currentUser.displayName = displayName;
        currentUser.email = email;
        const user = await getUser(result.user.uid);
        if (!user.exists()) {
          writeUserData(
            result.user.uid,
            displayName,
            email,
            result.user.phoneNumber
          );
        }
        setDisplayName("");
        setEmail("");
        setEnterOtp(false);
        setLoginThroughPhone(false);
        setPhoneNumber("");
        setVerificationCode("");
        navigate("/home");

        setOtpBtn(false);
      })
      .catch(async (error) => {
        await Dialog.alert({
          title: "Stop",
          message: "Error while verifying OTP",
        });
        setOtpBtn(false);
        setEnterOtp(false);
        setVerificationCode("");
        setLoading(false);
      });
  };

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
    // getRedirectResult(auth)
    //   .then(async (response) => {
    //     const user = await getUser(response.user.uid);
    //     if (!user.exists()) {
    //       writeUserData(
    //         response.user.uid,
    //         response.user.displayName,
    //         response.user.email,
    //         response.user.phoneNumber
    //       );
    //     }
    //   })
    //   .catch((error) => {
    //     console.log("RedirectError ::: ", error);
    //   });
    // eslint-disable-next-line
  }, [otpBtn]);

  return (
    <div className="signIn">
      <Loder state={loading} />
      {!loginThroughPhone && !enterOtp && (
        <>
          {/* <div className="option-login">
        <button onClick={signIn}>
          {" "}
          <FcGoogle size={22} /> Login with Google{" "}
        </button>
      </div> */}
          <div className="option-login">
            <button onClick={() => setLoginThroughPhone(true)}>
              <MdOutlinePhoneIphone size={22} />
              Login with phone
            </button>
          </div>
        </>
      )}
      {loginThroughPhone && (
        <div className="phone-input">
          <span
            className="dismiss"
            onClick={() => {
              // eslint-disable-next-line no-unused-expressions
              // eslint-disable-next-line
              setLoginThroughPhone(false),
                setDisplayName(""),
                setPhoneNumber(""),
                setEmail("");
              setOtpBtn(false);
              setLoginBtn(false);
            }}
          >
            <ImCross size={22} />
          </span>
          <div className="phone-input-heading">
            <h5>
              {" "}
              <MdOutlinePhoneIphone size={30} /> Login with phone
            </h5>
          </div>
          <form onSubmit={phoneLogin}>
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
              value={phoneNumber}
              // eslint-disable-next-line no-unused-expressions
              onChange={(e) => {
                // eslint-disable-next-line no-unused-expressions
                e.target.value.length < 11
                  ? setPhoneNumber(e.target.value)
                  : "";
              }}
              placeholder="XXXXX XX789"
              type="number"
            // pattern="\d{10}"
            // maxlength="10"
            // minLength="10"
            />
            <button disabled={loginBtn} type="submit">
              Login
            </button>
          </form>
          <div id="recaptcha-container"></div>
        </div>
      )}
      {enterOtp && (
        <div className="otp-input">
          <span
            className="dismiss"
            onClick={() => {
              // eslint-disable-next-line no-unused-expressions
              // eslint-disable-next-line
              setEnterOtp(false),
                setDisplayName(""),
                setPhoneNumber(""),
                setEmail("");
              setOtpBtn(false);
              setLoginBtn(false);
            }}
          >
            <ImCross size={22} />
          </span>
          <form onSubmit={verifyOtp}>
            {/* <label htmlFor="phone">Enter your phone number</label> */}
            <input
              required
              value={verificationCode}
              // eslint-disable-next-line no-unused-expressions
              onChange={(e) => { e.target.value.length < 7 ? setVerificationCode(e.target.value) : "" }}
              type="number"
              placeholder="Enter OTP"
            // minLength={6}
            // maxLength={6}
            />
            <button disabled={otpBtn} type="submit">
              Submit
            </button>
          </form>
        </div>
      )}

    </div>
  );
};
