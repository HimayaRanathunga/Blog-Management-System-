import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Navbar     from '../components/layout/Navbar';
import Footer     from '../components/layout/Footer';
import Hero       from '../components/sections/Hero';
import Blog       from '../components/sections/Blog';
import About      from '../components/sections/About';
import BlogPosts  from '../components/sections/BlogPosts';
import Books      from '../components/sections/Books';
import Podcast    from '../components/sections/Podcast';
import Newsletter from '../components/sections/Newsletter';
import CV         from '../components/sections/CV';
import Contact    from '../components/sections/Contact';

export default function Home() {
  const { hash } = useLocation();

  /* Arriving from a client-side link like "/#posts" only sets the hash — the
     browser won't scroll for us, so do it once the sections are mounted. */
  useEffect(() => {
    if (!hash) return;
    document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' });
  }, [hash]);

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