import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import MazeGame from './components/maze/MazeGame';

function App() {
  return (
    <HashRouter>
      <div className="min-h-screen bg-gradient-to-b from-blue-400 to-purple-500">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/maze/:theme" element={<MazeGame />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
