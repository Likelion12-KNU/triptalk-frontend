import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import PostViewerContainer from '../containers/post/PostViewerContainer';
import CommentViewerContainer from '../containers/post/CommentViewerContainer';
const PostPage = () => {
  return (
  <div>
	<HeaderContainer></HeaderContainer>
	<PostViewerContainer></PostViewerContainer>
  <CommentViewerContainer></CommentViewerContainer>
  </div>
  );
};

export default PostPage;
