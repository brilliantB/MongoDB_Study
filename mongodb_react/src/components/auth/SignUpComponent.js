import React from "react";
import styled from "styled-components";
import BorderBox from "../common/box/BorderBox";
import InputTitle from "../common/text/InputTitle";
import InputLable from "../common/text/InputLable";
import RoundedInput from "../common/input/RoundedInput";
import RoundedButton from "../common/button/RoundedButton";

const FormWrap = styled.div`
  margin-top: 2rem;
`;

const InputWrap = styled.div`
  & + & {
    margin-top: 3rem;
  }
`;

const StyledRoundedButton = styled(RoundedButton)`
  background: green;
`;

function SignUpComponent({ onChangeInput, userInfo, onSubmit }) {
  const { userId, name, password } = userInfo;

  return (
    <BorderBox>
      <InputTitle>회원가입</InputTitle>
      <FormWrap>
        <InputWrap>
          <InputLable>유저 아이디</InputLable>
          <RoundedInput name="userId" value={userId} onChange={onChangeInput} />
        </InputWrap>
        <InputWrap>
          <InputLable>이름</InputLable>
          <RoundedInput name="name" value={name} onChange={onChangeInput} />
        </InputWrap>
        <InputWrap>
          <InputLable>비밀 번호</InputLable>
          <RoundedInput
            type="password"
            name="password"
            value={password}
            onChange={onChangeInput}
          />
        </InputWrap>
        <StyledRoundedButton onClick={onSubmit}>회원가입</StyledRoundedButton>
      </FormWrap>
    </BorderBox>
  );
}

export default SignUpComponent;