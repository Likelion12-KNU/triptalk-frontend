import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import Responsive from '../common/Responsive';
import Button from '../common/Button';
import SubInfo from '../common/SubInfo';
import {Link} from 'react-router-dom';

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


const CommendItem = ({commend, user, onEditComment, onDeleteCommend}) => {
	// const {nickname, title, content, id} = post;
	// console.log('commend ', commend);'
	console.log('CommendItem user ', user);
	console.log('CommendItem commend', commend);
	return(
		<CommendItemBlock>
			<p className='commendName'>{commend.nickname}</p> <p>{commend.content}</p> 
			{ user && user.nickname == commend.nickname &&
 			(<><ActionButton onClick={onEditComment} className='editcommend'>수정</ActionButton> 
			<ActionButton onClick={onDeleteCommend} className='deletecommend'>삭제</ActionButton></>)}
		</CommendItemBlock>
	)
}

const CommendList = ({commends, user, onCreateComment, commendValue, commendhandleChange}) => {
	console.log('commends2 ', commends);
	
	return(
	<CommendListBlock>
		<div>
			{commends && (
			<div>
			{commends.map(commend=>(
					<CommendItem user={user} commend={commend} key={commend.id} ></CommendItem>
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