import React from 'react';
import ReactDOM from 'react-dom';
import ReactPlayer from 'react-player'
import PerfectScrollbar from 'react-perfect-scrollbar'
import styled from 'styled-components'
const InfoElements = styled.span`
height:450px;
weight:300px;
display:flex;
flex-Direction:column;
alignItems:center
`;

class InfoBox extends React.Component{
render(){
  return(<InfoElements>
      <div><img src={this.props.picture} height="160px" width="240px"/></div>
      <p style={{fontFamily:"arial",fontSize:"11px", alignSelf:"center"}}>{this.props.description}</p>
  </InfoElements>)
}

}

export default InfoBox