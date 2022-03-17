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
    return (
      <div>
        <Header />
        {this.token ? <Main /> : <Login />}
        {this.token ? <Footer /> : null}
      </div>
    )
  }

  render() {
    return (
      this.setApp()
    )
  }
}
