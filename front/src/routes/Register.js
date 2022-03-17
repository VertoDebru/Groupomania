import axios from "axios";
import "../styles/Login.css";
// Import components
import Header from "../components/Header";

const btnValueLogin = "Connexion";
const btnValueSign = "Inscription";
const reqSign = "http://localhost:8080/api/auth/sign";

/*         Token        *
  * ******************* */
function setToken(userToken) {
  sessionStorage.setItem('token', JSON.stringify(userToken));
  document.location.href = "./../";
}

function getToken() {
  const userToken = sessionStorage.getItem('token');
  return userToken;
}
/* ******************* *
 *       END Token     */

const login = ( () => {
  document.location.href = "./../";
})

const eventOnSubmit = ( () => {
  let inputEmail = document.getElementsByName("email")[0];
  let inputPassword = document.getElementsByName("password")[0];
  
  // Controle des champs formulaire.
  if(inputEmail.value.length <= 4 || inputPassword.value.length < 4 ) {
    return console.error("Input not complete!");
  }

  axios.post(reqSign, {
    email: inputEmail.value,
    password: inputPassword.value
  })
  .then( (res) => {
    console.log(res.data);
  })
  .catch( (error) => {
    console.log(error);
  });
})

export default function Register() {
  const token = getToken();
  if(token) return document.location.href = './../';
  
  return (
    <div>
      <Header />
      <main>
        <div className='app-register'>
          <div className='app-sign-icon fa-solid fa-file-signature'></div>
          <form method='post' className='app-sign-form'>
            <h3>Email</h3>
            <input name='email' type='email' placeholder='Ex : example@groupomania.com' label='Adresse email' required />
            <h3>Mot de passe</h3>
            <input name='password' type='password' placeholder='mot de passe' label='Mot de passe' required />
            <input type='button' onClick={eventOnSubmit} className='login' label={btnValueSign} value={btnValueSign} />
          </form>

          <div className='app-sign'>
            <h2>Vous êtes déjà membre ?</h2>
            <input type='button' onClick={login} className='sign' label={btnValueLogin} value={btnValueLogin} />
          </div>
        </div>
      </main>
    </div>
  );
}
