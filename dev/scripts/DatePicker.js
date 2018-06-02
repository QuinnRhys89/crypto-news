import React from "react";
import ReactDOM from 'react-dom';
import axios from 'axios';

class DatePicker extends React.Component {
    constructor(){
        super();
        this.state = {
            newsData: [],
        }
    }

    componentDidMount(){
        axios.get(`https://discover.coinsquare.io/wp-json/wp/v2/posts?_embed=true`)
            .then((res) => {
                const data = res.data;
                console.log(data);
                this.setState({
                    newsData: data
                })
            });
    }

    handleChange(e){
        e.preventDefault();
    }



    render () {
        return <div>
            <h1>Crypto News on my Birthday</h1>
            <form action="">
              <input type="date" name="user-birthday" />
            </form>

            <section>
              {this.state.newsData.map((post, i) => <div key={i}>
                    <img src={post._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url} alt={post._embedded["wp:featuredmedia"][0].alt_text} title={post._embedded["wp:featuredmedia"][0].alt_text} />
                  <div className="post-metadata">
                    <p>
                      By <a href={post._embedded.author[0].link}>
                        {post._embedded.author[0].name}
                      </a>
                    </p>
                    <p>{post.date}</p>
                  </div>
                  <img src={post.featuredmedia} alt="" />
                  <h1 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                  <p dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
                  {/* <p dangerouslySetInnerHTML={{ __html: post.content.rendered }}></p> */}
                </div>)}
            </section>
          </div>;
    }
}

export default DatePicker;