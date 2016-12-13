import { combineReducers } from 'redux';
import { loginStore } from 'modules/login/loginStore';
import { projectsStore } from 'modules/project/stores/projectsStore';

export default combineReducers({
  loginStore,
  projectsStore,
});
