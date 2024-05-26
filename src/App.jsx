import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom';
import {Helmet} from 'react-helmet-async';
import PostListPage from './pages/PostListPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import WritePage from './pages/WritePage';
import PostPage from './pages/PostPage';
import NotFoundErrorPage from './pages/NotFoundErrorPage';

function App() {
  return (
  <div>
		  <Helmet>
		  <title>triptalk</title>
		  </Helmet>
    <Routes>
      <Route path="/" element={<PostListPage />} />
	    <Route path="/list" element={<PostListPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/write" element={<WritePage />} />
      <Route path="/postlist/:username">
        <Route index element={<PostListPage />} />
        <Route path=":postId" element={<PostPage />} />
      </Route>
	  <Route path="/*" element={<NotFoundErrorPage />} />
    </Routes>
	</div>
  )
}

export default App;
