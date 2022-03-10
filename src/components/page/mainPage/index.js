import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as S from "./styles";
// import PlaneMesh from "../../lib/function/model/plane";
import { max } from "../../../lib/function/max";
import CircleMesh from "../../common/model/circle";
import FrameMesh from "../../common/model/frame";
import { ParticleGroup } from "../../common/model/particle";
import DirectionalLight from "../../common/light/directionalLight";
import AmbientLight from "../../common/light/ambientLight";
// import defaultMusic from "../../../asset/audio/Green Greens.mp3";
import { meshColor } from "../../../lib/export/data";
import { getRandomIntInclusive } from "../../../lib/function/random";

export default function MainPage() {
  const thefile = useRef();
  const audio = useRef();
  const fileLabel = useRef();
  let spectrum = false;
  const colorNumber = getRandomIntInclusive(0, meshColor.length - 1);
  let dataArray;
  let analyser;

  function hangleInputChange(e) {
    let files = e.target.files;
    audio.current.src = URL.createObjectURL(files[0]);
    audio.current.load();
    audio.current.play();
    play();
  } // audio 파일을 넣어주었을 때

  function play() {
    let context = new AudioContext();
    let src = context.createMediaElementSource(audio.current);
    analyser = context.createAnalyser();
    src.connect(analyser);
    analyser.connect(context.destination);
    analyser.fftSize = 512;
    let bufferLength = analyser.frequencyBinCount;
    dataArray = new Uint8Array(bufferLength);
    spectrum = true
  } // 음향 감지

  function FreamMeshTentativeName() {
    const frameMesh = useRef(null);
    useFrame(() => {
      frameMesh.current.rotation.y = frameMesh.current.rotation.z += 0.007; // frameMesh 애니메이션
      animation(frameMesh, 0.7);
    });
    return (
      <mesh ref={frameMesh} scale={[0.7, 0.7, 0.7]}>
        <FrameMesh />
      </mesh>
    );
  }

  function CircleMeshTentativeName() {
    const circleMesh = useRef();

    useFrame(() => {
      circleMesh.current.rotation.x += 0.002;
      circleMesh.current.rotation.y += 0.004;
      animation(circleMesh, 1);
    });
    return (
      <mesh ref={circleMesh} scale={[1, 1, 1]}>
        <CircleMesh />
      </mesh>
    );
  }

  function animation(mesh, scale) {
    if (spectrum) {
      analyser.getByteFrequencyData(dataArray);
      let lowerHalfArray = dataArray.slice(0, dataArray.length / 2 - 1);
      let lowerMax = max(lowerHalfArray);
      let lowerMaxFr = (lowerMax / lowerHalfArray.length) ** 5;

      mesh.current.scale.x = lowerMaxFr * 0.007 + scale;
      mesh.current.scale.y = lowerMaxFr * 0.007 + scale;
      mesh.current.scale.z = lowerMaxFr * 0.007 + scale;
      // 음향에 맞추어 scale 변화
    } // audio가 삽입됬을 시 if 문 실행
  }

  console.log(meshColor[colorNumber]);

  return (
    <>
      <S.MainDiv>
        <label for="thefile" ref={fileLabel}>
          <input
            id="thefile"
            type="file"
            accept="audio/*"
            ref={thefile}
            onChange={(e) => hangleInputChange(e)}
          />
          Choose an audio file
        </label>
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
          <CircleMeshTentativeName />
          <FreamMeshTentativeName />
          <DirectionalLight color="ffffff" position={[1, 0, 0]} />
          <DirectionalLight color={meshColor[colorNumber][0]} position={[0.75, 1, 0.5]} />
          <DirectionalLight color={meshColor[colorNumber][1]} position={[-0.75, -1, 0.5]} />
          <AmbientLight color={meshColor[colorNumber][2]} />
        </Canvas>
        <audio controls ref={audio}></audio>
      </S.MainDiv>
    </>
  );
}
