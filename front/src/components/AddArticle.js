import React from "react";
import axios from "axios";
// Import components
import Avatar from "./Avatar";

import "../styles/AddArticle.css";

export default class AddArticle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      article: '',
      fileUpload: null
    }
    this.userLogged = props.userLogged;
    // Request Url
    this.postUrl = 'http://localhost:8080/api/articles';
    // Form control
    this.OnSubmit = this.OnSubmit.bind(this);
    this.OnChange = this.OnChange.bind(this);
  }

  OnSubmit(event) {
    // Object contain value forms
    const formData = new FormData();
    formData.append("userId", this.userLogged.id);
    formData.append("article", this.state.article);
    formData.append("image", this.state.fileUpload);
    console.warn(this.state.fileUpload);

    // Post request.
    axios.post(this.postUrl, formData)
    .then((res) => { 
      console.warn(res);
      document.location.reload();
    });
    
    event.preventDefault();
  }

  // Gestion des events. ( !IDEA! )
  OnChange(event) {
    // IDEA : Add checking form on change.
    const myState = event.target.name;
    switch (myState) {
      case 'article':
        this.setState({article: event.target.value});
        break;
      case 'image':
        this.setState({fileUpload: event.target.files[0]});
        break;
      default:
        console.error('Nothing here!');
        break;
    }
  }

  render() {
    const { article, fileUpload } = this.state;
    return (
      <form onSubmit={this.OnSubmit} className='app-post-form'>
        <div>
          <Avatar dataUser={{...this.userLogged, isProfile: false}} />
          <input type='text' name="article" placeholder='Quoi de neuf ?' value={article} onChange={this.OnChange} />
          <input type='hidden' name="userId" value={this.userLogged.id} />
        </div>
        <div className="options">
          <label htmlFor="image" className="file-upload">
            {fileUpload ? fileUpload.name : (<i className="fa-solid fa-image"></i>) }
          </label>
          <input name='image' id="image" type='file' label='UploadImage' accept=".jpg,.jpeg,.png,.gif" onChange={this.OnChange} />
          <input type="submit" className="publish" label="Publier" value="Publier"></input>
        </div>
      </form>
    )
  }
}
