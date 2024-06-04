import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as commentsAPI from '../lib/api/comments';
import { takeLatest } from 'redux-saga/effects';

const [
  LIST_COMMENTS,
  LIST_COMMENTS_SUCCESS,
  LIST_COMMENTS_FAILURE,
] = createRequestActionTypes('comments/LIST_COMMENTS');

export const listPosts = createAction(
	LIST_COMMENTS,
	({username}) => ({username}),
);

// saga 생성
const listCommentsSaga = createRequestSaga(LIST_COMMENTS, commentsAPI.readComments);

export function* commentsSaga() {
  yield takeLatest(LIST_COMMENTS, listCommentsSaga);
}

const initialState = {
  comments: [],
  error: null,
};

const comments = handleActions(
  {
    [LIST_POSTS_SUCCESS]: (state, { payload: posts }) => ({
      ...state,
      posts,
    }),
    // 포스트 작성 실패
    [LIST_POSTS_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
  },
  initialState,
);

export default comments;