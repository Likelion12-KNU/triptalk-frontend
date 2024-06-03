import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as postsAPI from '../lib/api/posts';
import { takeLatest } from 'redux-saga/effects';

const [
  READ_POST,
  READ_POST_SUCCESS,
  READ_POST_FAILURE,
] = createRequestActionTypes('post/READ_POST');

const UNLOAD_POST = 'post/UNLOAD_POST'; // 포스트페이지에서 벗어날때 데이터 비우기 그래야 나중에 깜박임이 안생긴다.

export const readPost = createAction(READ_POST, id => id);
export const unloadPost = createAction(UNLOAD_POST);

// saga 생성
const readPostSaga = createRequestSaga(READ_POST, postsAPI.readPost);

export function* postSaga() {
  yield takeLatest(READ_POST, readPostSaga);
}

const initialState = {
  post: null,
  error: null,
};

const post = handleActions(
  {
    [READ_POST_SUCCESS]: (state, { payload: post }) => ({
      ...state,
      post,
    }),
    // 포스트 작성 실패
    [READ_POST_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
	[UNLOAD_POST]: () => initialState,
  },
  initialState,
);

export default post;

// export const writeComment = ({ id, content }) =>
//     client.post(`/api/posts/${id}`, {content});
  
//   export const readComment = id => 
//       client.get(`/api/posts/${id}/commnets`);
    
//   export const updateComment = ({postId, commentId, content}) => 
//     client.put(`/api/posts/${postId}/comments/${commentId}`, {
//       content,
//   });
    
//   export const removeComment = ({postId, commentId}) => 
//       client.delete(`/api/posts/${postId}/comments/${commentId}`);