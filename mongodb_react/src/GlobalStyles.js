import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";


// 전역 CSS

const GlobalStyles = createGlobalStyle`
  ${reset};
  html {
    font-size: 10px;
  };

  em {
    /* font-weight: bolder;
    color: orange */
    font-style: italic;
  };

  strong{
    font-weight: bolder;
  };
`;

export default GlobalStyles;