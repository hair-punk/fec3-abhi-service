import React from 'react';
import ReactDOM from 'react-dom';
import ReactPlayer from 'react-player'
import PerfectScrollbar from 'react-perfect-scrollbar'
//const request = require('request');

class Player extends React.Component {
  constructor(props){
    super(props);
    this.state={
    metaTags:[],
    videoFileNames:[],
    photoFileNames:[],
    gameId:'',
    gameTitle:'',
    gameDescription:'',
    gameDeveloper:'',
    gamePublisher:'',
    releaseDate:''
    };
  }
  componentDidMount(){
    console.log('component did mount')
    fetch('http://localhost:3007/gameObject'+'?id='+1).then(response=>{
      return response.text()
    }).then(data=>{
      var responsedata = JSON.parse(data)[0];
      console.log(responsedata)
      this.setState((state,props)=>({
      gameId:responsedata.gameId,
      gameTitle:responsedata.gameTitle,
      gameDescription:responsedata.gameDescription,
      gameDeveloper:responsedata.gameDeveloper,
      gamePublisher:responsedata.gamePublisher,
      releaseDate:responsedata.releaseDate,
      metaTags:responsedata.metaTags,
      videoFileNames:responsedata.videoFileNames,
      photoFileNames:responsedata.photoFileNames
      }));
    })
  }
  render(){
    return (<div>
    <ReactPlayer url="https://s3-us-west-1.amazonaws.com/exhaust-media-test/100.mp4" playing />
    <PerfectScrollbar><img src="https://s3-us-west-1.amazonaws.com/exhaust-media-test-2/1.jpg" alt="Smiley face" height="70" width="70" /><img src="https://s3-us-west-1.amazonaws.com/exhaust-media-test-2/1.jpg" alt="Smiley face" height="70" width="70" /><img src="https://s3-us-west-1.amazonaws.com/exhaust-media-test-2/1.jpg" alt="Smiley face" height="70" width="70" /><img src="https://s3-us-west-1.amazonaws.com/exhaust-media-test-2/1.jpg" alt="Smiley face" height="70" width="70" /><img src="https://s3-us-west-1.amazonaws.com/exhaust-media-test-2/1.jpg" alt="Smiley face" height="70" width="70" /><img src="https://s3-us-west-1.amazonaws.com/exhaust-media-test-2/1.jpg" alt="Smiley face" height="70" width="70" /><img src="https://s3-us-west-1.amazonaws.com/exhaust-media-test-2/1.jpg" alt="Smiley face" height="70" width="70" /><img src="https://s3-us-west-1.amazonaws.com/exhaust-media-test-2/1.jpg" alt="Smiley face" height="70" width="70" /><img src="https://s3-us-west-1.amazonaws.com/exhaust-media-test-2/1.jpg" alt="Smiley face" height="70" width="70" /><img src="https://s3-us-west-1.amazonaws.com/exhaust-media-test-2/1.jpg" alt="Smiley face" height="70" width="70" /><img src="https://s3-us-west-1.amazonaws.com/exhaust-media-test-2/1.jpg" alt="Smiley face" height="70" width="70" /></PerfectScrollbar>
    </div>)
  }
}
ReactDOM.render(<Player />, document.getElementById("player"));