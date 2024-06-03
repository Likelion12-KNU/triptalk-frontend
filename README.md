# triptalk-frontend
5조는 못말려 1학기 마지막 프로젝트  
  
루트 파일에 .env파일을 생성해야합니다.   
다음 아래 내용을 추가합니다. 
---

VITE_API_URL=https://api.example.com  

---

# 일지
## 잡기 어려웠던 에러들 
### 1. postman에서는 되는데,,, 클라이언트 CORS 에러 
코드 뭔가 일단 CORS 다 푼 것 같았는데 에러가 나서 어려웠었는데, 다 푼게 오히려 독이었습니다..  
allowCredentials(true)와 allowedOrigins("*")를 같이 쓰면 CORS 에러가 난다는 사실을 아셨나요,,  
여기서 시간을 좀 썼습니다.  

### 2. postman과 크롬 개발자도구 network에서는 인증 헤더가 보이는데 클라이언트에서는 조작 불가 
exposedHeaders에 Authorization을 추가해야합니다.   
postman에서는 보이는 데 res.headers['인증']에서 안보이니까 너무 헤맸어요  ㅠㅠ     
  
# 시작 방법  
git clone https://github.com/Likelion12-KNU/triptalk-frontend  
cd triptalk-frontend   
npm install  
npm run dev  
  
or  
  
git clone https://github.com/Likelion12-KNU/triptalk-frontend   
cd triptalk-frontend   
pm2 start ./ecosystem.config.cjs   



