import React from "react";
import axios from "axios";
import "../styles/Login.css";

export default class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false
    };
    this.token = sessionStorage.getItem('token');
    this.authUrl = 'http://localhost:8080/api/auth/login';
    // Inputs
    this.email = null;
    this.password = null;
    // OnClick
    this.postLogin = this.postLogin.bind(this);
  }

  componentDidMount() {
    // Get Inputs
    this.email = document.getElementsByName("email")[0];
    this.password = document.getElementsByName("password")[0];
  }

  postLogin() {
    // Check inputs.
    if(this.email.value.length <= 4 || this.password.value.length < 4 ) {
      return console.error("Input not complete!");
    }

    this.setState({ isLoading: true });
    // Post request.
    axios.post(this.authUrl, {
      email: this.email.value,
      password: this.password.value
    })
    .then((res) => {
      this.setToken(res.data.token, res.data.userId);
      this.setState({ isLoading: false });
    })
    .catch((err) => {
      console.log(err);
      this.setState({ isLoading: false });
    });
  }

  register() {
    document.location.href = "./Register";
  }

  setToken(userToken, userId) {
    sessionStorage.setItem('token', JSON.stringify(userToken));
    sessionStorage.setItem('userId', JSON.stringify(userId));
    document.location.href = "./../";
  }

  render() {
    return (
      <div className='app-login'>
        <div className='app-user-icon fa-solid fa-user-secret'></div>
        <form method='post' className='app-login-form'>
          <h3>Email</h3>
          <input name='email' type='email' placeholder='Ex : example@groupomania.com' label='Adresse email' required />
          <h3>Mot de passe</h3>
          <input name='password' type='password' placeholder='mot de passe' label='Mot de passe' required />
          <input type='button' onClick={this.postLogin} disabled={this.state.isLoading} className='login' label='Connexion' value='Connexion' />
        </form>
  
        <div className='app-sign'>
          <h2>Vous n'êtes pas encore membre ?</h2>
          <input type='button' onClick={this.register} disabled={this.state.isLoading} className='sign' label='Inscription' value='Inscription' />
        </div>
  
      </div>
    )
  }
}
