import React from "react";
import ReactDOM from "react-dom";

const Post = (props) => {
    return (<div className="post">
        <div className="top-article">
            <div className="image-container">
                <a href={props.readMore} target="_blank"><img className="post-image" src={props.image} alt={props.alt}/></a>
            </div>
        </div>

        <h2 dangerouslySetInnerHTML={{ __html: props.title}} />

        <div className="post-metadata">
            <span>By <a href={props.authorLink}>{props.authorName}</a></span>
            <span>| {props.date}</span>
        </div>

        <p className="article-text" dangerouslySetInnerHTML={{ __html: props.excerpt}}/>
        <a className="read-btn" href={props.readMore} target="_blank">Read More</a>
    </div>
    )
}

export default Post;