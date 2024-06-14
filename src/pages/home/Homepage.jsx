import "./homepage.scss";
import { useNavigate } from "react-router-dom";
import { getRedirectResult } from "firebase/auth";
import { auth, getUser, writeUserData } from "../../firebase/firebase.config";
import { useEffect, useState } from "react";
import logo from "../../assets/images/logo-1.png";
import logo from "../../assets/images/logo-1.png";
import { IoPersonCircle } from "react-icons/io5";
import { useDispatch } from "react-redux";
import Logout from "../../components/modals/Logout";
import Loder from "../../components/Loder";
import { App } from "@capacitor/app";

const Homepage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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
      } else {
        navigate("/");
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

    const backButtonHandler = () => {
      dispatch.popups.open("logout");
    };

    App.addListener("backButton", backButtonHandler);
  }, []);

  console.log("User ::", user);

  return (
    <div className="homepage">
      <Loder state={loading} />
      <>
        <div className="logo">
          <img src={logo} alt="" srcset="" width={200} />
        </div>
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
      <Logout clearUserData={() => setUser(null)} />
    </div>
  );
};

export default Homepage;
