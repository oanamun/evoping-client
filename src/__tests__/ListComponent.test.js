/* global describe, beforeEach, it, expect */

import React from 'react';
import { shallow } from 'enzyme';

import ListComponent, { defaultProps } from '_components/ListComponent';

const items = [
  { name: 'Item 1' },
  { name: 'Item 2' },
];

let wrapper;

describe('<ListComponent /> Test Suite', () => {
  beforeEach(() => {
    wrapper = shallow(<ListComponent items={items} />);
  });

  it('Contains default values', () => {
    expect(wrapper.find('h3').props().children).toBe(defaultProps.name);
  });

  it('Contains all items', () => {
    expect(wrapper.find('li').length).toBe(3);
    expect(wrapper.find('span').get(0).props.children).toContain(items[0].name);
    expect(wrapper.find('span').get(1).props.children).toContain(items[1].name);
  });
});
