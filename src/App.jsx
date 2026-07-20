import { Routes, Route, Navigate } from 'react-router-dom';
import './styles/globals.css';

import Home     from './pages/Home';
import PostPage from './pages/PostPage';

// AdminPanel (localStorage post manager) is retired — posts are now authored in
// the Syncy dashboard and read through /api/v1/public/blog. Kept on disk in
// components/admin/AdminPanel.jsx in case the old flow needs to come back.

export default function App() {
  return (
    <Routes>
      <Route path="/"            element={<Home />} />
      <Route path="/blog/:slug"  element={<PostPage />} />
      <Route path="*"            element={<Navigate to="/" replace />} />
    </Routes>
  );
}