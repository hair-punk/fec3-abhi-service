import React from 'react';
import ReactDOM from 'react-dom';
import ReactPlayer from 'react-player'
import PerfectScrollbar from 'react-perfect-scrollbar'


class Player extends React.Component {
  constructor(props){
    super(props);
    this.state={};
  }
  render(){
    return (<div>
    <ReactPlayer url="https://s3-us-west-1.amazonaws.com/exhaust-media-test/100.mp4" playing />
    <PerfectScrollbar><img src="https://s3-us-west-1.amazonaws.com/exhaust-media-test-2/1.jpg" alt="Smiley face" height="70" width="70" /><img src="https://s3-us-west-1.amazonaws.com/exhaust-media-test-2/1.jpg" alt="Smiley face" height="70" width="70" /><img src="https://s3-us-west-1.amazonaws.com/exhaust-media-test-2/1.jpg" alt="Smiley face" height="70" width="70" /><img src="https://s3-us-west-1.amazonaws.com/exhaust-media-test-2/1.jpg" alt="Smiley face" height="70" width="70" /><img src="https://s3-us-west-1.amazonaws.com/exhaust-media-test-2/1.jpg" alt="Smiley face" height="70" width="70" /><img src="https://s3-us-west-1.amazonaws.com/exhaust-media-test-2/1.jpg" alt="Smiley face" height="70" width="70" /><img src="https://s3-us-west-1.amazonaws.com/exhaust-media-test-2/1.jpg" alt="Smiley face" height="70" width="70" /><img src="https://s3-us-west-1.amazonaws.com/exhaust-media-test-2/1.jpg" alt="Smiley face" height="70" width="70" /><img src="https://s3-us-west-1.amazonaws.com/exhaust-media-test-2/1.jpg" alt="Smiley face" height="70" width="70" /><img src="https://s3-us-west-1.amazonaws.com/exhaust-media-test-2/1.jpg" alt="Smiley face" height="70" width="70" /><img src="https://s3-us-west-1.amazonaws.com/exhaust-media-test-2/1.jpg" alt="Smiley face" height="70" width="70" /></PerfectScrollbar>
    </div>)
  }
}
ReactDOM.render(<Player />, document.getElementById("player"));