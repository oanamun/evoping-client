import { combineReducers } from 'redux';
import { loginStore } from 'modules/login/loginStore';
import { projectsStore } from 'modules/project/stores/projectsStore';
import { checkStore } from 'modules/checks/stores/checkStore';

export default combineReducers({
  loginStore,
  projectsStore,
  checkStore,
});
