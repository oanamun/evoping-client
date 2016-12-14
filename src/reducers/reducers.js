import { combineReducers } from 'redux';
import { loginStore } from 'modules/login/loginStore';
import { projectsStore } from 'modules/project/stores/projectsStore';
import { deviceStore } from 'modules/device/stores/deviceStore';

export default combineReducers({
  loginStore,
  projectsStore,
  login: loginStore,
  device: deviceStore,
});
