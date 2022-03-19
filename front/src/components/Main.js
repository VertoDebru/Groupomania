import React from "react";
import axios from "axios";
import "../styles/Main.css";
import Article from "./Article";

export default class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false
    };
    this.getUrl = 'http://localhost:8080/api/articles';
    this.articles = null;
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    this.getArticles();
  }

  getArticles() {
    axios.get(this.getUrl)
    .then((res) => {
      if(res.status === 204) return console.log("No articles");
      this.articles = res.data.articles;
      console.log(res.data.articles);
      this.setState({ isLoading: false });
    })
    .catch((error) => {
      console.log(error);
      this.setState({ isLoading: false });
    });
  }

  setArticles() {
    return (
      <div>
        {this.articles ? this.articles.map((article) => (
          <Article key={article.id} dataArticle={article} />
        )) : 'No Articles!'}
      </div>
    )
  }

  render() {
    console.log(this.articles);
    return (
      <div className='app-main'>
        {this.setArticles()}
      </div>
    )
  }
}
