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

  return (<OverflowScrolling>
    <div className="gallery-bar overflow-scrolling" style={{overflow:'auto',width:'600px',height:'90px',whiteSpace:'nowrap'}}>{thumburls}{photourls}{thumburls}{photourls}</div>
    </OverflowScrolling>);
// return (<div style={{width: "600px"}}>{urls}{urls}{urls}}</div>)
//return (<span style={{width: "600px", height: "77px", overflow: 'scroll'}}>{urls}{urls}{urls}</span>);
}
}
// Gallery.Proptypes={

// }
export default Gallery;