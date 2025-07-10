/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/firebase";
import useAxiosSecure from "../hooks/useAxiosSecure";

// Creating a context
export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  let [user, setUser] = useState(null);
  let [loading, setLoading] = useState(true);
  const provider = new GoogleAuthProvider();

  const axiosSecure = useAxiosSecure();

  // User create
  let createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // User login
  let logIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // User signUp
  let signOutUser = async () => {
    // Clear JWT cookie via backend
    await axiosSecure.post("/logout", {}, { withCredentials: true });

    return signOut(auth);
  };

  // Sign in with Google
  let signInWithGoogle = () => {
    return signInWithPopup(auth, provider);
  };

  // Update user
  let updateUser = (updateData) => {
    return updateProfile(auth.currentUser, updateData);
  };

  useEffect(() => {
    let unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      if (currentUser?.email) {
        try {
          const response = await axiosSecure.post(
            "/jwt",
            { email: currentUser.email },
            { withCredentials: true }
          );

          console.log(response.data);
        } catch (error) {
          console.error("Failed to send email to /jwt:", error);
        }
      }
    });

    return () => {
      unSubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const userInfo = {
    createUser,
    logIn,
    user,
    signOutUser,
    setUser,
    loading,
    updateUser,
    signInWithGoogle,
  };

  return <AuthContext value={userInfo}>{children}</AuthContext>;
};

export default AuthProvider;
