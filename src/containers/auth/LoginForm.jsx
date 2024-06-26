import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { changeField, initializeForm, login } from '../../modules/auth';
import { setUser } from '../../modules/user';
import AuthForm from '../../components/auth/AuthForm';
// import { check } from '../../modules/user';

const LoginForm = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  let { form, auth, authError, user } = useSelector(({ auth, user }) => ({
    form: auth.login,
    auth: auth.auth,
    authError: auth.authError,
    user: user.user,
  }));
  const onChange = (e) => {
    const { value, name } = e.target;
    dispatch(
      changeField({
        form: 'login',
        key: name,
        value,
      }),
    );
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { username, password } = form;
    dispatch(login({ username, password }));
  };

  useEffect(() => {
    dispatch(initializeForm('login'));
  }, [dispatch]);

  useEffect(() => {
    if (authError) {
      console.log('오류 발생');
      console.log(authError);
      setError('로그인 실패');
      return;
    }
    if (auth) {
      console.log('로그인 성공');
      // dispatch(check());
      sessionStorage.setItem('hasReloaded', 'true');
      console.log(auth);
      user = auth.user;
      console.log(user);
      try {
        localStorage.setItem('user', JSON.stringify(user));
        dispatch(setUser(user));
        navigate('/');
      } catch (e) {
        console.log('localStorage is not working');
      }
    }
    

  }, [auth, authError, dispatch]);

  // useEffect(() => {
  //   if (user) {
  //     navigate('/');
  //     try {
  //       localStorage.setItem('user', JSON.stringify(user));
  //     } catch (e) {
  //       console.log('localStorage is not working');
  //     }
  //   }
  // }, [navigate, user]);

  return (<div>
    <AuthForm
      type="login"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
    />
    
    </div>

  );
};

export default LoginForm;
