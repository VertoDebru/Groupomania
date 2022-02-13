import Avatar from "./Avatar";
import Comments from "./Comments";
import AddComment from "./AddComment";
import "../styles/Article.css";

function Article() {
  return (
    <div>
      <article>
        <div className='header'>
          <Avatar />
          <div>
            <h2>Post Title</h2>
            <h3>Verto Debru | <i className="fa-solid fa-clock"></i> 32 min</h3>
          </div>
        </div>
        <p>Veniam ad deserunt non culpa esse nisi amet dolor proident amet cupidatat laborum...</p>
        <div className='footer'>
          <a href='true' className='like'>
            <i className='fa-solid fa-thumbs-up'></i> 2 likes
          </a>
          <a href='true'>2 comments</a>
        </div>
      </article>
      <Comments />
      <AddComment />
    </div>
  );
}

export default Article;
