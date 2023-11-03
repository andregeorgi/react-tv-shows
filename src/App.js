import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./views/homepage/Homepage";
import SeasonsPage from "./views/seasons/SeasonPage";
import EpisodesPage from "./views/episodes/EpisodesPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Homepage />} />
        <Route path="/seasons/:showId" element={<SeasonsPage />} />
        <Route path="/episodes/:seasonId" element={<EpisodesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
