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
    bottom: 15px;
    width: calc(100% - 20px);
  }

  #thefile {
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

  #filelabel {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 2%;
    margin-top: 2%;
    width: 300px;
    height: 75px;
    border-radius: 4px;

    /* background: #1a1a1a;
    color: #fff;
    box-shadow: 0 0px 20px #1a1a1a; */
    background: #fff;
    color: #000;
    box-shadow: 0 0px 20px #fff;
    font-size: 25px;
    font-weight: 900;
    transition: all 0.2s ease;
    border: none;
    z-index: 0;
  }

  label:hover {
    transform: translate3d(0, 10%, 0);
  }

  label:active {
    transform: translate3d(0, 20%, 0);
  }
`;

export const UrlInput = styled.div`
  width: 300px;
  margin-left: 2%;
  margin-top: 1%;
  display: flex;
  justify-content: space-between;

  input {
    width: 235px;
    height: 30px;
    outline: none;
    border: none;
    border-radius: 4px;
    padding-left: 15px;
    box-sizing: border-box;
    box-shadow: 0 0px 20px #fff;
    font-weight: bold;
  }

  button {
    width: 50px;
    height: 30px;
    border: none;
    outline: none;
    border-radius: 4px;
    background-color: white;
    box-shadow: 0 0px 20px #fff;
    font-size: 15px;
    font-weight: bold;
  }
`;
