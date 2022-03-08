import { useFrame } from "@react-three/fiber";
import React, { useRef } from "react";

export default function FrameMesh() {
  return (
    <>
      <icosahedronGeometry args={[15, 1]} />
      <meshLambertMaterial attach="material" color="#ffffff" wireframe={true} />
    </>
  );
}
