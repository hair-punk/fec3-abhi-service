

import React from 'react';
import InfoBox from '../../client/InfoBox.jsx';
import {InfoElements, Description, Line, Label, Value, Tag} from '../../client/InfoBox.jsx'
import renderer from 'react-test-renderer';
import { shallow, mount, render} from 'enzyme';
import expect from 'expect';
// import 'jest-styled-components'
import {find, findAll} from 'styled-components/test-utils';
import toJson from 'enzyme-to-json'
// const request = require('request');

// request('http://localhost:3008/gameObject'+'?id='+Math.ceil(Math.random()*100), (err,response,body)=>{
//   console.log(body)
//   obj = body;
// })

var description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
var metaTags = ["puzzle","action","action","massively multiplayer","strategy"];
var developer = 'puzzlesoft';
var publisher = 'publishersoft';
var date = new Date(94610000);
date = date.getUTCFullYear() + '-'+date.getMonth()+1+'-'+date.getDate();
var imagename = 'thumbnail for test.png';
var recentreviews = 'Mostly Positive';
var allreviews = "Mostly Positive";

describe('Infobox isolation testing',  ()=>{
  const tree =  mount((<InfoBox  metaTags={metaTags}picture={imagename} description ={description} releaseDate ={date} developer={developer} publisher={publisher} />));

  it('Infobox should match isolation shapshot',()=>{
    expect(toJson(tree)).toMatchSnapshot();
  })

  describe('should contain an infoelement component as the outer most DOMComponent',()=>{
    test('infoelements should exist and there should only be one',()=>{
      expect(tree.find(InfoElements).exists()).toEqual(true);
      expect(tree.find(InfoElements).length).toEqual(1)
    })
    test('infoelements should be the outermost dom element',()=>{
      expect(tree.childAt(0).type()).toEqual(InfoElements);
      expect(tree.children().length).toEqual(1);
    })
  })

  describe('InfoElement should have all the correct child components',()=>{
    test('infoelement has a picture-node Line element',()=>{
      expect(tree.find(InfoElements).find('#picture-node').first().is(Line)).toEqual(true);
    })

    test('infoelement has a description-node Description element',()=>{
      expect(tree.find(InfoElements).find('#description-node').first().is(Description)).toEqual(true);
    })

    test('infoelement has a recent-reviews-node Label element',()=>{
      expect(tree.find(InfoElements).find('#recent-reviews-node').first().is(Label)).toEqual(true);
    })
    test('infoelement has a recent-reviews-value Value element',()=>{
      expect(tree.find(InfoElements).find('#recent-reviews-value').first().is(Value)).toEqual(true);
    })
    test('infoelement has a all-reviews-node Label element',()=>{
      expect(tree.find(InfoElements).find('#all-reviews-node').first().is(Label)).toEqual(true);
    })

    test('infoelement has a all-reviews-value Value element', ()=>{
      expect(tree.find(InfoElements).find('#all-reviews-value').first().is(Value)).toEqual(true)
    })
    test('infoelement has a developer-label Label element', ()=>{
      expect(tree.find(InfoElements).find('#developer-label').first().is(Label)).toEqual(true);
    })
    test('infoelement has a developer-value Value element', ()=>{
      expect(tree.find(InfoElements).find('#developer-value').first().is(Value)).toEqual(true);
    })
    test('infoelement has a publisher-label Label element',()=>{
      expect(tree.find(InfoElements).find('#publisher-label').first().is(Label)).toEqual(true);
    })
    test('infoelement has a publisher-value Value element', ()=>{
      expect(tree.find(InfoElements).find('#publisher-value').first().is(Value)).toEqual(true);
    })
    test('infoelement has a user-defined-tags-label Label element',()=>{
      expect(tree.find(InfoElements).find('#user-defined-tags-label').first().is(Label)).toEqual(true);
    })
    test('infoelement has a metatags span element',()=>{
      expect(tree.find(InfoElements).find('#metatags').first().exists()).toEqual(true);
    })
  })
  test('InfoBox should have correct number of each sub-component', ()=>{
    expect(tree.find(Line).exists()).toEqual(true);
    expect(tree.find(Line).length).toEqual(8);

    expect(tree.find(Description).exists()).toEqual(true);
    expect(tree.find(Description).length).toEqual(1);

    expect(tree.find(Label).exists()).toEqual(true);
    expect(tree.find(Label).length).toEqual(6);

    expect(tree.find(Value).exists()).toEqual(true);
    expect(tree.find(Value).length).toEqual(5);

    expect(tree.find(Tag).exists()).toEqual(true);
    expect(tree.find(Tag).length).not.toEqual(0);
  })

  test('should contain a thumbnail picture', ()=>{
    expect(tree.exists(Line)).toEqual(true);
    expect(tree.exists('img')).toEqual(true);
    expect(tree.find('img').length).toEqual(1);
  })

  test('thumbnail should match filename of test image', ()=>{
    expect(tree.find('img').find('[src]').props().src).toEqual('thumbnail for test.png')
  })
  test('should contain an description node', ()=>{
    expect(tree.exists(Description)).toEqual(true)
    expect(tree.find(Description).length).toEqual(1);
    expect(tree.exists('p')).toEqual(true);
    expect(tree.find('p').length).toEqual(1);
    expect(tree.find('p').first().is('#description-node')).toEqual(true);
  })
  test('description node text should match sample data',()=>{
    expect(tree.find('p').text()).toEqual(description);
    expect(tree.find(Description).text()).toEqual(description);
  });
  test('should contain a recent reviews label',()=>{
    expect(tree.find(Label).first().text()).toEqual('RECENT REVIEWS:');
      //tests the outer and inner span
      expect(tree.find('#recent-reviews-node').exists()).toEqual(true);
     expect(tree.find('#recent-reviews-node').at(0).text()).toEqual('RECENT REVIEWS:');
     expect(tree.find('#recent-reviews-node').at(1).text()).toEqual('RECENT REVIEWS:');
  })
  test('recent reviews value should be mostly positive',()=>{
    expect(tree.find(Value).at(0).text()).toEqual(recentreviews);
      //tests the outer and inner span
      expect(tree.find('#recent-reviews-value').exists()).toEqual(true);
    expect(tree.find('#recent-reviews-value').at(0).text()).toEqual(recentreviews);
    expect(tree.find('#recent-reviews-value').at(1).text()).toEqual(recentreviews);
  })

  test('should contain an all reviews label',()=>{
  expect(tree.find(Label).at(1).text()).toEqual('ALL REVIEWS:');
  //tests the outer and inner span
  expect(tree.find('#all-reviews-node').exists()).toEqual(true);
  expect(tree.find('#all-reviews-node').at(0).text()).toEqual('ALL REVIEWS:');
  expect(tree.find('#all-reviews-node').at(1).text()).toEqual('ALL REVIEWS:')
  })

  test('all reviews value should be mostly positive',()=>{
    expect(tree.find(Value).at(0).text()).toEqual(allreviews);
      //tests the outer and inner span
      expect(tree.find('#all-reviews-value').exists()).toEqual(true);
    expect(tree.find('#all-reviews-value').at(0).text()).toEqual(allreviews);
    expect(tree.find('#all-reviews-value').at(1).text()).toEqual(allreviews);
  })

  test('release date should be valid', ()=>{
    expect(tree.find('#release-date-label').exists()).toEqual(true);
    expect(tree.find('#release-date-label').at(0).text()).toEqual('RELEASE DATE:');
    expect(tree.find('#release-date-label').at(1).text()).toEqual('RELEASE DATE:');
  })

  test('release date should match test data',()=>{
    expect(tree.find('#release-date-value').exists()).toEqual(true);
    expect(tree.find('#release-date-value').at(0).text()).toEqual(date);
    expect(tree.find('#release-date-value').at(1).text()).toEqual(date);
  })

  test('developer label should be valid',()=>{
    expect(tree.find('#developer-label').exists()).toEqual(true);
    expect(tree.find('#developer-label').at(0).text()).toEqual('DEVELOPER:');
    expect(tree.find('#developer-label').at(1).text()).toEqual('DEVELOPER:');
  })

  test('developer value should match test data',()=>{
  expect(tree.find('#developer-value').exists()).toEqual(true);
  expect(tree.find('#developer-value').at(0).text().trim()).toEqual(developer);
  expect(tree.find('#developer-value').at(1).text().trim()).toEqual(developer);
  })

  test('publisher label should be valid',()=>{
    expect(tree.find('#publisher-label').exists()).toEqual(true);
    expect(tree.find('#publisher-label').at(0).text()).toEqual('PUBLISHER:');
    expect(tree.find('#publisher-label').at(1).text()).toEqual('PUBLISHER:');
  })

  test('publisher value should match test data',()=>{
  expect(tree.find('#publisher-value').exists()).toEqual(true);
  expect(tree.find('#publisher-value').at(0).text().trim()).toEqual(publisher);
  expect(tree.find('#publisher-value').at(1).text().trim()).toEqual(publisher);
  });

  test('should have valid metatags',()=>{
    var tags = tree.find(Tag);
    tags.forEach((tag,index)=>{
      expect(tag.exists()).toEqual(true);
      expect(tag.is(Tag)).toEqual(true);
    })
  })

  test('metatags should match sample data', ()=>{
    var tags = tree.find(Tag);
    expect(tags.length).toEqual(metaTags.length)
    tags.forEach((tag,index)=>{
      expect(tag.text()).toEqual(metaTags[index])
    })
  })
})
