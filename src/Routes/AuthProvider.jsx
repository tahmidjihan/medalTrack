import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
import React, { useEffect } from 'react';
import auth from './firebase.config';
import axios from 'axios';

const authContext = React.createContext();
const useAuth = () => React.useContext(authContext);
export { useAuth };

function AuthProvider({ children }) {
  const [user, setUser] = React.useState(null);

  function signIn(email, password) {
    signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
      setUser(userCredential.user);
    });
  }
  function signUp(email, password, name, image) {
    createUserWithEmailAndPassword(auth, email, password).then(
      (userCredential) => {
        const user = userCredential.user;
        updateProfile(user, {
          displayName: name,
          photoURL: image,
        }).then(() => {
          setUser(user);
        });
      }
    );
  }
  function loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      setUser(user);
    });
  }
  function logOut() {
    signOut(auth).then(() => {
      setUser(null);
      axios.post('https://backend-11.vercel.app/logout', null, {
        withCredentials: true,
      });
    });
  }
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);
  const value = {
    useAuth,
    user,
    signIn,
    signUp,
    logOut,
    loginWithGoogle,
  };
  return (
    <>
      <authContext.Provider value={value}>{children}</authContext.Provider>
    </>
  );
}

export default AuthProvider;
