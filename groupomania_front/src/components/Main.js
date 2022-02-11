import "../styles/Main.css";
import PostFormArticle from "./PostFormArticle";
import Article from "./Article";

function Main() {
  return (
    <div className='app-main'>
      <PostFormArticle />
      <Article />
    </div>
  );
}

export default Main;
