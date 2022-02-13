import Avatar from "./Avatar";
import "../styles/Comments.css";

function Comments() {
  return (
    <div className='app-comments'>
      <div className='comment'>
        <Avatar />
        <div className='content'>
          <span>Nicolas Dupont | <i className="fa-solid fa-clock"></i> 15 min</span>
          <p className='message'>Voici le commentaire, mais ce ne sera pas le seul.</p>
        </div>
      </div>
    </div>
  );
}

export default Comments;
