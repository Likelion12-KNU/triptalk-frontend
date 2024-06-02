import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../../components/common/Header';
import { logout } from '../../modules/user';
import { authDelete } from '../../modules/auth';

const HeaderContainer = () => {
  // const { user } = useSelector(({ user }) => ({ user: user.nickname }));
  let { user } = useSelector(({ user }) => ({ user: user.user }));
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(logout());
    dispatch(authDelete());
  };
  // console.log(user);
  // if(user){

  // }else{
  //   isuser = localStorage.getItem('user');
  //   console.log(isuser);
  //   if(!isuser){
  //     user = isuser;
  //   }
  // }
  // console.log("user", user);
  // console.log(1);
  if(user){
    user = JSON.parse(user);
  }
  return <Header user={user} onLogout={onLogout} />;
};

export default HeaderContainer;
