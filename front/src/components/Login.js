import axios from "axios";
import "../styles/Login.css";

const btnValueLogin = "Connexion";
const btnValueSign = "Inscription";
const reqLogin = "http://localhost:8080/api/auth/login";

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

const register = ( () => {
  document.location.href = "./Register";
})

const eventOnSubmit = ( () => {
  let inputEmail = document.getElementsByName("email")[0];
  let inputPassword = document.getElementsByName("password")[0];
  
  // Controle des champs formulaire.
  if(inputEmail.value.length <= 4 || inputPassword.value.length < 4 ) {
    return console.error("Input not complete!");
  }

  // Envoie de la requête.
  axios.post(reqLogin, {
    email: inputEmail.value,
    password: inputPassword.value
  })
  .then( (res) => {
    console.log(res.data.token);
    setToken(res.data.token);
  })
  .catch( (error) => {
    console.log(error);
  });
})

export default function Login() {
  const token = getToken();
  if(token) return document.location.href = './../';

  return (
    <div className='app-login'>
      <div className='app-user-icon fa-solid fa-user-secret'></div>
      <form method='post' className='app-login-form'>
        <h3>Email</h3>
        <input name='email' type='email' placeholder='Ex : example@groupomania.com' label='Adresse email' required />
        <h3>Mot de passe</h3>
        <input name='password' type='password' placeholder='mot de passe' label='Mot de passe' required />
        <input type='button' onClick={eventOnSubmit} className='login' label='Connexion' value={btnValueLogin} />
      </form>

      <div className='app-sign'>
        <h2>Vous n'êtes pas encore membre ?</h2>
        <input type='button' onClick={register} className='sign' label='Inscription' value={btnValueSign} />
      </div>

    </div>
  );
}
