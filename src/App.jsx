import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import ComingSoon from "./pages/ComingSoon";
import InstallInstructions from "./pages/InstallInstructions";
import Tier1 from "./pages/Tier1";
import Level from "./pages/Level";
import DailyChallenge from "./pages/DailyChallenge";
import NextSteps from "./pages/NextSteps";
import ContactUs from "./pages/ContactUs";
import Feedback from "./pages/Feedback";
import SignUp from "./pages/SignUp";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/install" element={<InstallInstructions />} />
          <Route path="/tier1" element={<Tier1 />} />
          <Route path="/tier1/level/:levelId" element={<Level />} />
          <Route path="/daily-challenge" element={<DailyChallenge />} />
          <Route path="/next-steps" element={<NextSteps />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/soon/:feature" element={<ComingSoon />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
