import React from 'react';
import ReactDOM from 'react-dom';
import ReactPlayer from 'react-player'
import PerfectScrollbar from 'react-perfect-scrollbar'
import styled from 'styled-components'
// import Gallery from './gallery.jsx'
import Player from'./Player.jsx'



class HeroBanner extends React.Component{
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
      thumbnailFileUrls:[],
      };

  }
  componentDidMount(){
    fetch('http://localhost:3007/gameObject'+'?id='+Math.floor(Math.random()*100)).then(response=>{
      return response.text()
    }).then(data=>{
      var responsedata = JSON.parse(data);
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
      thumbnailFileUrls:responsedata.ThumbnailLinks,
      }));
    })
  }

  render(){
   return <div style={{height:"500px",width:"900px"}}>
   <Player photoUrls ={this.state.photoFileUrls}
   videoUrls={this.state.videoFileUrls} thumbnailUrls={this.state.thumbnailFileUrls} />
   </div>
  }
}

ReactDOM.render(<HeroBanner />, document.getElementById("player"));