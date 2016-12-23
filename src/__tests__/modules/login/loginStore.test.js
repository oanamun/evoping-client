/* global jest, describe, beforeEach, it, expect */

import * as loginStore from 'modules/login/LoginStore';

let reducer;

describe('Login Store', () => {
  describe('actions', () => {
    it('should create a LOGIN_SUCCESS action', () => {
    });
    it('should create a LOGIN_ERROR action', () => {

    });
    it('should create a LOGOUT action', () => {
      const expectedAction = {
        type: loginStore.LOGOUT,
      };
      const action = loginStore.logout();
      expect(action).toEqual(expectedAction);
    });
    it('should create a SOCKET_CONNECT action', () => {

    });
  });
  describe('reducer', () => {
    beforeEach(() => {
      reducer = loginStore.loginStore;
    });
    it('should return the initial state', () => {
      expect(reducer(undefined, {})).toEqual(
        {
          loggedInUser: {},
          token: '',
          redirectToHome: false,
          error: false,
        }
      );
    });
    it('should handle LOGIN_SUCCESS', () => {
      expect(reducer(undefined, {
        type: loginStore.LOGIN_SUCCESS,
        payload: { user: 'aUser', token: 'aToken' },
      })).toEqual(
        {
          loggedInUser: {
            user: 'aUser',
            token: 'aToken',
          },
          token: 'aToken',
          redirectToHome: true,
          error: false,
        }
      );
    });
  });
});






