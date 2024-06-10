import "./homepage.scss";
import { useNavigate } from "react-router-dom";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithPhoneNumber,
  RecaptchaVerifier,
  signInWithEmailLink,
} from "firebase/auth";
import { auth, db } from "../../firebase/firebase.config";
import { FcGoogle } from "react-icons/fc";
import { useEffect, useState } from "react";
// import { Preferences } from "@capacitor/preferences";
import logo from "../../assets/images/logo.png";
import { IoPersonCircle } from "react-icons/io5";
import { MdOutlinePhoneIphone } from "react-icons/md";
import { useDispatch } from "react-redux";
import Logout from "../../components/modals/Logout";
import Loder from "../../components/Loder";
import { setDoc, doc, getDoc } from "firebase/firestore";

const Homepage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const [isLogined, setIsLogined] = useState(false);
  const [user, setUser] = useState(null);
  const [loginThroughPhone, setLoginThroughPhone] = useState(false);
  const [enterOtp, setEnterOtp] = useState(false);
  const [confirmation, setConfirmation] = useState();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [loading, setLoading] = useState(false);

  const signIn = async (e) => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider).then(async (response) => {
      // localStorage.setItem("user", JSON.stringify(response.user));
      // await Preferences.set({
      //   key: "user",
      //   value: JSON.stringify({
      //     displayName: response.user.displayName,
      //     accessToken: response.user.accessToken,
      //     email: response.user.email,
      //     phoneNumber: response.user.phoneNumber,
      //     uid: response.user.uid,
      //     photoURL: response.user.photoURL,
      //   }),
      // });
      setUser({
        displayName: response.user.displayName,
        accessToken: response.user.accessToken,
        email: response.user.email,
        phoneNumber: response.user.phoneNumber,
        uid: response.user.uid,
        photoURL: response.user.photoURL,
      });
      await setDoc(doc(db, "Users", response.user.uid), { score: 0 });
      console.log("User :", response.user);
      // setIsLogined(true);
    });
  };

  const phoneLogin = async (e) => {
    e.preventDefault();
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
    } catch (error) {}
  };

  const verifyOtp = (e) => {
    e.preventDefault();
    confirmation.confirm(verificationCode).then(async (result) => {
      // localStorage.setItem("user", JSON.stringify(result));
      // await Preferences.set({
      //   key: "user",
      //   value: JSON.stringify({
      //     displayName: result.user.displayName,
      //     accessToken: result.user.accessToken,
      //     email: result.user.email,
      //     phoneNumber: result.user.phoneNumber,
      //     uid: result.user.uid,
      //     photoURL: result.user.photoURL,
      //   }),
      // });
      setUser({
        displayName: result.user.displayName,
        accessToken: result.user.accessToken,
        email: result.user.email,
        phoneNumber: result.user.phoneNumber,
        uid: result.user.uid,
        photoURL: result.user.photoURL,
      });
      console.log("User :", result);
      setEnterOtp(false);
      setLoginThroughPhone(false);
      // setIsLogined(true);
    });
  };

  const getStoredUser = async () => {
    // const { value } = await Preferences.get({ key: "user" });
    setLoading(true);

    auth.onAuthStateChanged((data) => {
      console.log(data);
      setUser({
        displayName: data.displayName,
        accessToken: data.accessToken,
        email: data.email,
        phoneNumber: data.phoneNumber,
        uid: data.uid,
        photoURL: data.photoURL,
      });
    });
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  const logoutHandler = async () => {
    // await Preferences.remove({ key: "user" });
    dispatch.popups.open("logout");
    // await auth.signOut();
    // navigate("/");
  };

  useEffect(() => {
    getStoredUser();
  }, []);

  console.log("User ::", user);

  return (
    <div className="homepage">
      <Loder state={loading} />
      {!user ? (
        <div className="signIn">
          {!loginThroughPhone && !enterOtp && (
            <>
              <div className="option-login">
                <button onClick={signIn}>
                  {" "}
                  <FcGoogle size={22} /> Login with Google{" "}
                </button>
              </div>
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
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  type="text"
                  placeholder="+91 XXXXX XX789"
                />
                <button type="submit">Login</button>
              </form>
              <div id="recaptcha-container"></div>
            </div>
          )}
          {enterOtp && (
            <div className="phone-input">
              <form onSubmit={verifyOtp}>
                {/* <label htmlFor="phone">Enter your phone number</label> */}
                <input
                  required
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  type="text"
                  placeholder="Enter OTP"
                />
                <button type="submit">Submit</button>
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
              {user.photoURL ? (
                <img src={user.photoURL} alt="" width={35} />
              ) : (
                <IoPersonCircle size={35} color="#fffcfc" />
              )}
              <div>
                {user.displayName && (
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
