import Avatar from "./Avatar";
import "../styles/AddComment.css";

function AddComment() {
  return (
    <form>
      <Avatar />
      <input type='text' placeholder='Ecrivez un commentaire...'></input>
    </form>
  );
}

export default AddComment;
