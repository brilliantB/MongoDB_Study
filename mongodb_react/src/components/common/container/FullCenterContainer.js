import React from "react";
import styled from "styled-components";

const ContainerWrap = styled.div`
  width: 100%;
  height: calc(100vh - 6rem); // 브라우저의 높이 - 60px
  padding-top: 6rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function FullCenterContainer({ children }) {
  return (
    <>
      <ContainerWrap>{children}</ContainerWrap>
    </>
  );
}

export default FullCenterContainer;