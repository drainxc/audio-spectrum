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
    bottom: 0;
    width: calc(100% - 20px);
  }

  input {
    position: absolute;
    z-index: 1;
    opacity: 0;
    overflow: hidden;
  }

  canvas {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
  }

  label {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 2%;
    margin-top: 2%;
    width: 300px;
    height: 75px;
    border-radius: 4px;

    background: #fff;
    color: #000;
    font-size: 25px;
    font-weight: 900;
    box-shadow: 0 0px 10px #fff;
    transition: all 0.2s ease;
    z-index: 0;
  }

  label:hover {
    transform: translate3d(0, 10%, 0);
  }

  label:active {
    transform: translate3d(0, 20%, 0);
  }
`;

export const Dat = styled.div`
  position: absolute;
  right: 0;
  top: 0;
`;
