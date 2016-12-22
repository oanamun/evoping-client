/* global jest, describe, beforeEach, it, expect */

import React from 'react';
import { shallow, mount } from 'enzyme';
import { LoginContainer } from 'modules/login/LoginContainer';

let wrapper;
function makeMockEvent(name, value) {
  return {
    currentTarget: {
      name,
      value,
    },
  };
}
describe('<LoginContainer />', () => {
  beforeEach(() => {
    wrapper = shallow(<LoginContainer />);
  });
  describe('renders correctly', () => {
    it('renders without exploding', () => {
      expect(wrapper.length).toBe(1);
    });
    it('renders form, container and button', () => {
      expect(wrapper.find('.container').length).toBe(1);
      expect(wrapper.find('Form').length).toBe(1);
      expect(wrapper.find('Button').length).toBe(1);
    });
    it('renders an error message if credentials are incorrect', () => {
      wrapper = shallow(<LoginContainer error={true} />); //eslint-disable-line
      expect(wrapper.find('.text-danger').length).toBe(1);
    });
  });
  describe('logic', () => {
    it('updates email on input changes', () => {
      const email = wrapper.find('#email');
      const mockEmailEvt = makeMockEvent('email', 'newVal');
      email.simulate('change', mockEmailEvt);
      expect(wrapper.state().credentials.email).toBe(mockEmailEvt.currentTarget.value);
    });
    it('updates password on input changes', () => {
      const password = wrapper.find('#password');
      const mockpasswordEvt = makeMockEvent('password', 'newVal');
      password.simulate('change', mockpasswordEvt);
      expect(wrapper.state().credentials.password).toBe(mockpasswordEvt.currentTarget.value);
    });
    it.skip('calls login on button click', () => {
      const loginButton = wrapper.find('Button');
      const loginMock = jest.fn();
      LoginContainer.prototype.login = loginMock;
      loginButton.simulate('click');
      expect(loginMock).toBeCalled();
    });
  });
});
