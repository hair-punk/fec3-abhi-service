import React from 'react';
import ReactDOM from 'react-dom';
import ReactPlayer from 'react-player'
import PerfectScrollbar from 'react-perfect-scrollbar'
import styled from 'styled-components'
import Gallery from './Gallery.jsx'
import PropTypes from 'prop-types';
//const request = require('request');

class Player extends React.Component {
  constructor(props){
    super(props);
    this.state={
      currentlyPlaying:'',
      currentPhoto:'',
      showPhoto:false,
      playing:false
    };
    this.videoClicked = this.videoClicked.bind(this);
    this.photoClicked = this.photoClicked.bind(this);
  }
  videoClicked(index){
    // console.log(this)
    console.log(index)
    console.log('videowasclicked');
    console.log(this.props.videoUrls)
    console.log(this.state.currentlyPlaying, 'was playing')
    this.setState((state,props)=>(
      {

      currentlyPlaying:this.props.videoUrls[index],
      showVideoThumbnail:true,
      showPhoto:false,
      playing:true

    }))
    console.log('now ', this.state.currentlyPlaying, ', is playing')
  }
  photoClicked(index){
    console.log('photowasclicked');
    this.setState((state,props)=>(
      {
      showPhoto:true,
      currentPhoto:this.props.photoUrls[index],
      playing:false
    }))
  }
    componentDidMount(){


    }

    // this.setState({
    //   currentlyPlaying:this.props.videoUrls[0]
    // })

  // videoClick(index){
  //   console.log('thumbnail clicked on')
  // }
  // photoClick(index){
  //   console.log('photo clicked on')
  // }
  render(){
    if(this.state.showPhoto){
      return(<div width="600px" height="336px"><img height="336" width="600px"src={this.state.currentPhoto} />
      <Gallery currentlyPlaying={this.props.currentVideo}thumbnailUrls={this.props.thumbnailUrls} photoUrls={this.props.photoUrls} videoClickFunction={this.videoClicked} photoClickFunction = {this.photoClicked}/>
      </div>)
    }else
    return (<div>
     <ReactPlayer url={this.state.currentlyPlaying} width ="600px" height="336px" controls={true} volume={0.15} playing={this.state.playing} />
    <Gallery currentlyPlaying={this.props.currentVideo}thumbnailUrls={this.props.thumbnailUrls} photoUrls={this.props.photoUrls} videoClickFunction={this.videoClicked} photoClickFunction = {this.photoClicked}/>
    </div>)
    }
}
// Player.propTypes={
// currentVideo:Proptypes.string,
// photoUrls:Proptypes.array,
// videoUrls:Proptypes.array,
// thumbnailUrls:Proptypes.array,
// videoWasClicked:Proptypes.function,
// photoWasClicked:Proptypes.function
// }
// ReactDOM.render(<Player />, document.getElementById("player"));
export default Player