import axios from 'axios';


const client = axios.create({
    baseURL: 'localhost:4000/',
    // baseURL: 'http://api-server.com/,
    // 필요에 따라 추가 옵션 설정
    // timeout: 1000,
    // headers: {'X-Custom-Header': 'foobar'}
});
export default client;
