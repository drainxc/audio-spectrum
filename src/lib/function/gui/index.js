import { GUI } from "dat.gui";

export function setGui(data, setData) {
  class MyData {
    constructor() {
      this.frameScale = data.frameScale;
      this.frameRotation = data.frameRotation;
      this.frameDetail = data.frameDetail;
      this.circleScale = data.circleScale;
      this.circleRotation = data.circleRotation;
      this.circleDetail = data.circleDetail;
      this.dataBoolean = data.dataBoolean;
      this.mainColor = data.mainColor;
      this.particleNumber = data.particleNumber;
      this.particleRotation = data.particleRotation;
    }
  }
  const myData = new MyData();

  const gui = new GUI();

  gui
    .add(myData, "frameScale", data.circleScale, 1.5)
    .step(0.1)
    .onFinishChange(function(value) {
      setGuiData(value, "frameScale");
    });
  gui
    .add(myData, "frameRotation", 0, 0.03)
    .step(0.001)
    .onFinishChange(function(value) {
      setGuiData(value, "frameRotation");
    });
  gui
    .add(myData, "frameDetail", 0, 5)
    .step(1)
    .onFinishChange(function(value) {
      setGuiData(value, "frameDetail");
    });
  gui
    .add(myData, "circleScale", 0.1, 2)
    .step(0.1)
    .onFinishChange(function(value) {
      setGuiData(value, "circleScale");
    });
  gui
    .add(myData, "circleRotation", 0, 0.03)
    .step(0.001)
    .onFinishChange(function(value) {
      setGuiData(value, "circleRotation");
    });
  gui
    .add(myData, "circleDetail", 0, 5)
    .step(1)
    .onFinishChange(function(value) {
      setGuiData(value, "circleDetail");
    });
  gui
    .add(myData, "particleNumber", 0, 1000)
    .step(1)
    .onFinishChange(function(value) {
      setGuiData(value, "particleNumber");
    });
  gui
    .add(myData, "particleRotation", 0, 0.01)
    .step(0.01)
    .onFinishChange(function(value) {
      setGuiData(value, "particleRotation");
    });
  gui.add(myData, "dataBoolean").onChange(function(value) {
    setGuiData(value, "dataBoolean");
  });
  gui.addColor(myData, "mainColor").onFinishChange(function(value) {
    setGuiData(value, "mainColor");
  });
  const setGuiData = (value, str) => {
    setData({ ...data, [str]: value });
  };
}
