import MainPage from "./components/page/mainPage";
import GlobalStyle from "./styles/styles";
import { color } from "./lib/export/data";
import { getRandomIntInclusive } from "./lib/function/random";

function App() {
  const colorNumber = getRandomIntInclusive(0, color.length - 1);
  return (
    <>
      <GlobalStyle firstColor={color[colorNumber][0]} lastColor={color[colorNumber][1]} />
      <MainPage />
    </>
  );
}

export default App;
