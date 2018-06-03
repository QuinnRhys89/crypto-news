import React from "react";
import ReactDOM from 'react-dom';
import axios from 'axios';

class DatePicker extends React.Component {
    constructor(){
        super();
        this.state = {
            newsData: [],
            userInput: ""
        }

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
        axios
          .get(
            `https://discover.coinsquare.io/wp-json/wp/v2/posts?&_embed=true&per_page=10`
          )
          .then(res => {
            const data = res.data;
            console.log(data);
            this.setState({
              newsData: data
            });
          });
    }

    handleChange(e){
        e.preventDefault();
        // console.log("heelllllo");
        this.setState({
            userInput: this.datepicker.value
        });
        // console.log(this.datepicker.value);
    }

    render () {
        // userInput converted to date format
        const userBday = new Date(this.state.userInput).toDateString();

        console.log(userBday, "userBday");

        // function maps over the data and converts the date format in all posts
        const convertedDates = this.state.newsData.map((post) => {
            post.date = new Date(post.date).toDateString();
            return post;
        });

        // console.log(convertedDates, "Converted Dates");

    
        const matchDates = convertedDates.filter((post) => { 
            if (post.date === userBday){
                return post;
            }           
        });

        // console.log(matchDates, "results");
        return (
            <div className="wrapper">
                <header>
                    <h1>Crypto News on my Birthday</h1>
                    <form action="" className="user-input">
                        <input type="date" name="user-birthday" onChange={this.handleChange} ref={ref => this.datepicker = ref} />
                    </form>
                </header>

                <section className="articles">

                {matchDates.map((post, i) => <div className="post" key={i}>
                    <div className="top-article">
                        <div className="image-container">
                            <img src={post._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url} alt={post._embedded["wp:featuredmedia"][0].alt_text} title={post._embedded["wp:featuredmedia"][0].alt_text} />
                        </div>
                    </div>

                    <h2 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />

                    <div className="post-metadata">
                        <p>
                        By: <a href={post._embedded.author[0].link}>
                            {post._embedded.author[0].name}
                        </a>
                        </p>
                        <p>/ {post.date}</p>
                    </div>

                    <p className="article-text" dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
                    <a href={post.link}>Read More</a>
                    {/* <p dangerouslySetInnerHTML={{ __html: post.content.rendered }}></p> */}
                    </div>)}
                </section>
            </div>
        )
    }
}

export default DatePicker;