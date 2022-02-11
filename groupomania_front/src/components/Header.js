import "../styles/Header.css";

const title = 'Groupomania';

function Header() {
  return (
    <div className='app-header'>
      <div className='logo' title={title}></div>
    </div>
  );
}

export default Header;
