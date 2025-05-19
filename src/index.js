// const express = require('express') -> CommonJS
// ES Module로 변경하자
import express from 'express'
import cors from 'cors'
import dotenv from "dotenv"
// dotenv 라이브러리 => .env 파일로부터 환경 변수를 읽어들이고, 이를 process.env.객체를 통해 접근할 수 있도록 하는 역할을 한다. 
// dotenv.config() 부분이 바로 그 동작을 하는 부분이다. 
import { handleUserSignUp } from './controllers/user.controller.js';
import { handleListStoreReviews } from './controllers/store.controller.js';

dotenv.config();

const app = express()
const port = process.env.PORT;

app.use(cors()); // cors 방식 허용
app.use(express.static('public')); // 정적 파일 접근
app.use(express.json()); // request의 본문을 json으로 해석할 수 있도록 한다. (JSON 형태의 요청 body를 파싱하기 위함함)
app.use(express.urlencoded({extended:false})); // 단순 객체 문자열 형태로 본문 데이터 해석석

// 공통 응답을 사용할 수 있는 헬퍼 함수 등록
app.use((req, res, next)=> {
  res.success = (success) => {
    return res.json({resultType:"SUCCESS", error :null, success});
  };

  res.error = ({errorCode = "unknown", reason = null, data = null}) => {
    return res.json({
      resultType:"FAIL", 
      error:{errorCode, reason, data},
      success:null,
    });
  };

  next();
});

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.post("/users", handleUserSignUp);
app.get("/api/v1/stores/:storeId/reviews", handleListStoreReviews);

// 전역 오류를 처리하기 위한 미들웨어
app.use((err, req, res, next) => {
  if(res.headersSent) {
    return next(err);
  }

  res.status(err.statusCode || 500).error({
    errorCode:err.errorCode || "unknown",
    reason:err.reason || err.message || null,
    data: err.data || null,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})