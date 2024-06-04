import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { readPost, unloadPost } from '../../modules/post';
// import CommentViewer from '../../components/post/PostViewer';
import CommentList from '../../components/posts/CommentList';
import {setOriginalPost} from '../../modules/write';
import {removePost} from '../../lib/api/posts';

const CommentViewerContainer = () => {
  // 처음 마운트될 때 포스트 읽기 API 요청
  let { post, error, loading, user } = useSelector(({ post, loading, user }) => ({
    post: post.post,
    error: post.error,
    loading: loading['post/READ_POST'],
	  user: user,
  }));

	let testcommends = [{
    id: 1,
    postId: 1,
    content: 'test1',
    nickname: 'test1'
  }, {
    id: 2,
    postId: 1,
    content: 'test2',
    nickname: 'test2'
  }, {
    id: 3,
    postId: 1,
    content: 'test3',
    nickname: 'test3'
  },
  {
    id: 4,
    postId: 1,
    content: 'test3',
    nickname: 'soc09072'
  }]
  console.log('testcommends ', testcommends);
  let tempuser = user && typeof user.user === 'string' && JSON.parse(user.user);
  let user_;

  if (typeof user.user === 'string'){
    user_ = user && tempuser;
  }else{
    user_ = user && user.user ;
  }

  return <CommentList user = {user_} commends={testcommends} />;
};

export default CommentViewerContainer;