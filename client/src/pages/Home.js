import React, { useState } from "react";
import Login from "../components/Login/login";
import SignUp from "../components/SignUp/signup";

const Home = () => {
  const [showSignup, setShowSignup] = useState(false);

  const changeShowSignUp = (value) => {
    setShowSignup(value);
  }

  return (
    <>
      {!showSignup ? <Login changeSignup={changeShowSignUp}/> : ''}
      {showSignup ? <SignUp changeSignup={changeShowSignUp}/> : ''}
    </>
  );
};

export default Home;
