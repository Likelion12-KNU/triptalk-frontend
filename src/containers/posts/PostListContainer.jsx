import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';
import PostList from '../../components/posts/PostList';
import {listPosts} from '../../modules/posts';

const PostListContainer = () => {
	const {username} = useParams();
	const [searchParams] = useSearchParams();
	const dispatch = useDispatch();
	const {posts, error, loading, user} = useSelector(
	({posts, loading, user}) => ({
		posts: posts.posts,
		error: posts.error,
		loading: loading['posts/LIST_POSTS'],
		user: user.user,
	}),
	);
	
	useEffect(() => {
		dispatch(listPosts({username}));
		
	}, [dispatch, searchParams, username]);
	
	return(
	<PostList
		loading={loading}
		error={error}
		posts={posts}
		showWriteButton={user}
		></PostList>
	);
};
// showWriteButton={user} 일캐하면 user가 유효할때 포스트를 작성하는 버튼이 생긴다. 

export default PostListContainer;