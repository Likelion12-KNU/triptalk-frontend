import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import Responsive from '../common/Responsive';
import Button from '../common/Button';
import SubInfo from '../common/SubInfo';
import {Link} from 'react-router-dom';
import client from '../../lib/api/client';
import { useState } from 'react';

const CommendListBlock = styled(Responsive)`
	margin-top: 3rem;
	min-height: calc(100vh - 258px - 3rem);
	input{
		margin-top: 40px;
		// padding: 0.25rem 0.5rem;
		border: 0px solid ${palette.gray[5]};
		border-bottom: 1px solid ${palette.gray[5]};
		width: 90%;
		height: 30px;
	}
	.createButton{
		margin-left: 10px;
		margin-top: 40px;
	}
	.createZone{
		border-top: 1px solid ${palette.gray[2]};
	}
`;


const CommendItemBlock = styled.div`

// color: ${palette.gray[6]};
border-top: 1px solid ${palette.gray[2]};
height: 50px;
padding-top: 10px;	
position: relative;
p{
	display: inline;
	width: 100%;
	overflow: hidden;
}
.commendName{
	// font-size: 1.5rem;
	
	font-weight: bold;
}
.editcommend{
	right: 50px ;
}
.deletecommend{
	right: 2px;
}
.editCommentInput{
	margin-top: 10px;
	position: relative;
	background: #ffffff;
	width: 100%;
	height: 50px;
	z-index: 999;
	input{
		width: 80%;
		height: 30px;
		margin-top: 10px;
		position: absolute;
	}

	.editSaveButton{
		top: 10px;
		right: 10px;
		position: absolute;
	}
	.editCancelButton{
		top: 10px;
		right: 90px;
		position: absolute;
	
	}
}
`

const ActionButton = styled.button`
	padding: 0.25rem 0.5rem;
	border-radius: 4px;
	color: ${palette.gray[6]};
	font-weight: bold;
	border: none;
	outline: none;
	cursor: pointer;
	justify-content: flex-end;
	&:hover{
		background: ${palette.gray[1]};
		color: ${palette.cyan[7]};
	}
	position: absolute;
	& + &{
		margin-left:0.25rem;
	}

	
`;

const CommendItem = ({commend, user, post, commends, setComments}) => {
// const CommendItem = ({commend, user, onEditComment, onDeleteCommend}) => {
	const [isEditing, setIsEditing] = useState(false);
	const [commentContent, setCommentContent] = useState(commend.content);
	// const {nickname, title, content, id} = post;
	console.log('commend ', commend);
	console.log('CommendItem user ', user);
	console.log('CommendItem commend', commend);

	const onEditComment = async () => {
		setIsEditing(true);
	}
	const onDeleteCommend = async () => {
		try {
			const response = await client.delete(`/api/posts/${commend.postId}/comments/${commend.id}`, {});
			if(response.status === 401){
				alert('로그인이 필요합니다.');
				return;
			}
			setComments(commends.filter(c => c.id !== commend.id));

		} catch (error) {
			console.error('Error:', error);
			alert('댓글 삭제 중 오류가 발생했습니다.');
		}
		// console.log('삭제');
	}
	const onSaveComment = async () => {
		try{
			const updatedContent = commentContent;
			const response = await client.put(`/api/posts/${commend.postId}/comments/${commend.id}`, {content: updatedContent});
			setComments(commends.map(c => c.id === commend.id ? {...c, content: updatedContent} : c));
			setIsEditing(false);
			if(response.status === 401){
				alert('로그인이 필요합니다.');
				return;
			}
		}catch(error){
			console.error('Error:', error);
			alert('댓글 수정 중 오류가 발생했습니다.');
		}
	}
	return(
		<CommendItemBlock>
			<p className='commendName'>{commend.nickname}</p> <p>{commend.content}</p> 
			{ user && user.nickname == commend.nickname && 
 			(<>{ !isEditing && <><ActionButton onClick={onEditComment} className='editcommend'>수정</ActionButton> 
			<ActionButton onClick={onDeleteCommend} className='deletecommend'>삭제</ActionButton></>}
			{isEditing && (
			<div className="editCommentInput">
				<input onChange={(e) => setCommentContent(e.target.value)} type="text" defaultValue={commend.content} />
				<ActionButton className="editSaveButton" onClick={onSaveComment}>수정 완료</ActionButton>
				<ActionButton className="editCancelButton" onClick={() => setIsEditing(false)}>취소</ActionButton>
			</div>
			)}
			
			</>
		)}
		</CommendItemBlock>
	)
}

const CommendList = ({commends, user, onCreateComment, commendValue, commendhandleChange, post, setComments}) => {
	console.log('commends2 ', commends);
	
	return(
	<CommendListBlock>
		<div>
			{commends && (
			<div>
			{commends.map(commend=>(
					<CommendItem commends={commends} post={post} user={user} commend={commend} key={commend.id} setComments={setComments} ></CommendItem>
					))}
			</div>
			)}
		</div>
		<div className='createZone'>
		{
			user && (
			<>
			<input type="text" value={commendValue} onChange={commendhandleChange} placeholder="댓글을 입력하세요"></input>
			<ActionButton onClick={onCreateComment} className='createButton'>등록</ActionButton>
			</>
		)
		}
		</div>
	</CommendListBlock>
	)
}

export default CommendList;