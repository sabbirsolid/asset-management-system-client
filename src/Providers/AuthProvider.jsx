import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../Firebase/firebase.config";
import { GoogleAuthProvider } from "firebase/auth";
import useAxiosPublic from "../hooks/useAxiosPublic";

export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const provider = new GoogleAuthProvider();
  const axiosPublic = useAxiosPublic();

  // create user with email password
  const createUserWithEmail = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  // sign in with email password
  const logIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  // signIn with google
  const signInWithGoogle = () => {
    return signInWithPopup(auth, provider);
  };
  // sign out
  const logOut = () => {
    return signOut(auth);
  };
  // observer
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const userInfo = { email: currentUser.email };
        axiosPublic.post("/jwt", userInfo).then((res) => {
          if (res.data.token) {
            localStorage.setItem("access-token", res.data.token);
            setLoading(false);
          }
        });
      } else {
        localStorage.removeItem("access-token");
        setLoading(false);
      }
    });
    return () => {
      unSubscribe();
    };
  }, []);
  const userInfo = {
    createUserWithEmail,
    user,
    logIn,
    loading,
    signInWithGoogle,
    logOut,
  };
  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
