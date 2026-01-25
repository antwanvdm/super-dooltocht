import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import MazeGame from './components/maze/MazeGame';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-b from-blue-400 to-purple-500">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/maze/:theme" element={<MazeGame />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
