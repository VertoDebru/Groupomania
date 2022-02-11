import "../styles/Article.css";
import avatar from "../assets/logo192.png";

function Article() {
  return (
    <article>
      <img className='avatar' src={avatar} />
      <h2>Post Title</h2>
      <h3>Verto Debru | 32 min</h3>
      <p>Veniam ad deserunt non culpa esse nisi amet dolor proident amet cupidatat laborum...</p>
    </article>
  );
}

export default Article;
