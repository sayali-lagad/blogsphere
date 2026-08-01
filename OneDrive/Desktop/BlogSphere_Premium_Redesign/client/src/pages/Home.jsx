import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  PenSquare,
  MessageCircle,
  Heart,
  Calendar,
  User,
  ArrowRight,
} from '../components/Icons';
import { getInitials, avatarVariant, readingTime } from '../utils';

export default function Home() {
  const [posts, setPosts] = useState([]);

  const [stats, setStats] = useState({
    totalPosts: 0,
    totalLikes: 0
  });

  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchPosts();
    fetchStats();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch(
        'http://localhost:5000/api/posts'
      );

      const data = await response.json();

      setPosts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch(
        'http://localhost:5000/api/posts/stats'
      );

      const data = await response.json();

      setStats(data);
    } catch (error) {
      console.log(error);
    }
  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="home-container">
      <div className="search-box">
        <div className="search-wrap">
          <Search />
          <input
            type="text"
            placeholder="Search posts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="hero">
        <span className="hero-eyebrow">Full stack blogging platform</span>

        <h1>Welcome to BlogSphere</h1>

        <p>
          Share your ideas, stories, experiences and knowledge with readers
          around the world.
        </p>

        <div className="hero-badges">
          <span><PenSquare width={16} height={16} /> Create Posts</span>
          <span><MessageCircle width={16} height={16} /> Add Comments</span>
          <span><Heart width={16} height={16} /> Like Content</span>
        </div>
      </div>

      <div className="stats-card">
        <h2>Platform Statistics</h2>

        <div className="stats-grid">
          <div className="stat-box">
            <div className="stat-icon"><PenSquare /></div>
            <span>{stats.totalPosts}</span>
            <h3>Posts</h3>
          </div>

          <div className="stat-box">
            <div className="stat-icon"><Heart /></div>
            <span>{stats.totalLikes}</span>
            <h3>Likes</h3>
          </div>
        </div>
      </div>

      {posts.length > 0 && (
        <>
          <p className="section-label">Featured</p>

          <Link to={`/post/${posts[0]._id}`} style={{ textDecoration: 'none' }}>
            <div className="hero-post">
              <div className="hero-post-badge">⭐ Featured Article</div>

              <h2>{posts[0].title}</h2>

              <p>{posts[0].content.substring(0, 180)}...</p>

              <div className="hero-post-meta">
                <div className={`avatar avatar-sm ${avatarVariant(posts[0].author)}`}>
                  {getInitials(posts[0].author)}
                </div>
                <span>{posts[0].author}</span>
              </div>
            </div>
          </Link>
        </>
      )}

      {posts.length > 0 && <p className="section-label">All posts</p>}

      {posts.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon"><PenSquare width={32} height={32} /></div>
          <h2>No posts yet</h2>
          <p>Create your first blog post to get things started.</p>
        </div>
      ) : (
        <div className="posts-grid">
          {filteredPosts.map((post) => (
            <div key={post._id} className="post-card">
              <div className="post-card-top" />

              <h2>{post.title}</h2>

              <p>{post.content.substring(0, 100)}...</p>

              <Link to={`/post/${post._id}`}>
                <button className="btn read-btn">
                  Read More
                  <ArrowRight width={16} height={16} />
                </button>
              </Link>

              <div className="post-meta">
                <div className={`avatar avatar-sm ${avatarVariant(post.author)}`}>
                  {getInitials(post.author)}
                </div>
                <div className="post-meta-text">
                  <strong>{post.author}</strong>
                  <span>
                    <Calendar width={12} height={12} />
                    {formatDate(post.createdAt)} · {readingTime(post.content)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
