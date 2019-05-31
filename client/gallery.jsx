import React from 'react';
import ReactDOM from 'react-dom';
import ReactPlayer from 'react-player'
import PerfectScrollbar from 'react-perfect-scrollbar'
import styled from 'styled-components'
import OverflowScrolling from '../node_modules/react-overflow-scrolling/dist/index.js'

class Gallery extends React.Component{
constructor(props){
  super(props);
  this.state={
  }
}
componentDidMount(){
}
render(){
  var thumburls = this.props.thumbnailUrls.map((val)=><img height="77px" width="77px" src={val} onClick={this.props.videoClickFunction}/>);
  var photourls = this.props.photoUrls.map((val)=><img height ="77px" width="77px" src = {val} onClick={this.props.photoClickFunction}/>);
  console.log(thumburls,photourls);
  return (<OverflowScrolling><div className="gallery-bar overflow-scrolling" style={{overflow:'auto',width:'600px',height:'90px',whiteSpace:'nowrap'}}>{thumburls}{photourls}{thumburls}{photourls}</div></OverflowScrolling>);
// return (<div style={{width: "600px"}}>{urls}{urls}{urls}}</div>)
//return (<span style={{width: "600px", height: "77px", overflow: 'scroll'}}>{urls}{urls}{urls}</span>);
}
}
export default Gallery;