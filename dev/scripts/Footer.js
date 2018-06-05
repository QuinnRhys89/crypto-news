import React from "react";
import ReactDOM from "react-dom";

const Footer = () => {
    return <footer>
        <div className="wrapper">
          <p>&copy; Coinsquare 2018</p>
          <div className="social-links">
            <a href="https://www.facebook.com/coinsquare.io/" target="_blank">
              <i className="fab fa-facebook-f" />
            </a>
            <a href="https://twitter.com/coinsquare?lang=en" target="_blank">
              <i className="fab fa-twitter" />
            </a>
                <a href="https://www.youtube.com/channel/UCZXVZQtR-SsSMVbJTCAdryA/featured" target="_blank">
                <i className="fab fa-youtube" />
            </a>
          </div>
        </div>
      </footer>;
        

}

export default Footer;