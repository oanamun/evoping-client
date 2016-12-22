/* global jest, describe, beforeEach, it, expect */

import React from 'react';
import { shallow } from 'enzyme';
import { LoginContainer } from 'modules/login/LoginContainer';

let wrapper;
let loginMock = jest.fn();
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
    LoginContainer.prototype.login = loginMock;
  });
  describe('rendering', () => {
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
      const mockPassEvt = makeMockEvent('password', 'newVal');
      password.simulate('change', mockPassEvt);
      expect(wrapper.state().credentials.password).toBe(mockPassEvt.currentTarget.value);
    });
    it('calls login on button click', () => {
      const loginButton = wrapper.find('Button');
      loginButton.simulate('click');
      expect(loginMock).toBeCalled();
    });
    it('dispatches login', () => {
      const mockDispatch = jest.fn();
      loginMock = jest.fn().mockImplementation(mockDispatch());
      wrapper = shallow(<LoginContainer dispatchLogin={mockDispatch} />);
      const loginButton = wrapper.find('Button');
      loginButton.simulate('click');
      expect(mockDispatch).toHaveBeenCalledTimes(1);
    });
  });
});
