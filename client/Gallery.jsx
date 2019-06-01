import React from 'react';
import ReactDOM from 'react-dom';
import ReactPlayer from 'react-player'
import PerfectScrollbar from 'react-perfect-scrollbar'
import styled from 'styled-components'
import OverflowScrolling from 'react-overflow-scrolling'
import PropTypes from 'prop-types';
//videoClickFunction photoClickFunction
class Gallery extends React.Component{
constructor(props){
  super(props);
  this.state={
  }
}
componentDidMount(){
}
render(){
  var thumburls = this.props.thumbnailUrls.map((val,index)=><img height="77px" width="77px" src={val} onClick={this.props.videoClickFunction.bind(null, index)}/>);

  var photourls = this.props.photoUrls.map((val, index)=><img height ="77px" width="77px" src = {val} onClick={this.props.photoClickFunction.bind(null, index)}/>);

  return (<OverflowScrolling style={{width:"600px",opacity:"1"}}>
    <div className="gallery-bar overflow-scrolling" style={{overflow:'auto',width:'600px',height:'90px',whiteSpace:'nowrap', opacity:"1"}}>{thumburls}{photourls}{thumburls}{photourls}</div>
    </OverflowScrolling>);
}
}

export default Gallery;