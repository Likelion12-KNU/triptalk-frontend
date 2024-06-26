import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import Responsive from '../common/Responsive';
import SubInfo from '../common/SubInfo';
import {Helmet} from 'react-helmet-async';

const PostViewerBlock = styled(Responsive)`
position : relative;
min-height: calc(100vh - 258px - 3rem);
margin-top: 4rem;
`;

const PostHead = styled.div`
border-bottom: 1px solid ${palette.gray[2]};
padding-bottom: 3rem;
margin-bottom: 3rem;
h1{
	font-size: 3rem;
	line-height: 1.5;
	margin: 0;
}
`


const PostContent = styled.div`
font-size: 1.3125rem;
color: ${palette.gray[8]};
img{
	max-width: 100%;
	height: auto;

}
`

const PostViewer = ({post, error, loading, actionButtons}) => {
	
	if (error){
		if (error.response && error.response.status === 404){
			return <PostViewerBlock>존재하지 않는 포스트입니다.</PostViewerBlock>
		}
		return <PostViewerBlock>오류 발생!</PostViewerBlock>
	}
	
	if(loading || !post){
		return null;
	}
	const {title, content, nickname} = post;
	return(
	<PostViewerBlock>
		<Helmet>
			<title>{title} 포스트</title>
		</Helmet>
		<PostHead>
			<h1>{title}</h1>
			<SubInfo
				username={nickname}
				hasMarginTop
				/>
		</PostHead>
			{actionButtons}
			<PostContent 
				dangerouslySetInnerHTML={{__html: content}}
				/>
	</PostViewerBlock>
	)
}

export default PostViewer;