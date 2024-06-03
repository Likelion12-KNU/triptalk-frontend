import React, { useEffect } from 'react';
import WriteActionButtons from '../../components/write/WriteActionButtons';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { writePost, updatePost } from '../../modules/write';

const WriteActionButtonsContainer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { title, content, post, postError, originalPostId } = useSelector(({ write }) => ({
    title: write.title,
    content: write.content,
    post: write.post,
    postError: write.postError,
	originalPostId: write.originalPostId,
  }));

  // 포스트 등록
  const onPublish = () => {
	if(originalPostId){	
      dispatch(
        updatePost({
          title,
          content,
		      id: originalPostId,
        }),
      );
	  return;
	}
    dispatch(
      writePost({
        title,
        content,
      }),
    );
  };

  // 취소
  const onCancel = () => {
    navigate(-1);
  };

  // 성공 혹은 실패시 할 작업
  useEffect(() => {
    if (post) {
      const { id, user, nickname } = post;
      console.log(user);
      navigate(`/postlist/${nickname}/${id}`);
    }
    if (postError) {
      console.log(postError);
    }
  }, [navigate, post, postError]);
  return <WriteActionButtons onPublish={onPublish} onCancel={onCancel} 
			 isEdit={!!originalPostId}/>;
};

export default WriteActionButtonsContainer;
