import React from 'react';
import styled from 'styled-components'

export const InfoElements = styled.span`
  height:450px;
  weight:300px;
  display:flex;
  font-family:arial helvetica,sans-serif;
    flex-direction:column;
  align-items:center;
  background-color: #182937;
`;
 export const Description = styled.p`
  font-size:11px;
  text-align:left;
  color:#c6d4df;
  margin-block-start:0px;
  margin-block-end:0px;
`;
export const Line = styled.span`
  text-align:left;
  font-size:10px;
  margin-block-start:0px
  margin-block-end:0px
`;
export const Label = styled.span`
  color:#556772;
`;
export const Value = styled.span`
  color:#66C0F4;
`;
export const Tag = styled.button`
  background-color:rgba( 103, 193, 245, .2 );
  color:#66C0F4;
  border-radius:3px;
  margin-right:2px;
  &:hover{
  background-color:#66C0F4;
    color:#ffffff;
  }
  border-style:hidden;
`;

 class InfoBox extends React.Component{
render(){
  var date = this.props.releaseDate.split('T')[0]
  return(<InfoElements>
      <Line id='picture-node' ><img src={this.props.picture} height="160px" width="240px"/></Line>
      <Line><Description id='description-node'>{this.props.description}</Description></Line>
      <Line><Label id='recent-reviews-node'>RECENT REVIEWS:</Label> <Value id='recent-reviews-value'>Mostly Positive</Value></Line>
      <Line><Label id='all-reviews-node'>ALL REVIEWS:</Label><Value id='all-reviews-value'>Mostly Positive</Value></Line>
      <br></br>
      <Line><Label id='release-date-label'>RELEASE DATE:</Label><Value id='release-date-value'>{date}</Value></Line>
      <br></br>
      <Line><Label id='developer-label'>DEVELOPER:</Label><Value id='developer-value'> {this.props.developer}</Value></Line>
      <Line><Label id='publisher-label'>PUBLISHER:</Label><Value id='publisher-value'> {this.props.publisher}</Value></Line>
      <br></br>
      <Line><Label id='user-defined-tags-label'> Popular user-defined tags for this product:</Label></Line>
      <span id='metatags'>{this.props.metaTags.map((tag, index)=>(
        <Tag key={index}>{tag}</Tag>
      ))}</span>
  </InfoElements>)
}

}

export default InfoBox
// export { Description, Infobox }