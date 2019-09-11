import React from 'react';
import Player from '../../client/Player.jsx';
import Gallery from '../../client/Gallery.jsx'
import renderer from 'react-test-renderer';
import { shallow, mount, render} from 'enzyme';
import expect from 'expect';
// import 'jest-styled-components'
import {find, findAll} from 'styled-components/test-utils';
import toJson from 'enzyme-to-json'
import ReactPlayer from 'react-player';
import MediaContainer from '../../client/Player'

var videofilelinks = [];
for(var x = 0;x < 3;x++){
videofilelinks.push('video link' +x)
}
var photofilelinks = [];
for(var x =0;x < 3;x++){
  photofilelinks.push('photo link' +x)
}
var photothumblinks = [];
for(var x =0;x < 3;x++){
  photothumblinks.push('photo link' +x)
}

//isolation tests
describe('Player isolation testing', ()=>{
  const tree = mount((<Player videoUrls={videofilelinks} thumbnailUrls={photothumblinks} photoUrls={photofilelinks}/>))

    it('Player should match isolation snapshot',()=>{
      expect(toJson(tree)).toMatchSnapshot();
    })
    it('player link props should match passed in values',()=>{
      for(var x = 0;x < 3;x++){
        expect(tree.props().videoUrls[x]).toEqual(videofilelinks[x]);
      }
      for(var x = 0;x < 3;x++){
        expect(tree.props().photoUrls[x]).toEqual(photofilelinks[x]);
      }
      for(var x = 0;x < 3;x++){
        expect(tree.props().thumbnailUrls[x]).toEqual(photothumblinks[x]);
      }
    })
    it('should only have one ReactPlayer component upon initial render', ()=>{
      expect(tree.find(ReactPlayer).exists()).toEqual(true);
      expect(tree.find(ReactPlayer).length).toEqual(1);
    })
    it('should only have one gallery component upon initial render',()=>{
      expect(tree.find(Gallery).exists()).toEqual(true)
      expect(tree.find(Gallery).length).toEqual(1);
    })
    it('should have only one MediaContainer component upon initial render', ()=>{
      expect(tree.find(MediaContainer).exists()).toEqual(true);
      expect(tree.find(MediaContainer).length).toEqual(1);
    })
    it('should have a currentlyPlaying state that upon initial render, is set to \'\' ',()=>{
      expect(tree.state().currentlyPlaying).toEqual('')
    })
    it('should have a currentPhoto state that defaults to \'\' ',()=>{
      expect(tree.state().currentPhoto).toEqual('');
    })
    it('should have a showPhoto prop state defaults to false',()=>{
      expect(tree.state().showPhoto).toEqual(false);
    })
    it('should have a playing prop state defaults to true',()=>{
      expect(tree.state().playing).toEqual(true);
    })
})
