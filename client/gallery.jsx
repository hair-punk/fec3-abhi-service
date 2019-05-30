import React from 'react';
import ReactDOM from 'react-dom';
import ReactPlayer from 'react-player'
import PerfectScrollbar from 'react-perfect-scrollbar'
import styled from 'styled-components'

class Gallery extends React.Component{
constructor(props){
  super(props);
  this.state={
    // ThumbnailNames:this.props.filenames,
    ThumbnailUrls:[],
    ThumbnailTags:[]
  }
  console.log(this.state.ThumbnailUrls)
}
componentDidMount(){
}
render(){
  var urls = this.props.thumburls.map((val)=><img height="77px" width="77px" src={val} />);
  console.log(urls);
// return (<div style={{width: "600px"}}>{urls}{urls}{urls}}</div>)
return (<PerfectScrollbar minScrollbarLength = {600}>{urls}{urls}{urls}</PerfectScrollbar>);
}
}

export default Gallery;