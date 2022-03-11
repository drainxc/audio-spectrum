import React from "react";

export default function CircleMesh() {
  return (
    <>
      <icosahedronBufferGeometry args={[7, 1]} />
      <meshPhongMaterial
        attach="material"
        color="white"
        flatShading={true}
        shininess={100}
      />
    </>
  ); // 구 모양 mesh 생성
}
