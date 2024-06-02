import axios from 'axios';
import { API_URL } from '../../config';

const client = axios.create({
    // baseURL: 'localhost:4000/',
    baseURL: `${API_URL}`,
    // baseURL: 'http://api-server.com/,
    // 필요에 따라 추가 옵션 설정
    // timeout: 1000,
    // headers: {'X-Custom-Header': 'foobar'}
});

// 요청 인터셉터 설정
client.interceptors.request.use(
    (config) => {
      // 로컬스토리지에서 토큰 가져오기
      const token = localStorage.getItem('token');
      if (token) {
        // 토큰이 있으면 요청 헤더에 토큰 추가
        config.headers.Authorization = `${token}`;
      }
      return config;
    },
    (error) => {
      // 요청 오류가 발생하면 그대로 반환
      return Promise.reject(error);
    }
  );

export default client;
