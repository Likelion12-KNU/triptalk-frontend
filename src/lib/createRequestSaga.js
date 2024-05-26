import { call, put } from 'redux-saga/effects';
import { startLoading, finishLoading } from '../modules/loading';

// 주어진 액션 타입에 대해 성공과 실패 액션 타입을 생성하여 반환
export const createRequestActionTypes = type => {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;
  return [type, SUCCESS, FAILURE];
};

// 주어진 액션 타입과 요청 함수에 대해 Redux-Saga 제너레이터 함수를 생성합니다.
// 생성된 제너레이터 함수는 비동기 요청을 처리하고, 요청 상태를 관리합니다.
export default function createRequestSaga(type, request) {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;

  return function*(action) {
    yield put(startLoading(type)); // 로딩 시작
    try {
      const response = yield call(request, action.payload);
      yield put({
        type: SUCCESS,
        payload: response.data,
		meta: response,
      });
    } catch (e) {
      yield put({
        type: FAILURE,
        payload: e,
        error: true
      });
    }
    yield put(finishLoading(type)); // 로딩 끝
  };
}
