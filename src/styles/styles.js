import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
:root{
  --firstColor : ${(props) => props.firstColor};
  --lastColor : ${(props) => props.lastColor};
}
  ${reset};
  body {
    -webkit-user-select: none;
    -moz-user-select: none; 
    -ms-user-select: none;
    user-select: none; // 드래그 방지
    margin: 0;
    padding: 0;
    overflow: hidden;
    height: 100vh;
    width: 100vw;
    background: -webkit-linear-gradient(
        top,
        var(--firstColor) 0%,
        var(--lastColor) 100%
    );
    /* background: -webkit-linear-gradient(
        top,
        #00C9FF 0%,
        #92FE9D 100%
    ); */
    /* background: -webkit-linear-gradient(
        top,
        #fc00ff 0%,
        #00dbde 100%
    ); */
    /* background: -webkit-linear-gradient(
        top,
        #ee9ca7 0%,
        #ffdde1 100%
    ); */
    /* background: -webkit-linear-gradient(
        top,
        #43cea2 0%,
        #185a9d 100%
    ); */
    /* background: -webkit-linear-gradient(
        top,
        #FFA17F 0%,
        #00223E 100%
    ); */
    /* background: -webkit-linear-gradient(
        top,
        #D38312 0%,
        #A83279 100%
    ); */
    /* background: -webkit-linear-gradient(
        top,
        #fdfc47 0%,
        #24FE41 100%
    ); */
    /* background: -webkit-linear-gradient(
        top,
        #83a4d4 0%,
        #b6fbff 100%
    ); */
    /* background: -webkit-linear-gradient(
        top,
        #70e1f5 0%,
        #ffd194 100%
    ); */
    /* background: -webkit-linear-gradient(
        top,
        #9D50BB 0%,
        #6E48AA 100%
    ); */
    /* background: -webkit-linear-gradient(
        top,
        #780206 0%,
        #061161 100%
    ); */
    /* background: -webkit-linear-gradient(
        top,
        #B3FFAB 0%,
        #12FFF7 100%
    ); */
    /* background: -webkit-linear-gradient(
        top,
        #e74c3c 0%,
        #000000 100%
    ); */
    /* background: -webkit-linear-gradient(
        top,
        #FF4E50 0%,
        #F9D423 100%
    ); */
    /* background: -webkit-linear-gradient(
        top,
        #04042a 0%,
        #ffffff 100%
    ); */
  }
`;

export default GlobalStyle;
