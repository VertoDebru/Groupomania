import Avatar from "./Avatar";
import "../styles/AddComment.css";

export default function AddComment() {
  return (
    <form>
      <Avatar />
      <input type='text' placeholder='Ecrivez un commentaire...'></input>
    </form>
  );
}
