import React from "react";
import axios from "axios";
// Import components
import Header from "../components/Header";
import Footer from "../components/Footer";
import Avatar from "../components/Avatar";
import LoadingBox from "../components/LoadingBox";
//import ConfirmBox from "../components/ConfirmBox";

import "../styles/routes/Profile.css";

export default class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      userLogged: {},
      valueFirstname: '',
      valueLastname: '',
      valueEmail: '',
      valuePassword: null,
      fileAvatar: null
    };
    this.token = sessionStorage.getItem('token');
    this.userId = sessionStorage.getItem('userId');
    this.userUrl = 'http://localhost:8080/api/user';
    // Form control
    this.OnSubmit = this.OnSubmit.bind(this);
    this.OnChange = this.OnChange.bind(this);
    this.logout = this.logout.bind(this);
    this.deleteAvatar = this.deleteAvatar.bind(this);
    this.delete = this.delete.bind(this);
    // Check Token
    this.checkToken = (() => this.token ? null : document.location.href = './../');
  }

  componentDidMount() {
    this.checkToken();
    this.getUserLogged();
  }

  // Récuperation de l'utilisateur connecté.
  async getUserLogged() {
    let user = await axios.get(this.userUrl+'?id='+this.userId).then((res) => {
      return res.data;
    })
    .catch((error) => { console.log(error); });

    this.setState({ userLogged: user });
    this.setState({ valueFirstname: user.firstname });
    this.setState({ valueLastname: user.lastname });
    this.setState({ valueEmail: user.email });
    this.setState({ isLoading: false });
  }

  // Gestion d'envoi.
  async OnSubmit(event) {
    // Object contain value forms
    const formData = new FormData();
    formData.append("userId", this.userId);
    formData.append("firstname", this.state.valueFirstname);
    formData.append("lastname", this.state.valueLastname);
    formData.append("email", this.state.valueEmail);
    if(this.state.valuePassword != null) formData.append("password", this.state.valuePassword);
    if(this.state.fileAvatar != null) formData.append("avatar", this.state.fileAvatar);
    console.warn(this.state.fileAvatar);

    // Put request.
    await axios.put(this.userUrl, formData)
    .then((res) => { console.warn(res); });
    
    event.preventDefault();
  }

  // Gestion des events. ( !IDEA! )
  OnChange(event) {
    // IDEA : Add checking form on change.
    const myState = event.target.name;
    switch (myState) {
      case 'firstname':
        this.setState({valueFirstname: event.target.value});
        break;
      case 'lastname':
        this.setState({valueLastname: event.target.value});
        break;
      case 'email':
        this.setState({valueEmail: event.target.value});
        break;
      case 'password':
        this.setState({valuePassword: event.target.value});
        break;
      case 'avatar':
        this.setState({fileAvatar: event.target.files[0]});
        break;
      default:
        console.error('Nothing here!');
        break;
    }
  }

  logout() {
    sessionStorage.clear();
    document.location.href = "./../";
  }
  
  async deleteAvatar() {
    console.warn('Etes vous sure ?');
    /*return ( <ConfirmBox /> );*/
    // Delete request.
    await axios.delete(this.userUrl+'/'+this.userId+'/'+1)
    .then((res) => {
      console.log(res);
      document.location.reload();
    });
  }

  async delete() {
    console.warn('Etes vous sure ?');
    /*return ( <ConfirmBox /> );*/
    // Delete request.
    await axios.delete(this.userUrl+'/'+this.userId+'/'+0)
    .then((res) => { 
      console.warn(res);
      this.logout();
    });
  }
  
  render() {
    const { isLoading, userLogged, valueFirstname, valueLastname, valueEmail, fileAvatar } = this.state;
    return (
      <div>
        <Header />
        <main>
          <div className='app-profile'>
            {!isLoading && userLogged ? <Avatar dataUser={{...userLogged, isProfile: true}} /> : <LoadingBox />}
            <form onSubmit={this.OnSubmit} className='app-profile-update-form'>
              <div>
                <input name='firstname' type='text' placeholder='Prénom' label='Prénom' value={valueFirstname} onChange={this.OnChange} required />
                <input name='lastname' type='text' placeholder='Nom' label='Nom' value={valueLastname} onChange={this.OnChange} required />
              </div>
              <input name='email' type='email' placeholder='Ex : example@groupomania.com' label='Adresse email' value={valueEmail} onChange={this.OnChange} required />
              <h2>Optionnel</h2>
                <input name='password' type='password' placeholder='Nouveau mot de passe' label='Mot de passe' onChange={this.OnChange} />
              <h3>Avatar</h3>
              <div className="app-profile-avatar">
                <label htmlFor="avatar" className="file-upload">
                <input name='avatar' id="avatar" type='file' accept=".jpg,.jpeg,.png,.gif" onChange={this.OnChange} />
                  {fileAvatar ? fileAvatar.name : (<i className="fa-solid fa-upload"></i>) }
                </label>
                <input type='button' onClick={this.deleteAvatar} label='delAvatar' value='Supprimer avatar!' />
              </div>

              <input type='submit' className='login' label='Mettre à jour' value='Mettre à jour' />
            </form>

            <div className="app-profile-options">
              <input type='button' onClick={this.logout} label='logout' value='Déconnexion' />
              <input type='button' onClick={this.delete} label='Delete' value='Supprimer le compte!' />
            </div>
          </div>
          
        </main>
        <Footer />
      </div>
    )
  }
}
