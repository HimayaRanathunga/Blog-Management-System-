const KEY = 'admin_blog_posts';

export const getAdminPosts = () => {
  try { return JSON.parse(localStorage.getItem(KEY) || '[]'); }
  catch { return []; }
};

export const saveAdminPost = (data) => {
  const posts = getAdminPosts();
  const post = {
    id: Date.now(),
    title: data.title,
    image: data.image || '',
    description: data.description,
    tags: (data.tags || '')
      .split(',')
      .map(t => t.trim())
      .filter(Boolean),
    socialLinks: (data.socialLinks || []).filter(s => s.url.trim()),
    date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
  };
  posts.unshift(post);
  localStorage.setItem(KEY, JSON.stringify(posts));
  window.dispatchEvent(new CustomEvent('adminPostsUpdated'));
};

export const deleteAdminPost = (id) => {
  const posts = getAdminPosts().filter(p => p.id !== id);
  localStorage.setItem(KEY, JSON.stringify(posts));
  window.dispatchEvent(new CustomEvent('adminPostsUpdated'));
};
