export default function DirectionalLight(props) {
  return (
    <>
      <directionalLight
        intensity={1}
        color={props.color}
        position={props.position}
      />
    </> // 방향 조명 생성
  );
}
