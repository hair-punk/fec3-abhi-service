import React from 'react';
import ReactDOM from 'react-dom';

class Player extends React.Component {
  constructor(props){
    super(props);
    this.state={};
  }
  render(){
    return (<div>asdf</div>)
  }
}
ReactDOM.render(<Player />, document.getElementById("player"));