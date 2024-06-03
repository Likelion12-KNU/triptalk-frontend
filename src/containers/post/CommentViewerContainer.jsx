import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { readPost, unloadPost } from '../../modules/post';
// import CommentViewer from '../../components/post/PostViewer';
import CommentList from '../../components/posts/CommentList';
import PostActionButtons from '../../components/post/PostActionButtons';
import {setOriginalPost} from '../../modules/write';
import {removePost} from '../../lib/api/posts';

const CommentViewerContainer = () => {
  // 처음 마운트될 때 포스트 읽기 API 요청

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
  }]
  console.log('testcommends ', testcommends);


  return <CommentList commends={testcommends} />;
};

export default CommentViewerContainer;