import React, { useRef } from "react";

export default function PlaneMesh(props) {
  const PlaneMesh = useRef();

  return (
    <mesh
      ref={PlaneMesh}
      position={props.position}
      rotation={[-0.5 * Math.PI, 0, 0]}
    >
      <planeGeometry args={props.args} />
      <meshLambertMaterial attach="material" color="#057224" wireframe={false} />
    </mesh>
  );
}
