import React, { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as S from "./styles";
// import PlaneMesh from "../../lib/function/model/plane";
import { max } from "../../../lib/function/max";
import CircleMesh from "../../common/model/circle";
import FrameMesh from "../../common/model/frame";
import { ParticleGroup } from "../../common/model/particle";
import DirectionalLight from "../../common/light/directionalLight";
import AmbientLight from "../../common/light/ambientLight";
import { meshColor } from "../../../lib/export/data";
import { setGui } from "../../../lib/function/gui";

export default function Circle() {
  const circleFile = useRef();
  const circleAudio = useRef();
  let dataArray = "";
  let analyser;

  const [data, setData] = useState(
    () =>
      JSON.parse(window.localStorage.getItem("datum")) || {
        frameScale: 0.8,
        frameRotation: 0.007,
        frameDetail: 1,
        circleScale: 1,
        circleRotation: 0.004,
        circleDetail: 1,
        particleNumber: 500,
        particleRotation: 0.002,
        dataBoolean: false,
        mainColor: meshColor[2],
      }
  );

  setGui(data, setData);

  const [load, setLoad] = useState(false);

  useEffect(() => {
    console.log(data);
    window.localStorage.setItem("datum", JSON.stringify(data));
    if (load && circleAudio.current?.src !== "") {
      window.location.reload();
    }
    setLoad(true);
  }, [data]);

  function hangleInputChange(e) {
    let files = e.target.files;
    circleAudio.current.src = URL.createObjectURL(files[0]);
    circleAudio.current.load();
    circleAudio.current.play();
    play();
  } // audio 파일을 넣어주었을 때

  function play() {
    const context = new AudioContext();
    const src = context.createMediaElementSource(circleAudio.current);
    analyser = context.createAnalyser();
    src.connect(analyser);
    analyser.connect(context.destination);
    analyser.fftSize = 512;
    const bufferLength = analyser.frequencyBinCount;
    dataArray = new Uint8Array(bufferLength);
  } // 음향 감지

  const frameMesh = useRef(null);
  function FreamMeshTentativeName() {
    useFrame(() => {
      frameMesh.current.rotation.y = frameMesh.current.rotation.z +=
        data.frameRotation; // frameMesh 애니메이션
      animation(frameMesh, data.frameScale);
    });

    return (
      <mesh
        ref={frameMesh}
        scale={[data.frameScale, data.frameScale, data.frameScale]}
        position={[0, 0, 0]}
      >
        <FrameMesh detail={data.frameDetail} />
      </mesh>
    );
  }

  function CircleMeshTentativeName() {
    const circleMesh = useRef();

    useFrame(() => {
      circleMesh.current.rotation.x += data.circleRotation;
      circleMesh.current.rotation.y += data.circleRotation;
      animation(circleMesh, data.circleScale);
    });
    return (
      <mesh
        ref={circleMesh}
        scale={[data.circleScale, data.circleScale, data.circleScale]}
        position={[0, 0, 0]}
      >
        <CircleMesh detail={data.circleDetail} />
      </mesh>
    );
  }

  function animation(mesh, scale) {
    // console.log(circleAudio.current.src);
    // console.log(dataArray)
    if (dataArray !== "") {
      analyser.getByteFrequencyData(dataArray);
      let lowerHalfArray = dataArray.slice(0, dataArray.length / 2 - 1);
      let lowerMax = max(lowerHalfArray);
      let lowerMaxFr = (lowerMax / lowerHalfArray.length) ** 5;

      mesh.current.scale.x = lowerMaxFr * 0.01 + scale;
      mesh.current.scale.y = lowerMaxFr * 0.01 + scale;
      mesh.current.scale.z = lowerMaxFr * 0.01 + scale;
      // 음향에 맞추어 scale 변화
    } // audio가 삽입됬을 시 if 문 실행
  }

  return (
    <>
      <S.MainDiv>
        <label for="thefile">Choose an audio file</label>
        <input
          id="thefile"
          type="file"
          accept="audio/*"
          ref={circleFile}
          onChange={(e) => hangleInputChange(e)}
        />
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
          <ParticleGroup
            number={data.particleNumber}
            rotation={data.particleRotation}
          />
          <CircleMeshTentativeName />
          <FreamMeshTentativeName />
          <DirectionalLight color="#ffffff" position={[1, 0, 0]} />
          <DirectionalLight color={meshColor[0]} position={[0.75, 1, 0.5]} />
          <DirectionalLight color={meshColor[1]} position={[-0.75, -1, 0.5]} />
          <AmbientLight color={data.mainColor} />
        </Canvas>
        <audio controls ref={circleAudio}></audio>
      </S.MainDiv>
    </>
  );
}
