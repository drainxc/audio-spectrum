import MainPage from "./components/page/mainPage";
import GlobalStyle from "./styles/styles";
import { bgColor } from "./lib/export/data";
import { getRandomIntInclusive } from "./lib/function/random";

function App() {
  const colorNumber = getRandomIntInclusive(0, bgColor.length - 1);
  return (
    <>
      <GlobalStyle firstColor={bgColor[colorNumber][0]} lastColor={bgColor[colorNumber][1]} />
      <MainPage />
    </>
  );
}

export default App;
