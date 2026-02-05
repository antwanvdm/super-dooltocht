import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import MazeGame from './components/maze/MazeGame';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/maze/:theme" element={<MazeGame />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
