/* global describe, it, expect */

import React from 'react';
import { shallow } from 'enzyme';

import TitleSection from '_components/TitleSection';

describe('<TitleSection />', () => {
  it('Renders without exploding', () => {
    expect(shallow(<TitleSection />).length).toEqual(1);
  });
});
