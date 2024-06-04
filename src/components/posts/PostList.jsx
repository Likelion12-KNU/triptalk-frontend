import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import Responsive from '../common/Responsive';
import Button from '../common/Button';
import SubInfo from '../common/SubInfo';
import {Link} from 'react-router-dom';

const PostListBlock = styled(Responsive)`
	margin-top: 3rem;
	min-height: calc(100vh - 258px - 3rem);
`;

const WritePostButtonWrapper = styled.div`
	display: flex;
	justify-content: flex-end;
	margin-bottom: 3rem;
`;

const PostItemBlock = styled.div`
padding-top: 3rem;
padding-bottom: 3rem;
/*최상단 포스트 padding-top 제외*/
&:first-child{
	padding-top: 0;
}

& + &{
border-top: 1px solid ${palette.gray[2]};
}

h2{
font-size: 2rem;
margin-bottom: 0;
margin-top: 0;
&:hover{
color: ${palette.gray[6]};
}
}
p{
	margin-top: 2rem;
	width: 100%;
	overflow: hidden;
	height: 40px;
}
`
const stripHtmlTags = (html) => {
	const doc = new DOMParser().parseFromString(html, 'text/html');
	return doc.body.textContent || "";
};

const PostItem = ({post}) => {
	let {nickname, title, content, id} = post;

	const plainTextContent = stripHtmlTags(content);
	return(
		<PostItemBlock>
			<h2>
			<Link to={`/postlist/${nickname}/${id}`}>{title}</Link>
			</h2>
			<SubInfo username={nickname} ></SubInfo>
			<p>{plainTextContent}</p>
		</PostItemBlock>
	)
}

const PostList = ({posts, loading, error, showWriteButton}) => {
	if (error){
		return <PostListBlock>에러가 발생하였습니다.</PostListBlock>
	}
	let reversePosts = posts.reverse();
	return(
	<PostListBlock>
		<WritePostButtonWrapper>
			{showWriteButton && (
			<Button to="/write">
			 새글 작성하기
			</Button>
			)}
		</WritePostButtonWrapper>
		<div>
			{!loading && posts && (
			<div>
			{reversePosts.map(post=>(
					<PostItem post={post} key={post.id} ></PostItem>
					))}
			</div>
			)}
		</div>
	</PostListBlock>
	)
}

export default PostList;