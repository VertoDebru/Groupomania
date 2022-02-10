import "../styles/Header.css";

function Header() {
  const title = 'Groupomania';
  return (
    <div className='app-header'>
      <i className='fas fa-star'></i>
      <h1>{title}</h1>
    </div>
  );
}

export default Header;
