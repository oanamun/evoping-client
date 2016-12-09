import { combineReducers } from 'redux';
import { usersStore } from 'modules/users';

export default combineReducers({
  users: usersStore,
});
