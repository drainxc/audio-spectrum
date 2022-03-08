import { useFrame } from "@react-three/fiber";
import React, { useRef } from "react";

export default function CircleMesh() {
  const circleMesh = useRef();

  useFrame(() => {
    circleMesh.current.rotation.x += 0.002;
    circleMesh.current.rotation.y += 0.004;
  }); // circleMesh 애니메이션

  return (
    <mesh ref={circleMesh} scale={[1, 1, 1]}>
      <icosahedronBufferGeometry args={[7, 1]} />
      <meshPhongMaterial
        attach="material"
        color="white"
        flatShading={true}
        shininess={100}
      />
    </mesh>
  ); // 구 모양 mesh 생성
}
