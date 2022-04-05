import "../styles/Header.css";

const title = 'Groupomania';

const goHome = ( () => {
  document.location.href = "./../";
})

export default function Header() {
  return (
    <header>
      <div className='logo' title={title} onClick={goHome} />
    </header>
  );
}
