import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { readPost, unloadPost } from '../../modules/post';
import PostViewer from '../../components/post/PostViewer';
import PostActionButtons from '../../components/post/PostActionButtons';
import {setOriginalPost} from '../../modules/write';
import {removePost} from '../../lib/api/posts';

const PostViewerContainer = () => {
  // 처음 마운트될 때 포스트 읽기 API 요청
  const { postId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let { post, error, loading, user } = useSelector(({ post, loading, user }) => ({
    post: post.post,
    error: post.error,
    loading: loading['post/READ_POST'],
	  user: user,
  }));

  useEffect(() => {
    dispatch(readPost(postId));
    // 언마운트될 때 리덕스에서 포스트 데이터 없애기
    return () => {
      dispatch(unloadPost());
    };
  }, [dispatch, postId]);
  const onEdit = () => {
	  dispatch(setOriginalPost(post));
	  navigate('/write');
  };
	
  const onRemove = async () => {
	  try{
		  await removePost(postId);
		  navigate('/'); //홈으로 이동
	  }catch(e){
		  console.log(e);
	  }
  }
  console.log('user ', user);
  console.log('post ',post);
  let tempuser = user && typeof user.user === 'string' && JSON.parse(user.user);
  console.log('tempuser ',tempuser);
  let ownPost;
  if (typeof user.user === 'string'){
    ownPost = (user && tempuser.nickname) === (post && post.nickname);
  }else{
    ownPost = (user && user.user && user.user.nickname) === (post && post.nickname);
  }
  
	
  return <PostViewer post={post} loading={loading} error={error} 
			 actionButtons={ownPost && <PostActionButtons onEdit={onEdit} onRemove={onRemove}/>}
			 />;
};

export default PostViewerContainer;