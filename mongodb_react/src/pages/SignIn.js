import React from "react";
import FullCenterContainer from "../components/common/container/FullCenterContainer";
import SignInContainer from "../containers/auth/SignInContainer";

function SignIn({ setIsLoggined }) {
  return (
    <>
      <FullCenterContainer>
        <SignInContainer setIsLoggined={setIsLoggined} />
      </FullCenterContainer>
    </>
  );
}

export default SignIn;