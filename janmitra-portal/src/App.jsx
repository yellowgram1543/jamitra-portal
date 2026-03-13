import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import CertificateApplication from "./pages/CertificateApplication";
import SchemeRecommender from "./pages/SchemeRecommender";
import TrackApplication from "./pages/TrackApplication";
import ReportCorruption from "./pages/ReportCorruption";
import MyDocuments from "./pages/MyDocuments";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/certificates" element={<CertificateApplication />} />
        <Route path="/schemes" element={<SchemeRecommender />} />
        <Route path="/track" element={<TrackApplication />} />
        <Route path="/report" element={<ReportCorruption />} />
        <Route path="/documents" element={<MyDocuments />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;