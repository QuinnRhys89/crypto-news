import React from "react";
import ReactDOM from 'react-dom';
import axios from 'axios';
import Post from './Post.js';
import Heading from "./Heading.js";
import CoinsquarePlug from './CoinsquarePlug';

class DatePicker extends React.Component {
  constructor() {
    super();
    this.state = {
      newsData: [],
      userInput: "",
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.getDatedPosts = this.getDatedPosts.bind(this);
  }

  componentDidMount(){
    // pass an empty string to getDatedPosts in order to prevent status error
      this.getDatedPosts("");
  }

//  function passes user birthday from input to be used as template literal in get request
  getDatedPosts(birthday){
      
    if (birthday !== "" || undefined) {
        const dateSearch = `before=${birthday}T23:59:59`;
        axios
            .get(
                `https://discover.coinsquare.io/wp-json/wp/v2/posts?${dateSearch}&_embed=true&per_page=5`
            )
            .then(res => {
                const data = res.data;
                console.log(data, "Submitted");
                this.setState({
                    newsData: data
                });
            });
    }
    else {
        return;
    }
}
  
  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      userInput: this.datepicker.value
    });

    this.getDatedPosts(this.datepicker.value);
  }

  render() {
    const userBday = this.state.userInput;

    const matchDates = this.state.newsData.filter(post => {
        if (post.date.includes(userBday)) {
            return post;
        }

    });

    return <div className="wrapper">
        <header>
          <Heading />
          <form action="" className="user-input" onSubmit={this.handleSubmit}>
            <input type="date" name="user-birthday" ref={ref => (this.datepicker = ref)} />
            <input type="submit" value="get news" />
          </form>
        </header>

        <section className="articles">
          {matchDates.length !== 0 ? matchDates.map((post, i) => {
              // Image URL
              const imageUrl = post._embedded["wp:featuredmedia"][0].media_details.sizes.full.source_url;
              // Image Alt Text
              const altText = post._embedded["wp:featuredmedia"][0].alt_text;
              // Title
              const postTitle = post.title.rendered;
              // Author Name
              const authorName = post._embedded.author[0].name;
              // Link to Author's Profile
              const authorLink = post._embedded.author[0].link;
              // Post Date
              const date = post.date;
              const dateConverted = new Date(post.date).toDateString();
              // Post Excerpt
              const excerpt = post.excerpt.rendered;
              // Read More Link
              const readMore = post.link;

              return <Post image={imageUrl} alt={altText} title={postTitle} authorLink={authorLink} authorName={authorName} date={dateConverted} excerpt={excerpt} readMore={readMore} key={i} />;
            }) : <CoinsquarePlug />}
        </section>
      </div>
  }
}

export default DatePicker;

