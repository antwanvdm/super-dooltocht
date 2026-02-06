import { useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import MazeGame from './components/maze/MazeGame';
import CodeFlowManager from './components/CodeFlowManager';

// Lightweight background shown while CodeFlowManager is active – no modal logic
function HomeBackground() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center py-12 px-4">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-300/30 rounded-full blur-2xl animate-pulse" />
        <div className="absolute top-40 right-20 w-40 h-40 bg-cyan-300/30 rounded-full blur-2xl animate-pulse delay-700" />
        <div className="absolute bottom-32 left-1/4 w-36 h-36 bg-pink-300/30 rounded-full blur-2xl animate-pulse delay-300" />
        <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-green-300/30 rounded-full blur-2xl animate-pulse delay-500" />
      </div>
    </div>
  );
}

function App() {
  const [appReady, setAppReady] = useState(false);

  const handleReady = () => {
    setAppReady(true);
  };

  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/" element={appReady ? <Home /> : <HomeBackground />} />
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
