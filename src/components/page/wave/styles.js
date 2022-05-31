import styled from "styled-components";

export const MainDiv = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;

  audio {
    position: fixed;
    left: 10px;
    bottom: -10px;
    width: calc(100% - 20px);
  }

  input {
    position: absolute;
    top: 0;
    left: 0;
    width: 300px;
    height: 75px;
    z-index: 100;
    opacity: 0;
    cursor: pointer;
  }

  label {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    border-radius: 4px;

    background-color: #fff;
    color: #000;
    font-size: 25px;
    font-weight: 900;
    box-shadow: 0 0px 10px #fff;
    transition: all 0.2s ease;
    z-index: 0;
  }
  
  div {
    position: absolute;
    top: 4%;
    left: 2%;
    width: 300px;
    height: 75px;
  }

  div:hover > label {
    transform: translate3d(0, 10%, 0);
  }

  div:active > label {
    transform: translate3d(0, 20%, 0);
  }

  canvas {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
  }
`;
