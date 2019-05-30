import React from 'react';
import ReactDOM from 'react-dom';
import ReactPlayer from 'react-player'
import PerfectScrollbar from 'react-perfect-scrollbar'
import styled from 'styled-components'
import Gallery from './gallery.jsx'

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
    releaseDate:'',
    videoFileUrls:[],
    photoFileUrls:[],
    thumbnailFileUrls:[]
    };
  }
  componentDidMount(){
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
    console.log(this.state.videoFileUrls)
    return (<div>
    <ReactPlayer url={this.state.videoFileUrls[0]} width ="600px" height="336px" playing />
        {/* <Gallery width ="600px" thumburls={this.state.thumbnailFileUrls} filenames = {this.state.videoFileNames} /> */}
    <PerfectScrollbar minScrollbarLength = {600}><Gallery width ="600px" thumburls={this.state.thumbnailFileUrls} filenames = {this.state.videoFileNames} /></PerfectScrollbar>
    </div>)




    }
}
ReactDOM.render(<Player />, document.getElementById("player"));