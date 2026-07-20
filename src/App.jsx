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
// AdminPanel (localStorage post manager) is retired — posts are now authored in
// the Syncy dashboard and read through /api/v1/public/blog. Kept on disk in
// components/admin/AdminPanel.jsx in case the old flow needs to come back.

export default function App() {
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
    </>
  );
}
