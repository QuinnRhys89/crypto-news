import React from "react";
import ReactDOM from 'react-dom';
import axios from 'axios';

class DatePicker extends React.Component {
  constructor() {
    super();
    this.state = {
      newsData: [],
      userInput: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.getDatedPosts = this.getDatedPosts.bind(this);
  }

  componentDidMount(){
    // pass an empty string to getDatedPosts in order to prevent status error
      this.getDatedPosts("");
  }

//  function passes user birthday from input to be used as template literal in get request
  getDatedPosts(birthday){
    // let dateSearch = "";

    if (birthday !== "" || undefined) {
        const dateSearch = `before=${birthday}T23:59:59`;
        axios
            .get(
                `https://discover.coinsquare.io/wp-json/wp/v2/posts?${dateSearch}&_embed=true&per_page=10`
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
        return null;
    }
}
  
  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      userInput: this.datepicker.value
    });

    this.getDatedPosts(this.datepicker.value);

    console.log(this.state.userInput, "Here is the input");
  }

  render() {
    const userBday = this.state.userInput;

    const matchDates = this.state.newsData.filter(post => {
        if (post.date.includes(userBday)) {
        return post;
      }

    });

    console.log(matchDates);

    // console.log(matchDates, "results");
    return (
      <div className="wrapper">
        <header>
          <h1>Crypto News on my Birthday</h1>
                <form action="" className="user-input" onSubmit={this.handleSubmit}>
            <input
              type="date"
              name="user-birthday"
              ref={ref => (this.datepicker = ref)}
            />
            <input type="submit" value="submit"/>
          </form>
        </header>

        <section className="articles">
          {matchDates.map((post, i) => (
            <div className="post" key={i}>
              <div className="top-article">
                <div className="image-container">
                  <img
                    src={
                      post._embedded["wp:featuredmedia"][0].media_details.sizes
                        .medium.source_url
                    }
                    alt={post._embedded["wp:featuredmedia"][0].alt_text}
                    title={post._embedded["wp:featuredmedia"][0].alt_text}
                  />
                </div>
              </div>

              <h2 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />

              <div className="post-metadata">
                <p>
                  By:{" "}
                  <a href={post._embedded.author[0].link}>
                    {post._embedded.author[0].name}
                  </a>
                </p>
                <p>/ {post.date}</p>
              </div>

              <p
                className="article-text"
                dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
              />
              <a href={post.link}>Read More</a>
              {/* <p dangerouslySetInnerHTML={{ __html: post.content.rendered }}></p> */}
            </div>
          ))}
        </section>
      </div>
    );
  }
}

export default DatePicker;