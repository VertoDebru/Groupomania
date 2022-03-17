// Import components
import Header from "./Header";
import Main from "./Main";
import Login from "./Login";
import Footer from "./Footer";

/*         Token        *
  * ******************* */
function getToken() {
  const userToken = sessionStorage.getItem('token');
  return userToken;
}
/* ******************* *
 *       END Token     */

/*         Login        *
 * ******************** */
function checkLogin() {
  const token = getToken();
  if(token) {
    return (
      <div>
        <Header />
        <Main />
        <Footer />
      </div>
    )
  }
  else {
    return (
      <div>
        <Header />
        <Login />
      </div>
    )
  }
}
/* ******************* *
 *      END Login      */

export default function App() {
  return checkLogin();
}
