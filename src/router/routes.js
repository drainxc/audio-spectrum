import { BrowserRouter, Routes, Route } from "react-router-dom";
import Bar from "../components/page/bar";
import Circle from "../components/page/circle";
import Wave from "../components/page/wave";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/bar" element={<Bar />} />
        <Route path="/circle" element={<Circle />} />
        <Route path="/wave" element={<Wave />} />
      </Routes>
    </BrowserRouter>
  );
}
