import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import auth, { authSaga } from './auth';


const rootReducer = combineReducers({
  auth,
    // 다른 리듀서를 만들게되면 여기에 넣어줌..
});

export function* rootSaga() {
  yield all([authSaga()]);
}

export default rootReducer;
