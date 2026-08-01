import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Edit, User } from '../components/Icons';

export default function EditPost() {
  const { id } = useParams();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = async () => {
    try {
      const response = await fetch(
        `https://blogsphere-vj2p.onrender.com/api/posts/${id}`
      );

      const data = await response.json();

      setTitle(data.title);
      setContent(data.content);
      setAuthor(data.author);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `https://blogsphere-vj2p.onrender.com/api/posts/${id}`,
        {
          method: 'PUT',
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

      window.location.href = `/post/${id}`;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="auth-shell">
      <div className="login-container wide">
        <div className="form-icon-badge">
          <Edit width={24} height={24} />
        </div>

        <h1>Edit post</h1>
        <p className="form-subtitle">Update your post's details below.</p>

        <div className="field-group">
          <label className="field-label">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="field-group">
          <label className="field-label">Content</label>
          <textarea
            rows="8"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <div className="field-group">
          <label className="field-label"><User width={14} height={14} /> Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>

        <button className="btn" onClick={handleUpdate}>
          Save Changes
        </button>
      </div>
    </div>
  );
}
