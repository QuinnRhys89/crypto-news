import React from "react";
import ReactDOM from "react-dom";


export default class Post extends React.Component{
    render() {
        return(
            <div className="post">
                <div className="top-article">
                    <div className="image-container">
                        <a href={this.props.readMore}><img className="post-image" src={this.props.image} alt={this.props.alt} title={this.props.alt}/></a>
                    </div>
                </div>
        
                <h2 dangerouslySetInnerHTML={{ __html: this.props.title}} />
        
                <div className="post-metadata">
                    <p>By: <a href={this.props.authorLink}>{this.props.authorName}</a></p>
                    <p>/ {this.props.date}</p>
                </div>
        
                <p className="article-text" dangerouslySetInnerHTML={{ __html: this.props.excerpt}}/>
                <a className="read-btn" href={this.props.readMore}>Read More</a>
            </div>
        )
    }
}
