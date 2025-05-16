// const express = require('express') -> CommonJS
// ES Module로 변경하자
import express from 'express'
import cors from 'cors'
import dotenv from "dotenv"
// dotenv 라이브러리 => .env 파일로부터 환경 변수를 읽어들이고, 이를 process.env.객체를 통해 접근할 수 있도록 하는 역할을 한다. 
// dotenv.config() 부분이 바로 그 동작을 하는 부분이다. 
import { handleUserSignUp } from './controllers/user.controller.js';
import { handleAddStore } from './controllers/store.controller.js';
import { handleAddReview, handleShowMyReview } from './controllers/review.controller.js';
import {handleAddMission} from './controllers/mission.controller.js';

dotenv.config();

const app = express()
const port = process.env.PORT;

app.use(cors()); // cors 방식 허용
app.use(express.static('public')); // 정적 파일 접근
app.use(express.json()); // request의 본문을 json으로 해석할 수 있도록 한다. (JSON 형태의 요청 body를 파싱하기 위함함)
app.use(express.urlencoded({extended:false})); // 단순 객체 문자열 형태로 본문 데이터 해석석

app.get('/', (req, res) => {
  res.send('Hello World!')
});

// GET
app.get("/users/:userId/reviews", handleShowMyReview);

// POST
app.post("/users", handleUserSignUp);
app.post("/regions/:regionId/stores", handleAddStore);
app.post("/stores/:storeId/reviews", handleAddReview);
app.post("/stores/:storeId/missions", handleAddMission);
app.post("/missions/:missionId/challenges", handleAddChallenge);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})