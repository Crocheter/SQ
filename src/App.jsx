import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ComingSoon from "./pages/ComingSoon";
import Tier1 from "./pages/Tier1";
import Level from "./pages/Level";
import InstallInstructions from "./pages/InstallInstructions";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/install" element={<InstallInstructions />} />
        <Route path="/soon/:feature" element={<ComingSoon />} />
        <Route path="/tier1" element={<Tier1 />} />
        <Route path="/tier1/level/:levelId" element={<Level />} />
      </Routes>
    </BrowserRouter>
  );
}
