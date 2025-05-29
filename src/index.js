// const express = require('express') -> CommonJS
// ES Module로 변경하자
import express from 'express'
import cors from 'cors'
import dotenv from "dotenv"
// dotenv 라이브러리 => .env 파일로부터 환경 변수를 읽어들이고, 이를 process.env.객체를 통해 접근할 수 있도록 하는 역할을 한다. 
// dotenv.config() 부분이 바로 그 동작을 하는 부분이다. 
import { handleUserSignUp } from './controllers/user.controller.js';
import { handleAddStore, handleListStoreReviews } from './controllers/store.controller.js';
import { handleAddReview, handleShowMyReview } from './controllers/review.controller.js';
import {handleAddMission} from './controllers/mission.controller.js';
import { handleShowStoreMission } from './controllers/store.controller.js';
import { handleCompleteChallenge, handleUserChallengeList } from './controllers/challenges.controller.js';
import { handleAddChallenge } from './controllers/challenges.controller.js';
import swaggerAutogen from 'swagger-autogen';
import swaggerUiExpress from "swagger-ui-express";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import session from "express-session";
import passport from "passport";
import { googleStrategy } from "./auth.config.js";
import { prisma } from "./db.config.js";

dotenv.config();
const app = express();
const port = process.env.PORT;

// sid는 프론트엔드에 저장하고, 이에 연결되는 사용자 데이터는 store를 통해 Prisma로 연결된 우리의 MySQL DB에 저장
app.use(
  session({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // ms
    },
    resave: false,
    saveUninitialized: false,
    secret: process.env.EXPRESS_SESSION_SECRET,
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 2 * 60 * 1000, // ms
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
);

app.use(passport.initialize());
// 일치하는 Session이 있다면 사용자 데이터 가져와 req.user에 넣어주게 됨 
app.use(passport.session());

passport.use(googleStrategy);
passport.serializeUser((user, done) => done(null, user)); // Session에 사용자 정보 저장장
passport.deserializeUser((user, done) => done(null, user)); // Session에서 정보를 가져올 때 


app.use((req, res, next) => {
  res.success = (success) => {
    return res.json({resultType:"SUCCESS", error:null, success});
  };

  res.error = ({errorCode = "unknown", reason=null, data=null}) => {
    return res.json({
      resultType:"FAIL",
      error: {errorCode, reason, data},
      success:null,
    });
  };
  next();
});

app.use(cors()); // cors 방식 허용
app.use(express.static('public')); // 정적 파일 접근
app.use(express.json()); // request의 본문을 json으로 해석할 수 있도록 한다. (JSON 형태의 요청 body를 파싱하기 위함함)
app.use(express.urlencoded({extended:false})); // 단순 객체 문자열 형태로 본문 데이터 해석석

app.get('/', (req, res) => {
  // #swagger.ignore = true
  console.log(req.user);
  res.send('Hello World!');
});

// GET
app.get("/users/:userId/reviews", handleShowMyReview);
app.get("/stores/:storeId/missions", handleShowStoreMission);
app.get("/users/:userId/challenges", handleUserChallengeList);
app.get("/stores/:storeId/reviews",handleListStoreReviews);

// POST
app.post("/users", handleUserSignUp);
app.post("/regions/:regionId/stores", handleAddStore);
app.post("/stores/:storeId/reviews", handleAddReview);
app.post("/stores/:storeId/missions", handleAddMission);
app.post("/missions/:missionId/challenges", handleAddChallenge);

// PATCH
app.patch("/missions/:missionId/complete", handleCompleteChallenge);

app.use((err, req, res, next) => {
  if(res.headersSent) {
    return next(err);
  }

  res.status(err.statusCode || 500).error({
    errorCode:err.errorCode||"unknown",
    reason:err.reason || err.message ||null,
    data:err.data || null,
  });
});

app.use(
  "/docs",
  swaggerUiExpress.serve,
  swaggerUiExpress.setup({}, {
    swaggerOptions:{
      url:"/openapi.json",
    },
  })
);


// 구글 로그인
app.get("/oauth2/login/google", passport.authenticate("google"));
app.get(
  "/oauth2/callback/google",
  passport.authenticate("google", {
    failureRedirect: "/oauth2/login/google",
    failureMessage: true,
  }),
  (req, res) => res.redirect("/")
);


app.get("/openapi.json", async(req, res, next) => {
  // #swagger.ignore = true
  const options = {
    openapi: "3.0.0",
    disableLogs : true,
    writeOutputFile :false,
  };

  const outputFile = "/dev/null"; // 파일 출력은 사용하지 않음 
  const routes = [
    "./src/index.js",
    "./src/controllers/user.controller.js",
    "./src/controllers/store.controller.js",
    "./src/controllers/challenges.controller.js",
    "./src/controllers/review.controller.js",
    "./src/controllers/mission.controller.js"
  ];
  const doc = {
    info: {
      title: "UMC 8th",
      description : "UMC 8th Node.js 테스트 프로젝트입니다."
    },
    host : "localhost:3000",
  };

  const result = await swaggerAutogen(options)(outputFile, routes, doc);
  res.json(result? result.data : null);
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});