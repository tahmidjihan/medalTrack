import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import React, { useEffect } from 'react';
import auth from './firebase.config';

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
  function signUp(email, password) {
    createUserWithEmailAndPassword(auth, email, password).then(
      (userCredential) => {
        setUser(userCredential.user);
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
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);
  const value = {
    useAuth,
    user,
    signIn,
    signUp,
    loginWithGoogle,
  };
  return (
    <>
      <authContext.Provider value={value}>{children}</authContext.Provider>
    </>
  );
}

export default AuthProvider;
