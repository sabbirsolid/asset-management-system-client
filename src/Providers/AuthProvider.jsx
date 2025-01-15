import { createContext } from "react";
import { auth } from "../firebase/firebase.config";
import { createUserWithEmailAndPassword } from "firebase/auth";

export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
    // signup with email pass
    const signInWithEmail = (email, password) =>{
        return createUserWithEmailAndPassword(auth,email,password)
    }
    const authInfo = {
        signInWithEmail
    }
  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
