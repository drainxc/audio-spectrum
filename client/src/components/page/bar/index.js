import { useEffect, useRef } from "react";
import * as S from "./styles";

export default function Bar() {
  const barFile = useRef();
  const barAudio = useRef();
  const barCanvas = useRef();
  let dataArray;
  let analyser;
  let bufferLength;
  let spectrum;

  function hangleInputChange(e) {
    let files = e.target.files;
    console.log(files[0]);
    barAudio.current.src = URL.createObjectURL(files[0]);
    barAudio.current.load();
    barAudio.current.play();
    play();
  } // audio 파일을 넣어주었을 때

  function play() {
    let context = new AudioContext();
    let src = context.createMediaElementSource(barAudio.current);
    analyser = context.createAnalyser();
    src.connect(analyser);
    analyser.connect(context.destination);
    analyser.fftSize = 512;
    bufferLength = analyser.frequencyBinCount;
    dataArray = new Uint8Array(bufferLength);
    spectrum = true;
  } // 음향 감지

  useEffect(() => {
    const canvas = barCanvas.current;
    const ctx = canvas?.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    function animate() {
      window.requestAnimationFrame(animate);
      const barWidth = (canvas.width / bufferLength) * 7;
      let barHeight;
      let x = 0;

      if (spectrum) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        analyser.getByteFrequencyData(dataArray);

        for (var i = 0; i < bufferLength; i++) {
          barHeight = dataArray[i] * 0.5;

          var r = barHeight + 25;
          var g = 255;
          var b = 3;

          ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
          ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);

          x += barWidth + 1;
        }
      }
    }
    animate();
  }, []);

  return (
    <S.MainDiv>
      <div>
        <label>Choose an audio file</label>
        <input
          type="file"
          accept="audio/*"
          ref={barFile}
          onChange={(e) => hangleInputChange(e)}
        />
      </div>
      <canvas ref={barCanvas}></canvas>
      <audio controls ref={barAudio}></audio>
    </S.MainDiv>
  );
}
