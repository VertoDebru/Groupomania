import React from "react";
//import axios from "axios";
// Import components
import Avatar from "./Avatar";
import Comments from "./Comments";
import AddComment from "./AddComment";

import "../styles/Article.css";

export default class Article extends React.Component {
  constructor(dataArticle) {
    super(dataArticle);
    this.article = dataArticle.dataArticle;
    console.log(this.article);
    this.articleId = this.article.id;
    console.log("Article ID : "+this.articleId);
  }

  render() {
    return (
      <div>
        <article>
          <div className='header'>
            <Avatar userId={this.article.authorId}/>
            <div>
              <h2>{this.article.title}</h2>
              <h3>Verto Debru | <i className="fa-solid fa-clock"></i> {this.article.postDate}</h3>
            </div>
          </div>
          <p>{this.article.article}</p>
          <div className='footer'>
            <a href='true' className='like'>
              <i className='fa-solid fa-thumbs-up'></i> 2 likes
            </a>
            <a href='true'>2 comments</a>
          </div>
        </article>
        <Comments articleId={this.articleId} />
        <AddComment />
      </div>
    )
  }
}
