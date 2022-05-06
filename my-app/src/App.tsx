import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { FormAuthPage } from './pages/formForLogIn/formLogin';
import { ManagementProjectsPage } from './pages/managementParogectsPage/managementProjectsPage';
import { ManagementProjectPage } from './pages/managementsProjectPage/managmentProjectPage';
import { NotFoundPage } from './pages/notFoundPage/noFoundPage';
import { WelcomePage } from './pages/welcomePage/welcomePage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/project" element={<ManagementProjectPage />} />
        <Route path="/projects" element={<ManagementProjectsPage />} />
        <Route path="/login" element={<FormAuthPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
