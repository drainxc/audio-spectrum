import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as S from "./styles";
// import PlaneMesh from "../../lib/function/model/plane";
import AmbientLight from "../../../lib/function/light/ambientLight";
import DirectionalLight from "../../../lib/function/light/directionalLight";

import { max } from "../../../lib/function/max";
import CircleMesh from "../../common/model/circle";
import FrameMesh from "../../common/model/frame";
import { ParticleGroup } from "../../common/model/particle";

export default function MainPage() {
  const thefile = useRef();
  const audio = useRef();
  const fileLabel = useRef();
  let spectrum = false;

  function hangleInputChange(e) {
    let files = e.target.files;
    audio.current.src = URL.createObjectURL(files[0]);
    audio.current.load();
    audio.current.play();
    play();
  } // audio 파일을 넣어주었을 때

  let dataArray;
  let analyser;

  function play() {
    let context = new AudioContext();
    let src = context.createMediaElementSource(audio.current);
    analyser = context.createAnalyser();
    src.connect(analyser);
    analyser.connect(context.destination);
    analyser.fftSize = 512;
    let bufferLength = analyser.frequencyBinCount;
    dataArray = new Uint8Array(bufferLength);
    spectrum = true;
  } // 음향 감지

  function FreamMeshTentativeName() {
    const frameMesh = useRef(null);
    useFrame(() => {
      frameMesh.current.rotation.y = frameMesh.current.rotation.z += 0.007; // frameMesh 애니메이션
      if (spectrum) {
        analyser.getByteFrequencyData(dataArray);
        let lowerHalfArray = dataArray.slice(0, dataArray.length / 2 - 1);
        let lowerMax = max(lowerHalfArray);
        let lowerMaxFr = (lowerMax / lowerHalfArray.length) ** 5;

        frameMesh.current.scale.x = lowerMaxFr * 0.003 + 0.7;
        frameMesh.current.scale.y = lowerMaxFr * 0.003 + 0.7;
        frameMesh.current.scale.z = lowerMaxFr * 0.003 + 0.7;
        // 음향에 맞추어 scale 변화
      } // audio가 삽입됬을 시 if 문 실행
    });
    return (
      <mesh ref={frameMesh} scale={[0.7, 0.7, 0.7]}>
        <FrameMesh />
      </mesh>
    );
  }

  return (
    <>
      <S.MainDiv>
        <label for="thefile" ref={fileLabel}>
          Choose an audio file
          <input
            type="file"
            accept="audio/*"
            ref={thefile}
            onChange={(e) => hangleInputChange(e)}
          />
        </label>
        <audio controls ref={audio}></audio>

        <Canvas
          linear
          flat
          camera={{
            fov: 45,
            aspect: window.innerWidth / window.innerHeight,
            near: 0.1,
            far: 1000,
            position: [0, 5, 50],
          }}
        >
          <ParticleGroup />
          <CircleMesh />
          <FreamMeshTentativeName />
          <DirectionalLight color="#ffdb62" position={[1, 0, 0]} />
          <DirectionalLight color="#f8f0d7" position={[0.75, 1, 0.5]} />
          <DirectionalLight color="#6a3c00" position={[-0.75, -1, 0.5]} />
          <AmbientLight />
        </Canvas>
      </S.MainDiv>
    </>
  );
}
