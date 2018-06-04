import React from "react";
import ReactDOM from "react-dom";


export default class Post extends React.Component{
    render() {
        return(
            <div className="post">
                <div className="top-article">
                    <div className="image-container">
                        <img src={this.props.image} alt={this.props.alt} title={this.props.alt}/>
                    </div>
                </div>
        
                <h2 dangerouslySetInnerHTML={{ __html: this.props.title}} />
        
                <div className="post-metadata">
                    <p>By: <a href={this.props.authorLink}>{this.props.authorName}</a></p>
                    <p>/ {this.props.date}</p>
                </div>
        
                <p className="article-text" dangerouslySetInnerHTML={{ __html: this.props.excerpt}}/>
                <a href={this.props.readMore}>Read More</a>
                {/* <p dangerouslySetInnerHTML={{ __html: post.content.rendered }}></p> */}
            </div>
        )
    }
}
