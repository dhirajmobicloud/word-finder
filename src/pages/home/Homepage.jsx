import "./homepage.scss";
import { useNavigate } from "react-router-dom";
// import { getRedirectResult } from "firebase/auth";
import { auth, getUser } from "../../firebase/firebase.config";
import { useEffect, useState } from "react";
import logo from "../../assets/images/logo-1.png";
import { IoPersonCircle } from "react-icons/io5";
import { useDispatch } from "react-redux";
import Logout from "../../components/modals/Logout";
import Loder from "../../components/Loder";
import {Preferences} from '@capacitor/preferences'
import { FaTrophy } from "react-icons/fa";

const Homepage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [wins, setWins] = useState(0);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // const getStoredUser = async () => {
  //   setLoading(true);
  //   auth.onAuthStateChanged(async (data) => {
  //     if (data) {
  //       if (data.displayName) {
  //         setUser({
  //           displayName: data.displayName,
  //           accessToken: data.accessToken,
  //           email: data.email,
  //           phoneNumber: data.phoneNumber,
  //           uid: data.uid,
  //           photoURL: data.photoURL,
  //         });
  //         setLoading(false);
  //       } else {
  //         const user = await getUser(data.uid);
  //         user.exists() &&
  //           setUser({
  //             displayName: user.val().displayName,
  //             email: user.val().email,
  //             phoneNumber: user.val().phoneNumber,
  //             uid: user.val().uid,
  //           });
  //         setLoading(false);
  //       }
  //     } else {
  //       navigate("/");
  //     }
  //     setTimeout(() => {
  //       setLoading(false);
  //     }, 1500);
  //   });
  // };

  const logoutHandler = async () => {
    dispatch.popups.open("logout");
  };

  const checkWins = async () => {
    // const { value } = await Preferences.get({ key: 'wins' });
    const storedWins = localStorage.getItem('wins')
    // console.log("wins :", value)
    console.log("storedWins :", storedWins)
    if(storedWins == null){
      // await Preferences.set({
      //   key: 'wins',
      //   value: '0',
      // });
      localStorage.setItem("wins", 0)
    }else{
      setWins(Number(storedWins))
    }
  };

  useEffect(() => {
    checkWins()
    // setLoading(true);
    // getStoredUser();
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
    
  }, []);


  return (
    <div className="homepage">
      {/* <Loder state={loading} /> */}
      <>
        <div className="logo">
          <img src={logo} alt="" srcSet="" width={200} />
        </div>
        <div className="play-btn">
          <button onClick={() => navigate("/play-ground")}>
            Start Playing
          </button>
        </div>
        <div className="logout-option">
          <div className="logout-btn" onClick={logoutHandler}>
            {/* {user?.photoURL ? (
              <img src={user.photoURL} alt="user profile" />
            ) : (
              <IoPersonCircle size={35} color="#fffcfc" />
            )} */}
             <FaTrophy color="#fffb05" size={20}/>
            <span> Wins : {wins} </span>
            {/* <div>
              {wins && (
                <span>  {wins}</span>
              )}
            </div> */}
          </div>
        </div>
      </>
      <Logout clearUserData={() => setUser(null)} /> 
       
    </div>
  );
};

export default Homepage;
