import React from "react";

import "../styles/Footer.css";

export default class Footer extends React.Component {
  constructor() {
    super();
    this.page = null;
  }

  setFooter() {
    this.page = window.location.pathname;
    if(this.page === '/Profile') {
      return (
        <ul>
          <a href='./'><li><i className="fa-solid fa-newspaper"></i></li></a>
          <li className='active'><i className="fa-solid fa-user"></i></li>
        </ul>
      );
    }

    //<li><i className="fa-solid fa-square-plus"></i></li>

    return (
      <ul>
        <li className='active'><i className="fa-solid fa-newspaper"></i></li>
        <a href='./Profile'><li><i className="fa-solid fa-user"></i></li></a>
      </ul>
    );
  }

  render() {
    return (
      <nav className='app-footer'>
        {this.setFooter()}
      </nav>
    )
  }
}
