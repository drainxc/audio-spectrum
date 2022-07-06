import React from "react";

export default function FrameMesh(props) {
  return (
    <>
      <icosahedronGeometry args={[15, props.detail]} />
      <meshLambertMaterial attach="material" color="#ffffff" wireframe={true} />
    </>
  ); // frameMesh 생성
}
