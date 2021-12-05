import GlobalStyles from "./GlobalStyles";
import NavbarContainer from "./containers/common/navbar/NavbarContainers";
import { Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { useEffect, useState } from "react";
import Write from "./pages/Write";
import Detail from "./pages/Detail";
import axios from "axios";

function App() {
  const [isLoggined, setIsLoggined] = useState(false);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      axios({
        method: "GET",
        url: 'http://localhost:3000/ssac/auth/profile',
        headers: { Authorization : accessToken},
      }).then((response) => {
          const result = response.data.data;
          console.log(result);
          setProfile(result);
          setIsLoggined(true);
      }).catch((error) => {
          console.log(error);
          setIsLoggined(false);
      });
    } else {
      setIsLoggined(false);
    }
  }, []);

  return (
    <>
      <GlobalStyles />
      <NavbarContainer 
        profile={profile} 
        isLoggined={isLoggined} 
        setIsLoggined={setIsLoggined}
      />
      <Route path="/" exact={true} component={Home} />
      <Route 
        path="/signin" 
        exact={true} 
        component={() => <SignIn setIsLoggined={setIsLoggined} />} 
      />
      <Route path="/signup" exact={true} component={SignUp} />
      <Route path="/write" exact={true} component={Write} />
      <Route path="/post/:postId" exact={true} component={Detail} />
      <Route 
        path="/post/:postId" 
        exact={true} 
        component={() => <Detail />} />
    </>
  );
}

export default App;