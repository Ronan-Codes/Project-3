import React, { useState } from "react";
import Login from "../components/Login/login";
import SignUp from "../components/SignUp/signup";

// import { useQuery } from "@apollo/client";
// import { QUERY_GENRES } from '../utils/queries'

const Home = () => {
  const [showSignup, setShowSignup] = useState(false);

  const changeShowSignUp = (value) => {
    setShowSignup(value);
  }

//   const { loading, data: genresData } = useQuery(QUERY_GENRES);

//   if(!loading){
//     console.log(genresData)
// }

  return (
    <>
      {!showSignup ? <Login changeSignup={changeShowSignUp}/> : ''}
      {showSignup ? <SignUp changeSignup={changeShowSignUp}/> : ''}
    </>
  );
};

export default Home;
