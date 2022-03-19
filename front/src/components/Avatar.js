import React from "react";
import axios from "axios";
import "../styles/Avatar.css";

export default class Avatar extends React.Component {
  constructor(userId) {
    super(userId);
    this.state = {
      isLoading: false
    };
    this.token = sessionStorage.getItem('token');
    this.userId = userId.userId;
    this.getUrl = 'http://localhost:8080/api/user?id='+this.userId;
    this.avatar = '';
    console.log("User ID : "+this.userId);
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    // Get Inputs
    this.getAvatar();
  }

  getAvatar() {
    axios.get(this.getUrl)
    .then((res) => { 
      this.avatar = res.data.avatar;
      this.setState({ isLoading: false });
    })
    .catch(() => {
      this.avatar = "none";
      this.setState({ isLoading: false });
    });
  }

  setAvatar() {
    if(this.avatar === 'none') {
      return <i className="fa-solid fa-user"></i>
    }
  }

  render() {
    return (
        <div className='app-avatar'>
        {this.setAvatar()}
        </div>
    )
  }
}
