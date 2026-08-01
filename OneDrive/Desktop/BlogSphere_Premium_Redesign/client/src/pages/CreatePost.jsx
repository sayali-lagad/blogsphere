import { useState } from 'react';
import { PenSquare, User } from '../components/Icons';

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');

  const handleCreatePost = async () => {
    try {
      const response = await fetch(
        'http://localhost:5000/api/posts',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            title,
            content,
            author
          })
        }
      );

      const data = await response.json();

      alert(data.message);

      setTitle('');
      setContent('');
      setAuthor('');
    } catch (error) {
      console.error(error);
      alert('Something went wrong');
    }
  };

  return (
    <div className="auth-shell">
      <div className="login-container wide">
        <div className="form-icon-badge">
          <PenSquare width={24} height={24} />
        </div>

        <h1>Create a post</h1>
        <p className="form-subtitle">Share something worth reading.</p>

        <div className="field-group">
          <label className="field-label">Title</label>
          <input
            type="text"
            placeholder="Post Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="field-group">
          <label className="field-label">Content</label>
          <textarea
            placeholder="Write your post..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="8"
          />
        </div>

        <div className="field-group">
          <label className="field-label"><User width={14} height={14} /> Author</label>
          <input
            type="text"
            placeholder="Author Name"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>

        <button className="btn" onClick={handleCreatePost}>
          Publish Post
        </button>
      </div>
    </div>
  );
}
