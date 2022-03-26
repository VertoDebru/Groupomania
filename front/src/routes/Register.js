import React from "react";
import axios from "axios";
import "../styles/Login.css";
// Import components
import Header from "../components/Header";


export default class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false
    };
    this.token = sessionStorage.getItem('token');
    this.signUrl = 'http://localhost:8080/api/auth/sign';
    // Inputs
    this.email = null;
    this.password = null;
    // OnClick
    this.postSign = this.postSign.bind(this);
    // Check Token
    this.checkToken = (() => this.token ? document.location.href = './../' : null);
  }

  componentDidMount() {
    this.checkToken();
    // Get Inputs
    this.firstname = document.getElementsByName("firstname")[0];
    this.lastname = document.getElementsByName("lastname")[0];
    this.email = document.getElementsByName("email")[0];
    this.password = document.getElementsByName("password")[0];
  }

  postSign() {
    // Check inputs.
    if(this.firstname.value.length < 4 || this.lastname.value.length < 4 || this.email.value.length <= 4 || this.password.value.length < 4 ) {
      return console.error("Input not complete!");
    }

    this.setState({ isLoading: true });
    // Post request.
    axios.post(this.signUrl, {
      firstname: this.firstname.value,
      lastname: this.lastname.value,
      email: this.email.value,
      password: this.password.value
    })
    .then((res) => { 
      this.setToken(res.data.token);
      this.setState({ isLoading: false });
    })
    .catch((err) => {
      console.log(err);
      this.setState({ isLoading: false });
    });
  }

  login() {
    document.location.href = "./../";
  }

  setToken(userToken) {
    sessionStorage.setItem('token', JSON.stringify(userToken));
    document.location.href = "./../";
  }

  render() {
    return (
      <div>
        <Header />
        <main>
          <div className='app-register'>
            <div className='app-sign-icon fa-solid fa-file-signature'></div>
            <form method='post' className='app-sign-form'>
              <h3>Prénom</h3>
              <input name='firstname' type='text' placeholder='Prénom' label='Prénom' required />
              <h3>Nom</h3>
              <input name='lastname' type='text' placeholder='Nom' label='Nom' required />
              <h3>Email</h3>
              <input name='email' type='email' placeholder='Ex : example@groupomania.com' label='Adresse email' required />
              <h3>Mot de passe</h3>
              <input name='password' type='password' placeholder='mot de passe' label='Mot de passe' required />
              <input type='button' onClick={this.postSign} disabled={this.state.isLoading} className='login' label='Inscription' value='Inscription' />
            </form>
  
            <div className='app-sign'>
              <h2>Vous êtes déjà membre ?</h2>
              <input type='button' onClick={this.login} disabled={this.state.isLoading} className='sign' label='Connexion' value='Connexion' />
            </div>
          </div>
        </main>
      </div>
    )
  }
}
