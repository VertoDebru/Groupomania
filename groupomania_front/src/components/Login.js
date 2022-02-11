import "../styles/Login.css";

function Login() {
  return (
    <div className='app-login'>
      <div className='app-user-icon fa-solid fa-user-secret'></div>
      <form method='post' action='#' className='app-login-form'>
        <input type='text' placeholder='Username' required />
        <input type='password' placeholder='Password' required />
        <input type='button' value='Log me' />
        <a href='#'>Sign in</a>
      </form>
    </div>
  );
}

export default Login;
