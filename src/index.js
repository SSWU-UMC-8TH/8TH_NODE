import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { handleUserSignUp } from "./controllers/user.controller.js";
import { handleStoreCreate } from "./controllers/store.controller.js";
import { createReview } from "./controllers/review.controller.js";
import { handleMissionCreate } from "./controllers/mission.controller.js";
import { handleChallengeMission } from "./controllers/challenge_mission.controller.js"
dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors()); // cors 방식 허용
app.use(express.static("public")); // 정적 파일 접근
app.use(express.json()); // request의 본문을 json으로 해석할 수 있도록 함 (JSON 형태의 요청 body를 파싱하기 위함)
app.use(express.urlencoded({ extended: false })); // 단순 객체 문자열 형태로 본문 데이터 해석

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/api/v1/users/signup", handleUserSignUp);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.post("/api/v1/stores", handleStoreCreate);

app.post("/api/v1/reviews", createReview);

app.post("/api/v1/missions", handleMissionCreate);

app.use("/api/v1/challenge-missions", handleChallengeMission);