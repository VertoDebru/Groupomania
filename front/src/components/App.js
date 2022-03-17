import React from "react";
// Import components
import Header from "./Header";
import Main from "./Main";
import Login from "./Login";
import Footer from "./Footer";

export default class App extends React.Component {
  constructor() {
    super();
    this.token = sessionStorage.getItem('token');
  }

  setApp() {
    if(this.token) {
      return (
        <div>
          <Header />
          <Main />
          <Footer />
        </div>
      )
    }
    else {
      return (
        <div>
          <Header />
          <Login />
        </div>
      )
    }
  }

  render() {
    return (
      this.setApp()
    )
  }
}
