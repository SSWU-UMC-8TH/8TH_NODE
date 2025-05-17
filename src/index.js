import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { handleUserSignUp } from "./controllers/user.controller.js";
import { handleCreateStore } from "./controllers/store.controller.js";
import { handleCreateMission, handleListStoreMissions } from "./controllers/mission.controller.js";
import { handleCreateChallenge, handleListUserChallenges, handleCompleteChallenge } from "./controllers/challenge.controller.js";
import { handleCreateReview, handleListStoreReviews, handleListUserReviews } from "./controllers/review.controller.js";


dotenv.config();

const app = express();
const port = process.env.PORT;

// 공통 응답을 사용할 수 있는 헬퍼 함수 등록
app.use((req, res, next) => {
    res.success = (success) => {
        return res.json({ resultType: "SUCCESS", error: null, success });
    };

    res.error = ({ errorCode = "unknown", reason = null, data = null }) => {
        return res.json({
            resultType: "FAIL",
            error: { errorCode, reason, data },
            success: null,
        });
    };

    next();
});

app.use(cors()); // cors 방식 허용
app.use(express.static("public")); // 정적 파일 접근
app.use(express.json()); // request의 본문을 json으로 해석할 수 있도록 함 (JSON 형태의 요청 body를 파싱하기 위함)
app.use(express.urlencoded({ extended: false })); // 단순 객체 문자열 형태로 본문 데이터 해석

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/api/v1/stores/:storeId/reviews", handleListStoreReviews);     // 가게의 리뷰 목록
app.get("/api/v1/users/:userId/reviews", handleListUserReviews);        // 내가 작성한 리뷰 목록
app.get("/api/v1/stores/:storeId/missions", handleListStoreMissions);   // 특정 가게의 미션 목록
app.get("/api/v1/users/:userId/challenges", handleListUserChallenges);  //  내가 진행 중인 미션 목록

app.patch("/api/v1/challenges/:challengeId/complete", handleCompleteChallenge); // 내가 진행 중인 미션을 진행 완료로 바꾸기

app.post("/api/v1/users/signup", handleUserSignUp);
app.post("/api/v1/stores", handleCreateStore);
app.post("/api/v1/stores/:storeId/reviews", handleCreateReview);
app.post("/api/v1/stores/:storeId/missions", handleCreateMission);
app.post("/api/v1/missions/:missionId/challenges", handleCreateChallenge);

// 전역 오류를 처리하기 위한 미들웨어
app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    res.status(err.statusCode || 500).error({
        errorCode: err.errorCode || "unknown",
        reason: err.reason || err.message || null,
        data: err.data || null,
        statusCode: err.statusCode || null,
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});