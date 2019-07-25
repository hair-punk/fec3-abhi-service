import React from 'react';
import ReactPlayer from 'react-player'
import styled from 'styled-components'
import Gallery from './Gallery.jsx'

const MediaContainer = styled.div`
  width:600px;
  height:450px;
`;
const Photo = styled.img`
  width:600px;
  height:360px;
  display:block;
`;
class Player extends React.Component {
  constructor(props){
    super(props);
    this.state={
      currentlyPlaying:'',
      currentPhoto:'',
      showPhoto:false,
      playing:true
    };
    this.videoClicked = this.videoClicked.bind(this);
    this.photoClicked = this.photoClicked.bind(this);
  //  this.componentDidMount = this.componentDidMount.bind(this)
    this.componentDidUpdate = this.componentDidUpdate.bind(this)
 // this.videoClicked(0);
  }
  videoClicked(index){
    console.log('videoclicked ran')
    this.setState((state,props)=>(
      {
        currentlyPlaying:this.props.videoUrls[index],
        showVideoThumbnail:true,
        showPhoto:false,
        playing:true
    }))
  }
  photoClicked(index){
    this.setState((state,props)=>(
      {
        showPhoto:true,
        currentPhoto:this.props.photoUrls[index],
        playing:false
      }
    ))
  }
  componentDidUpdate(){
    console.log('Player componentdidupdate just got called')
    if(this.state.currentlyPlaying ===''){
      this.videoClicked(0)
    }
    console.log('player component did update just finished')
  }
  render(){

    if(this.state.showPhoto){
      return(<MediaContainer><Photo src={this.state.currentPhoto} />
        <Gallery thumbnailUrls={this.props.thumbnailUrls} photoUrls={this.props.photoUrls} videoClickFunction={this.videoClicked} photoClickFunction = {this.photoClicked}/>
        </MediaContainer>)
    }else{
    return (<MediaContainer>
      <ReactPlayer style={{backgroundColor:'#182937'}} controls={true} width="600px" url={this.state.currentlyPlaying} controls={true} volume={0.15} playing={true} muted={true} file={{forceVideo:true}}/>
        <Gallery thumbnailUrls={this.props.thumbnailUrls} photoUrls={this.props.photoUrls} videoClickFunction={this.videoClicked} photoClickFunction = {this.photoClicked}/>
        </MediaContainer>)
    }
  }
}
export default Player