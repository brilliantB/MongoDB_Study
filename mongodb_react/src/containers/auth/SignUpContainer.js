import React, { useState } from "react";
import SignUpComponent from "../../components/auth/SignUpComponent";
import axios from "axios";

const baseURL = "http://localhost:3000";

function SignUpContainer() {
  const [userInfo, setUserInfo] = useState({
    userId: "",
    name: "",
    password: "",
  });

  const onChangeInput = (event) => {
    const { name, value } = event.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  const onSubmit = async () => {
    try {
      const result = await axios({
        url: `${baseURL}/ssac/auth/signup`,
        method: "POST",
        data: userInfo,
      });
      if (result.status === 200) {
        // data
        console.log(result.data);
        console.log("회원가입 성공");
      }
    } catch (error) {
      const errorStatus = error.response.status;
      if (errorStatus === 409) {
        alert("중복된 아이디가 존재합니다.");
      } else {
        alert("서버 에러가 발생했습니다.");
      }
    }

    // setUserInfo({
    //   userId: "",
    //   name: "",
    //   password: "",
    // });
  };

  return (
    <SignUpComponent
      userInfo={userInfo}
      onChangeInput={onChangeInput}
      onSubmit={onSubmit}
    />
  );
}

export default SignUpContainer;