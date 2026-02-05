import { useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import MazeGame from './components/maze/MazeGame';
import CodeFlowManager from './components/CodeFlowManager';

function App() {
  const [appReady, setAppReady] = useState(false);

  const handleReady = () => {
    setAppReady(true);
  };

  return (
    <>
      <HashRouter>
        <Routes>
          {/* Key forces remount after code validation so Home re-checks gameState */}
          <Route path="/" element={<Home key={appReady ? 'ready' : 'loading'} />} />
          <Route path="/maze/:theme" element={<MazeGame />} />
        </Routes>
      </HashRouter>

      {!appReady && (
        <CodeFlowManager onReady={handleReady} />
      )}
    </>
  );
}

export default App;
