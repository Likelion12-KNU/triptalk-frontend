import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import Responsive from '../common/Responsive';
import SubInfo from '../common/SubInfo';
import {Helmet} from 'react-helmet-async';

const CommentViewerBlock = styled(Responsive)`
position : relative;
min-height: calc(100vh - 258px - 3rem);
margin-top: 4rem;
`;


const PostViewer = ({post, error, loading,actionButtons}) => {
	
	if (error){
		if (error.response && error.response.status === 404){
			return <PostViewerBlock>존재하지 않는 포스트입니다.</PostViewerBlock>
		}
		return <PostViewerBlock>오류 발생!</PostViewerBlock>
	}
	
	if(loading || !post){
		return null;
	}

	return(
	<CommentViewerBlock>

	</CommentViewerBlock>
	)
}

export default PostViewer;