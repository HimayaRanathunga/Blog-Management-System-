import { useState } from 'react';
import './styles/globals.css';

import Navbar     from './components/layout/Navbar';
import Footer     from './components/layout/Footer';
import Hero       from './components/sections/Hero';
import Blog       from './components/sections/Blog';
import About      from './components/sections/About';
import BlogPosts  from './components/sections/BlogPosts';
import Books      from './components/sections/Books';
import Podcast    from './components/sections/Podcast';
import Newsletter from './components/sections/Newsletter';
import CV         from './components/sections/CV';
import Contact    from './components/sections/Contact';
import AdminPanel from './components/admin/AdminPanel';

export default function App() {
  const [adminOpen, setAdminOpen] = useState(false);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Blog />
        <BlogPosts />
        <Books />
        <Podcast />
        <Newsletter />
        <CV />
        <Contact />
      </main>
      <Footer />
      <AdminPanel open={adminOpen} onClose={() => setAdminOpen(false)} />
    </>
  );
}
