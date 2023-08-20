import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

// pages
import { Landing } from "./components/pages/Landing";
import { NotFound } from "./components/pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
