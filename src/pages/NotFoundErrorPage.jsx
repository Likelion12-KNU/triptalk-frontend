import React from 'react';
// import Footer from '../components/common/Footer';
// import HeaderContainer from '../containers/common/HeaderContainer';
import styled from 'styled-components';
import m101img from '../m101.jpg';
const NotFoundBlock = styled.div`
	// margin-top: 3rem;
	// min-height: calc(100vh - 258px - 3rem);
	.starimg{
		width: 100%;
	}
`;

const NotFoundErrorPage = () => {
	/* 로그인 상태라면 /list로 리다이렉트 ... 할까*/
  return (
    <div>
		  {/* <HeaderContainer/> */}
		  <NotFoundBlock>
			  {/* <img src = 'img/shipimg.png' width="500px"/> */}
			  {/* <br/>
			  존재하지않는 페이지입니다!<br/>
			  주소를 다시 확인해주세요!<br/> */}
			  <h1>
				NotFoundErrorPage
			  </h1>
			  <h2>낫.... 파운드... 에러 페이지</h2>
			  <h3></h3>
			  <img src={m101img} className='starimg'></img>
			  <p>
				m101입니다  <br></br>
				바람개비 은하라고도 합니다 예쁘지않나요 <br></br>
				절대 등급 -21.6등급으로 태양보다 많이 밝고, 망원경과 좋은 날씨가 있다면 볼 수 있습니다. 
			  </p>
			  {/* <m101img></m101img> */}	
			  {/* <Image ></Image> */}
			  {/* <img src=""></img> */}
		  </NotFoundBlock>
		  {/* <Footer/> */}
	 </div>
  );
};

export default NotFoundErrorPage;
