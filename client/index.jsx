import React from 'react';
import ReactDOM from 'react-dom';
import ReactPlayer from 'react-player'

class Player extends React.Component {
  constructor(props){
    super(props);
    this.state={};
  }
  render(){
    return (<ReactPlayer url="https://www.youtube.com/watch?v=30noyHLKLl4" playing />)
  }
}
ReactDOM.render(<Player />, document.getElementById("player"));