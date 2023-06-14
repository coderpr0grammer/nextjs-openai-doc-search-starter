import React, { createContext, useState, useEffect } from "react";
import {
  collection,
  doc,
  setDoc,
  addDoc,
  onSnapshot,
  where,
  query,
  getDoc,
  updateDoc
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db, app } from "../../utils/firebaseConfig";
import { useNavigate, useLocation } from "react-router";

export const AuthenticationContext = createContext();

const AuthenticationContextProvider = ({ children }) => {
  const auth = getAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(null);
  const [uid, setUid] = useState(null);
  const [userData, setUserData] = useState(null);

  const updateUserData = async (params) => {
    const userRef = doc(db, 'users', uid);

    await updateDoc(userRef, params)
  }


  const getUserData = async (u) => {
    const docRef = doc(db, "users", u.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const docSnapData = docSnap.data()
      setUserData(docSnapData)

      const lastSearchesReset = docSnapData.lastSearchesReset;

      const d = new Date();
      const today = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
      console.log(lastSearchesReset, today)


      if (lastSearchesReset != today) {
        updateUserData({ searchesToday: 0, lastSearchesReset: today })
      }

    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");

    }
  }

  useEffect(() => {

    auth.onAuthStateChanged((u) => {
      if (location.pathname != "/popup") {
        if (u) {
          // console.log("changed: ", u);
          setUser(u);
          setUid(u.uid);
          // console.log("params: ", new URLSearchParams(new URL(window.location.href).search).get('vid'))
          startDataListeners(u);
          navigateWithQueryVars(navigate, '/')
        } else {
          navigateWithQueryVars(navigate, '/login')

        }
      }
    });
  }, [])


  return (
    <AuthenticationContext.Provider
      value={{
        user,
        setUser,
        uid,
        setUid,
        userData,
        setUserData,
        updateUserData,
        getUserData,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

export default AuthenticationContextProvider;
