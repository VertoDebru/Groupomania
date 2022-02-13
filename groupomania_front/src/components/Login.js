import "../styles/Login.css";

const btnValueLogin = "Connexion";
const btnValueSign = "Inscription";

function Login() {
  return (
    <div className='app-login'>
      <div className='app-user-icon fa-solid fa-user-secret'></div>
      <form method='post' action='#' className='app-login-form'>
        <h3>Email</h3>
        <input type='text' placeholder='Ex : example@groupomania.com' required />
        <h3>Mot de passe</h3>
        <input type='password' placeholder='mot de passe' required />
        <input type='button' className='login' value={btnValueLogin} />
      </form>
      
      <div className='app-sign'>
        <h2>Vous n'êtes pas encore membre ?</h2>
        <input type='button' className='sign' value={btnValueSign} />
      </div>

    </div>
  );
}

export default Login;
