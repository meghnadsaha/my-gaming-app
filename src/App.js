import './App.css';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TriviaQuizGame from './games/TriviaQuizGame/TriviaQuizGame';
import Layout from './pages/Layout/Layout';
import NoPage from './pages/Layout/NoPage';
import MemoryCardGame from './games/MemoryCardGame/MemoryCardGame';
import PuzzleGame from './games/PuzzleGame/PuzzleGame';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* <Route index element={<Home />} /> */}
        <Route path="TriviaQuizGame" element={<TriviaQuizGame />} />
        <Route path="MemoryCardGame" element={<MemoryCardGame />} />
        <Route path="PuzzleGame" element={<PuzzleGame />} />

        
        <Route path="*" element={<NoPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
    </div>
  );
}

export default App;
