import "./homepage.scss";
import { useNavigate } from "react-router-dom";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithPhoneNumber,
  RecaptchaVerifier,
  signInWithEmailLink,
  signInWithRedirect,
  getRedirectResult,
} from "firebase/auth";
import {
  auth,
  db,
  getUser,
  writeUserData,
} from "../../firebase/firebase.config";
import { FcGoogle } from "react-icons/fc";
import { useEffect, useState } from "react";
// import { Preferences } from "@capacitor/preferences";
import logo from "../../assets/images/logo.png";
import { IoPersonCircle } from "react-icons/io5";
import { MdOutlinePhoneIphone } from "react-icons/md";
import { ImCross } from "react-icons/im";
import { useDispatch } from "react-redux";
import Logout from "../../components/modals/Logout";
import Loder from "../../components/Loder";
import { Dialog } from "@capacitor/dialog";
// import { set, } from "firebase/database";

const Homepage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const [isLogined, setIsLogined] = useState(false);
  const [user, setUser] = useState(null);
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

  const signIn = async (e) => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
    setLoading(true);
    // return signInWithPopup(auth, provider).then(async (response) => {
    //   const user = await getUser(response.user.uid);
    //   if (!user.exists()) {
    //     writeUserData(
    //       response.user.uid,
    //       response.user.displayName,
    //       response.user.email,
    //       response.user.phoneNumber,
    //       response.user.photoURL
    //     );
    //   }
    //   setUser({
    //     displayName: response.user.displayName,
    //     accessToken: response.user.accessToken,
    //     email: response.user.email,
    //     phoneNumber: response.user.phoneNumber,
    //     uid: response.user.uid,
    //     photoURL: response.user.photoURL,
    //   });
    //   // await setDoc(doc(db, "Users", response.user.uid), { score: 0 });

    //   console.log("User :");
    // });
  };

  const phoneLogin = async (e) => {
    setLoginBtn(true);
    try {
      e.preventDefault();

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
      setLoginBtn(false);
    }
  };

  const verifyOtp = (e) => {
    setOtpBtn(true);
    e.preventDefault();
    confirmation
      .confirm(verificationCode)
      .then(async (result) => {
        const currentUser = auth.currentUser;
        // user.updateProfile({
        //   displayName,
        //   email,
        // });
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

        // setUser({
        //   displayName: result.user.displayName,
        //   accessToken: result.user.accessToken,
        //   email: result.user.email,
        //   phoneNumber: result.user.phoneNumber,
        //   uid: result.user.uid,
        //   photoURL: result.user.photoURL,
        // });

        console.log("User :", result, user.exists());
        setOtpBtn(false);
        setLoading(true);
      })
      .catch(async (error) => {
        await Dialog.alert({
          title: "Stop",
          message: "Error while verifying OTP",
        });
        setOtpBtn(false);
      });
  };

  const getStoredUser = async () => {
    setLoading(true);

    auth.onAuthStateChanged(async (data) => {
      // setLoading(true)
      console.log(data);
      if (data) {
        if (data.displayName) {
          setUser({
            displayName: data.displayName,
            accessToken: data.accessToken,
            email: data.email,
            phoneNumber: data.phoneNumber,
            uid: data.uid,
            photoURL: data.photoURL,
          });
          setLoading(false);
        } else {
          const user = await getUser(data.uid);
          console.log("USER_EXIST :", user.val().displayName);
          user.exists() &&
            setUser({
              displayName: user.val().displayName,
              email: user.val().email,
              phoneNumber: user.val().phoneNumber,
              uid: user.val().uid,
            });
          setLoading(false);
        }
      }
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    });
  };

  const logoutHandler = async () => {
    dispatch.popups.open("logout");
  };

  useEffect(() => {
    setLoading(true);
    getStoredUser();
    getRedirectResult(auth)
      .then(async (response) => {
        console.log("RedirectResult ::: ", response);
        const user = await getUser(response.user.uid);
        if (!user.exists()) {
          writeUserData(
            response.user.uid,
            response.user.displayName,
            response.user.email,
            response.user.phoneNumber
          );
        }
      })
      .catch((error) => {
        console.log("RedirectError ::: ", error);
      });
  }, [otpBtn]);

  console.log("User ::", user);

  return (
    <div className="homepage">
      <Loder state={loading} />
      {!user ? (
        <div className="signIn">
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
                  setLoginThroughPhone(false),
                    setDisplayName(""),
                    setPhoneNumber(""),
                    setEmail("");
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
                  // required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Enter your email"
                />
                <input
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  type="text"
                  placeholder="XXXXX XX789"
                  maxLength={10}
                  minLength={10}
                />
                <button disabled={loginBtn} type="submit">
                  Login
                </button>
              </form>
              <div id="recaptcha-container"></div>
            </div>
          )}
          {enterOtp && (
            <div className="phone-input">
              <span
                className="dismiss"
                onClick={() => {
                  // eslint-disable-next-line no-unused-expressions
                  setEnterOtp(false),
                    setDisplayName(""),
                    setPhoneNumber(""),
                    setEmail("");
                }}
              >
                <ImCross size={22} />
              </span>
              <form onSubmit={verifyOtp}>
                {/* <label htmlFor="phone">Enter your phone number</label> */}
                <input
                  required
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  type="text"
                  placeholder="Enter OTP"
                  minLength={6}
                  maxLength={6}
                />
                <button disabled={otpBtn} type="submit">
                  Submit
                </button>
              </form>
            </div>
          )}
        </div>
      ) : (
        <>
          <div className="logo">
            <img src={logo} alt="" srcset="" width={270} />
          </div>
          {/* <div className="user-name">
            {user && <h1>Hello {user.displayName}</h1>}
          </div> */}
          <div className="play-btn">
            <button onClick={() => navigate("/play-ground")}>
              Start Playing
            </button>
          </div>
          <div className="logout-option">
            <div className="logout-btn" onClick={logoutHandler}>
              {user?.photoURL ? (
                <img src={user.photoURL} alt="user profile" />
              ) : (
                <IoPersonCircle size={35} color="#fffcfc" />
              )}
              <div>
                {user?.displayName && (
                  <span>{user.displayName.split(" ")[0]}</span>
                )}
              </div>
            </div>
          </div>
        </>
      )}
      <Logout clearUserData={() => setUser(null)} />
    </div>
  );
};

export default Homepage;
