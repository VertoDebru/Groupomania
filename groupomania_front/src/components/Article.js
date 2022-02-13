import Avatar from "./Avatar";
import "../styles/Article.css";
/*import avatar from "../assets/logo192.png";*/

function Article() {
  return (
    <article>
      <div className='header'>
        {/*<img className='avatar' src={avatar} alt='avatar' />*/}
        <Avatar />
        <div>
          <h2>Post Title</h2>
          <h3>Verto Debru | <i class="fa-solid fa-clock"></i> 32 min</h3>
        </div>
      </div>
      <p>Veniam ad deserunt non culpa esse nisi amet dolor proident amet cupidatat laborum...</p>
      <a href className='like'>
        <i className='fa-solid fa-thumbs-up'></i> 2 likes
      </a>
      <a href>2 comments</a>
    </article>
  );
}

export default Article;
