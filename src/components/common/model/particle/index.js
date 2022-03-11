import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { getRandomIntInclusive } from "../../../../lib/function/random";

export function ParticleGroup() {
  const particleMesh = useRef(null);
  useFrame(() => {
    particleMesh.current.rotation.z = particleMesh.current.rotation.y += 0.002;
  }); // 모든 파티클의 애니메이션
  return <group ref={particleMesh}>{Particles()}</group>; // 파티클을 그룹으로 만들어 생성
}

function Particles() {
  let result = [];
  for (let i = 0; i < 1000; i++) {
    result.push(<Fregment />);
  } // 125개의 fregent를 배열에 삽입
  return result;
}

function Fregment() {
  let scale = getRandomIntInclusive(5, 20) / 300; // 파티클 크기 랜덤
  return (
    <mesh
      position={[
        getRandomIntInclusive(-30, 30),
        getRandomIntInclusive(-30, 30),
        getRandomIntInclusive(-30, 30),
      ]} // 파티클 위치 랜덤
      scale={[scale, scale, scale]}
    >
      <tetrahedronGeometry args={[2, 0]} />
      <meshPhongMaterial attach="material" color="white" />
    </mesh>
  ); // 파티클 하나 생성
}
