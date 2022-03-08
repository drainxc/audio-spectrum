import React from "react";

export default function FrameMesh() {
  return (
    <>
      <icosahedronGeometry args={[15, 1]} />
      <meshLambertMaterial attach="material" color="#ffffff" wireframe={true} />
    </>
  ); // frameMesh 생성
}
