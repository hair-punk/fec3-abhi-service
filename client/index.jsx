import React from 'react';
import ReactDOM from 'react-dom';
import ReactPlayer from 'react-player'
import PerfectScrollbar from 'react-perfect-scrollbar'
import styled from 'styled-components'

//const request = require('request');

class Player extends React.Component {
  constructor(props){
    super(props);
    this.state={
    metaTags:[],
    videoFileNames:[],
    photoFileNames:[],
    thumbnailFileNames:[],
    gameId:'',
    gameTitle:'',
    gameDescription:'',
    gameDeveloper:'',
    gamePublisher:'',
    releaseDate:'',
    videoFileUrls:[],
    photoFileUrls:[],
    thumbnailFileUrls:[]
    };
  }
  componentDidMount(){
    console.log('component did mount')
    fetch('http://localhost:3007/gameObject'+'?id='+Math.floor(Math.random()*100)).then(response=>{
      return response.text()
    }).then(data=>{
      var responsedata = JSON.parse(data);
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
      photoFileNames:responsedata.photoFileNames,
      videoFileUrls:responsedata.VideoLinks,
      photoFileUrls:responsedata.PhotoLinks,
      thumbnailFileUrls:responsedata.ThumbnailLinks
      }));
    })
  }
  render(){
    return (<div>
    <ReactPlayer url={this.state.videoFileUrls[0]} width ="600px" height="336px"playing />
    <PerfectScrollbar minScrollbarLength = {600}><img src="https://s3-us-west-1.amazonaws.com/exhaust-media-test-2/1.jpg" alt="Smiley face" height="70" width="70" /><img src="https://s3-us-west-1.amazonaws.com/exhaust-media-test-2/1.jpg" alt="Smiley face" height="70" width="70" /><img src="https://s3-us-west-1.amazonaws.com/exhaust-media-test-2/1.jpg" alt="Smiley face" height="70" width="70" /><img src="https://s3-us-west-1.amazonaws.com/exhaust-media-test-2/1.jpg" alt="Smiley face" height="70" width="70" /><img src="https://s3-us-west-1.amazonaws.com/exhaust-media-test-2/1.jpg" alt="Smiley face" height="70" width="70" /><img src="https://s3-us-west-1.amazonaws.com/exhaust-media-test-2/1.jpg" alt="Smiley face" height="70" width="70" /><img src="https://s3-us-west-1.amazonaws.com/exhaust-media-test-2/1.jpg" alt="Smiley face" height="70" width="70" /><img src="https://s3-us-west-1.amazonaws.com/exhaust-media-test-2/1.jpg" alt="Smiley face" height="70" width="70" /><img src="https://s3-us-west-1.amazonaws.com/exhaust-media-test-2/1.jpg" alt="Smiley face" height="70" width="70" /><img src="https://s3-us-west-1.amazonaws.com/exhaust-media-test-2/1.jpg" alt="Smiley face" height="70" width="70" /><img src="https://s3-us-west-1.amazonaws.com/exhaust-media-test-2/1.jpg" alt="Smiley face" height="70" width="70" /></PerfectScrollbar>
    </div>)
  }
}
ReactDOM.render(<Player />, document.getElementById("player"));