import dotenv from "dotenv";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as KakaoStrategy } from "passport-kakao";
import { prisma } from "./db.config.js";

dotenv.config();

// google
export const googleStrategy = new GoogleStrategy(
    {
        clientID: process.env.PASSPORT_GOOGLE_CLIENT_ID,
        clientSecret: process.env.PASSPORT_GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/oauth2/callback/google",
        scope: ["email", "profile"],
        state: true,
    },
    (accessToken, refreshToken, profile, cb) => {
        return googleVerify(profile)
            .then((user) => cb(null, user))
            .catch((err) => cb(err));
    }
);

const googleVerify = async (profile) => {
    const email = profile.emails?.[0]?.value;
    // 구글 프로필에서 이메일 정보를 찾을 수 없을 때 에러 던짐
    if (!email) {
        throw new Error(`profile.email was not found: ${profile}`);
    }

    const user = await prisma.user.findFirst({ where: { email } });
    if (user !== null) {
        // 사용자가 존재하지 않는다면 새 유저 생성 후 반환
        return { id: user.id, email: user.email, name: user.name };
    }

    const created = await prisma.user.create({
        data: {
            email,
            name: profile.displayName,
            gender: "추후 수정",
            birth: new Date(1970, 0, 1),
            address: "추후 수정",
            detailAddress: "추후 수정",
            phoneNumber: "추후 수정",
        },
    });

    return { id: created.id, email: created.email, name: created.name };
};

// kakao
passport.use(
    new KakaoStrategy(
        {
            clientID: process.env.KAKAO_REST_API_KEY,
            callbackURL: "http://localhost:3000/oauth2/callback/kakao",
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const email = profile._json.kakao_account?.email;
                if (!email) return done(new Error("Kakao: Email not found"));

                let user = await prisma.user.findFirst({ where: { email } });
                if (!user) {
                    user = await prisma.user.create({
                        data: {
                            email,
                            name: profile.displayName || "카카오유저",
                            gender: "추후 수정",
                            birth: new Date(1970, 0, 1),
                            address: "추후 수정",
                            detailAddress: "추후 수정",
                            phoneNumber: "추후 수정",
                        },
                    });
                }

                done(null, { id: user.id, email: user.email, name: user.name });
            } catch (err) {
                done(err);
            }
        }
    )
);