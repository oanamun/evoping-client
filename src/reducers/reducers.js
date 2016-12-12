import { combineReducers } from 'redux';
import { loginStore } from 'modules/login/loginStore';

export default combineReducers({
  login: loginStore,
});
