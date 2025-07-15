// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GlobalNavigation from './components/GlobalNavigation';  // Import global navigation bar
import Dashboard from './components/Dashboard';  
import PlanningModule from './components/PlanningModule';
import AssetsModule from './components/AssetsModule';
import DevelopmentModule from './components/DevelopmentModule';
import Settings from './components/Settings';
import FloatingAIAssistant from './components/common/FloatingAIAssistant';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Global navigation bar rendered once */}
        <GlobalNavigation />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/planning" element={<PlanningModule />} />
          <Route path="/assets" element={<AssetsModule />} />
          <Route path="/development" element={<DevelopmentModule />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
        <FloatingAIAssistant />
      </div>
    </Router>
  );
}

export default App;
