export default function AmbientLight(props) {
  
  function animate() {
    window.requestAnimationFrame(animate);
  }

  animate();
  return <ambientLight intensity={props.intensity} color={props.color} />;
} //환경광 생성
