import "../styles/PostFormArticle.css";
import avatar from "../assets/logo192.png";

function PostFormArticle() {
  return (
    <div className='app-post-form'>
      <div className='left'>
        <img className='avatar' src={avatar} />
      </div>
      <div className='right'>
        <input type='text' placeholder='Quoi de neuf ?' />
      </div>
    </div>
  );
}

export default PostFormArticle;
