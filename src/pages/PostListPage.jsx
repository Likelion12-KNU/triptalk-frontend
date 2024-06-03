import HeaderContainer from '../containers/common/HeaderContainer';
import PostListContainer from '../containers/posts/PostListContainer';
import { useEffect } from 'react';

const PostListPage = () => {
  useEffect(() => {
    const hasReloaded = sessionStorage.getItem('hasReloaded');
    
    if (!hasReloaded) {
      sessionStorage.setItem('hasReloaded', 'true');
      window.location.reload();
    }
  }, []);
  return (
    <>
      <HeaderContainer />
      <PostListContainer/>
    </>
  );
};

export default PostListPage;
