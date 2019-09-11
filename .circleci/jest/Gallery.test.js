import React from 'react';
import Player from '../../client/Player.jsx';
import Gallery from '../../client/Gallery.jsx'
import OverFlowScrolling from '../../client/Gallery.jsx'
import Bar from '../../client/Gallery.jsx'
import renderer from 'react-test-renderer';
import { shallow, mount, render} from 'enzyme';
import expect from 'expect';
// import 'jest-styled-components'
import {find, findAll} from 'styled-components/test-utils';
import toJson from 'enzyme-to-json'

function videoClicked(){
  //dummy function
}
function photoClicked(){
  //dummy function
}

var videofilelinks = [];
for(var x = 0;x < 3;x++){
videofilelinks.push('video link' +x)
}
var photofilelinks = [];
for(var x =0;x < 3;x++){
  photofilelinks.push('photo link' +x)
}
var videothumblinks = [];
for(var x =0;x < 3;x++){
  videothumblinks.push('photo link' +x)
}

describe('Gallery isolation testing',()=>{
  var tree = mount(<Gallery thumbnailUrls={videothumblinks} photoUrls={photofilelinks} videoClickFunction={videoClicked} photoClickFunction={photoClicked} />)

  it('should match the isolation testing snapshot',()=>{
  expect(toJson(tree)).toMatchSnapshot();
  })

  it('gallery link props should match passed in values',()=>{
    for(var x = 0;x < 3;x++){
      expect(tree.find(Gallery).props().thumbnailUrls[x]).toEqual(videothumblinks[x]);
    }
    for(var x = 0;x < 3;x++){
      expect(tree.find(Gallery).props().photoUrls[x]).toEqual(photofilelinks[x]);
    }
  })
  it('should contain an overflowscrolling component',()=>{
    expect(tree.find(OverFlowScrolling).exists()).toEqual(true);
    expect(tree.find(OverFlowScrolling).length).toEqual(1);
  })
  it('should contain a bar component',()=>{
    expect(tree.find(Bar).exists()).toEqual(true);
    expect(tree.find(Bar).length).toEqual(1);
  })
  it('bar component should have some  img tags',()=>{
    expect(tree.find(Bar).first().find('img').length !==0).toEqual(true);
  })


})