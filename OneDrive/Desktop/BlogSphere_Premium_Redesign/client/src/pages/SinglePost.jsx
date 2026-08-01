import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Heart, Edit, Trash, Calendar, MessageCircle, Send, User } from '../components/Icons';
import { getInitials, avatarVariant, readingTime } from '../utils';

export default function SinglePost() {
  const { id } = useParams();

  const [post, setPost] = useState(null);

  const [comments, setComments] = useState([]);

  const [author, setAuthor] = useState('');

  const [text, setText] = useState('');

  useEffect(() => {
    fetchPost();
    fetchComments();
  }, []);

  const fetchPost = async () => {
    try {
      const response = await fetch(
        `https://blogsphere-vj2p.onrender.com/api/posts/${id}`
      );

      const data = await response.json();

      setPost(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await fetch(
        `https://blogsphere-vj2p.onrender.com/api/comments/${id}`
      );

      const data = await response.json();

      setComments(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLike = async () => {
    try {
      const response = await fetch(
        `https://blogsphere-vj2p.onrender.com/api/posts/like/${id}`,
        {
          method: 'PUT'
        }
      );

      const data = await response.json();

      alert(data.message);

      fetchPost();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `https://blogsphere-vj2p.onrender.com/api/posts/${id}`,
        {
          method: 'DELETE'
        }
      );

      const data = await response.json();

      alert(data.message);

      window.location.href = '/';
    } catch (error) {
      console.log(error);
    }
  };

  const handleComment = async () => {
    try {
      const response = await fetch(
        'https://blogsphere-vj2p.onrender.com/api/comments',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            postId: id,
            author,
            text
          })
        }
      );

      const data = await response.json();

      alert(data.message);

      setAuthor('');
      setText('');

      fetchComments();
    } catch (error) {
      console.log(error);
    }
  };

  if (!post) {
    return (
      <div className="auth-shell">
        <h2>Loading...</h2>
      </div>
    );
  }

  const formatDate = (date) =>
    new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

  return (
    <div className="single-post">
      <div className="single-post-header">
        <div className={`avatar avatar-lg ${avatarVariant(post.author)}`}>
          {getInitials(post.author)}
        </div>

        <div className="single-post-byline">
          <strong>{post.author}</strong>
          <div className="meta-row">
            <span><Calendar width={13} height={13} /> {formatDate(post.createdAt)}</span>
            <span>· {readingTime(post.content)}</span>
          </div>
        </div>
      </div>

      <h1>{post.title}</h1>

      <p>{post.content}</p>

      <div className="like-count">
        <Heart width={16} height={16} /> {post.likes || 0} Likes
      </div>

      <div className="action-row">
        <button className="btn read-btn" onClick={handleLike}>
          <Heart width={16} height={16} /> Like
        </button>

        <button
          className="btn edit-btn"
          onClick={() => {
            window.location.href = `/edit/${id}`;
          }}
        >
          <Edit width={16} height={16} /> Edit Post
        </button>

        <button className="btn delete-btn" onClick={handleDelete}>
          <Trash width={16} height={16} /> Delete Post
        </button>
      </div>

      <hr className="divider" />

      <h2 className="comments-heading">
        <MessageCircle width={20} height={20} /> Comments
      </h2>

      <div className="comment-form">
        <input
          type="text"
          placeholder="Your Name"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />

        <textarea
          rows="4"
          placeholder="Write a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button className="btn read-btn" onClick={handleComment}>
          <Send width={16} height={16} /> Add Comment
        </button>
      </div>

      {comments.map((comment) => (
        <div key={comment._id} className="comment-card">
          <div className={`avatar avatar-sm ${avatarVariant(comment.author)}`}>
            {getInitials(comment.author)}
          </div>

          <div>
            <h4>{comment.author}</h4>
            <p>{comment.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
