import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Comments from './pages/Comments';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/comments" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/comments" element={<Comments />} />
      </Routes>
    </Router>
  );
}

export default App;