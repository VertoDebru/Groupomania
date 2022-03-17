import "../styles/Header.css";

const title = 'Groupomania';

/*         Token        *
  * ******************* */
function deleteToken() {
  sessionStorage.clear();
}
/* ******************* *
 *       END Token     */

const goHome = ( () => {
  deleteToken();
  document.location.href = "./../";
})

export default function Header() {
  return (
    <header>
      <div className='logo' title={title} onClick={goHome} />
    </header>
  );
}
