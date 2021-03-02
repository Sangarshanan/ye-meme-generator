import React from 'react';
import { render } from 'react-dom';
import axios from 'axios';
// const axios = require("axios"); //Make sure to download the axios npm module before requiring it

const styles = {
  fontFamily: 'sans-serif',
  textAlign: 'center',
  img: {
    height: "50em"
  },
};

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      image_url: "",
      template_url: "",
    };
  };

  getRandomImage = () => {
    axios.get(`https://api.memegen.link/templates`)
      .then(res => {
        var templates = res.data.map(({ blank }) => blank);
        const template_url = templates[Math.floor(Math.random() * templates.length)];
        this.setState({
          template_url: template_url,
        });
      })
      .catch(err => {
        console.log("error fetching templates:", err);
      })

      axios.get(`https://api.kanye.rest`)
      .then(res => {
        var quotes = res.data.quote.replace(/ /g,"_").split('.').filter(function(el) {return el.length != 0}).join('/');
        const image_url = 'https://api.memegen.link/images/custom/'+quotes+'.png?background='+this.state.template_url;
        this.setState({
          image_url: image_url,
        });
      })
      .catch(err => {
        console.log("error fetching image:", err);
      })
  }

  componentDidMount() {
    this.getRandomImage();
  }

  render() {
    const { image_url } = this.state;
    return (
      <div style={styles}>
        <h2> Ye Meme Generator </h2>
        <div>
          <img style={styles.img} alt="Euphemism for a new religion" src={image_url}/>
        </div>
        <p>
          <button onClick={this.getRandomImage}>More Ye</button> 
        </p>
      </div>
    );
  }

}
render(<App />, document.getElementById('root'));
