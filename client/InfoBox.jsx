import React from 'react';
import ReactDOM from 'react-dom';
import ReactPlayer from 'react-player'
import PerfectScrollbar from 'react-perfect-scrollbar'
import styled from 'styled-components'

class InfoBox extends React.Component{
render(){
  return(<span style={{height:"400px", width:"300px", display:"flex", flexDirection:"column", alignItems:"center" }}>
      <div><img src={this.props.picture} height="160px" width="240px"/></div>
      <p style={{fontFamily:"arial",fontSize:"11px", alignSelf:"center"}}>{this.props.description}</p>
  </span>)
}

}

export default InfoBox