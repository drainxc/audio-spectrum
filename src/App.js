import GlobalStyle from "./styles/styles";
import { bgColor } from "./lib/export/data";
import { getRandomIntInclusive } from "./lib/function/random";
import Router from "./router/routes";

function App() {
  const colorNumber = getRandomIntInclusive(0, bgColor.length - 1);
  return (
    <>
      <GlobalStyle
        firstColor={bgColor[colorNumber][0]}
        lastColor={bgColor[colorNumber][1]}
      />
      <Router />
    </>
  );
}

export default App;
