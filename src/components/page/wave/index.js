import { useEffect, useRef, useState } from "react";
import * as S from "./styles";

if (1 > 5) {
  console.log("asd");
}

export default function Wave() {
  const waveCanvas = useRef();

  const waveFile = useRef();
  const waveAudio = useRef();
  let dataArray = Array.from({ length: 2048 }, (t, i) => {
    return i;
  });
  let analyser;
  let bufferLength;
  let spectrum;

  const width = window.innerWidth;
  const height = window.innerHeight;

  function hangleInputChange(e) {
    let files = e.target.files;
    console.log(files[0]);
    waveAudio.current.src = URL.createObjectURL(files[0]);
    waveAudio.current.load();
    waveAudio.current.play();
    play();
  } // audio 파일을 넣어주었을 때

  function play() {
    let context = new AudioContext();
    let src = context.createMediaElementSource(waveAudio.current);
    analyser = context.createAnalyser();
    src.connect(analyser);
    analyser.connect(context.destination);
    analyser.fftSize = 4096;
    bufferLength = analyser.frequencyBinCount;
    dataArray = new Uint8Array(bufferLength);
    spectrum = true;
  } // 음향 감지

  useEffect(() => {
    const canvas = waveCanvas.current;
    const ctx = canvas?.getContext("2d");

    canvas.width = width;
    canvas.height = height;

    let increment = 0;

    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.width);

    function animate() {
      window.requestAnimationFrame(animate);
      console.log(dataArray);

      if (spectrum) {
        analyser.getByteFrequencyData(dataArray);
        ctx.fillStyle = "rgba(0,0,0,0.2)";
        ctx.fillRect(0, 0, canvas.width, canvas.width);
        ctx.beginPath();
        ctx.moveTo(0, canvas.height / 2);
        for (let i = 0; i < canvas.width; i += 1) {
          ctx.lineTo(
            i,
            canvas.height / 2 +
              Math.sin(i * 0.007 + increment) *
                (dataArray[i/ 5] * 1.5) *
                Math.sin(increment)
          );
        }
        ctx.strokeStyle = `hsl(60,50%,50%)`;
        ctx.lineWidth = 5; 
        ctx.stroke();

        increment += 0.02;
      }
    }

    animate();
  });

  return (
    <S.MainDiv>
      <div>
        <label>Choose an audio file</label>
        <input
          type="file"
          accept="audio/*"
          ref={waveFile}
          onChange={(e) => hangleInputChange(e)}
        />
      </div>
      <canvas ref={waveCanvas}></canvas>
      <audio controls ref={waveAudio}></audio>
    </S.MainDiv>
  );
}
