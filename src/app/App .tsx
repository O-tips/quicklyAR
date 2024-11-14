// App.tsx
'use client';

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Page from './page';  // page.tsx をインポート
import Event from './Event';  // Event.tsx をインポート

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Page />} />  {/* Page.tsx をルートに表示 */}
        <Route path="/event" element={<Event />} />  {/* Event.tsx を "/event" パスに表示 */}
      </Routes>
    </Router>
  );
};

export default App;
