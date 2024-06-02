import { createAction, handleActions } from 'redux-actions';
import {produce} from 'immer';
import { call, put, takeLatest } from 'redux-saga/effects';
import createRequestSaga, {
  createRequestActionTypes
} from '../lib/createRequestSaga';
import * as authAPI from '../lib/api/auth';

const CHANGE_FIELD = 'auth/CHANGE_FIELD';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';

const [REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE] = createRequestActionTypes(
  'auth/REGISTER'
);

const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = createRequestActionTypes(
  'auth/LOGIN'
);
const AUTH_DELETE = 'auth/AUTH_DELETE';

export const changeField = createAction(
  CHANGE_FIELD,
  ({ form, key, value }) => ({
    form, // register , login
    key, // username, password, passwordConfirm
    value // 실제 바꾸려는 값
  })
);
export const initializeForm = createAction(INITIALIZE_FORM, form => form); // register / login
export const register = createAction(REGISTER, ({ username, password, email, nickname }) => ({
  username,
  password,
  email,
  nickname
}));
export const login = createAction(LOGIN, ({ username, password }) => ({
  username,
  password
}));

export const authDelete = createAction(AUTH_DELETE);

// saga 생성
const registerSaga = createRequestSaga(REGISTER, authAPI.signup);
// const loginSaga = createRequestSaga(LOGIN, authAPI.login);

function* loginSaga(action) {
  try {
    const response = yield call(authAPI.login, action.payload);
    yield put({ type: LOGIN_SUCCESS, payload: response.data, response: response, token:response.headers['authorization'] || response.headers.get('Authorization')});
  } catch (e) {
    yield put({ type: LOGIN_FAILURE, payload: e, error: true });
  }
}


export function* authSaga() {
  yield takeLatest(REGISTER, registerSaga);
  yield takeLatest(LOGIN, loginSaga);
}

const initialState = {
  register: {
    username: '',
    password: '',
    passwordConfirm: ''
  },
  login: {
    username: '',
    password: ''
  },
  auth: null,
  authError: null
};

const auth = handleActions(
  {
    [CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>
      produce(state, draft => {
        draft[form][key] = value; // 예: state.register.username을 바꾼다
      }),
    [INITIALIZE_FORM]: (state, { payload: form }) => ({
      ...state,
      [form]: initialState[form],
      authError: null // 폼 전환 시 회원 인증 에러 초기화
    }),
    // 회원가입 성공
    [REGISTER_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      authError: null,
      auth
    }),
    // 회원가입 실패
    [REGISTER_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error
    }),
    // 로그인 성공
    [LOGIN_SUCCESS]: (state, { payload: auth, response, token}) => {
      // 로컬스토리지에 토큰 저장
      localStorage.setItem('token',token);
      // console.log('response', response);
      // console.log('token1', token);      
      return {
        ...state,
        authError: null,
        auth
      };
    },
    // 로그인 실패
    [LOGIN_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error
    }),
    [AUTH_DELETE]: (state) => ({
      ...state,
      auth: null,
    })
  },
  initialState
);

export default auth;
