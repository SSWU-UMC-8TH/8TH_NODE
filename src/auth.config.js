import dotenv from "dotenv";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { PrismaClient } from "@prisma/client";
import { Strategy as KakaoStrategy } from "passport-kakao";

const prisma = new PrismaClient();

dotenv.config();

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
  if (!email) {
    throw new Error(`profile.email was not found: ${profile}`);
  }

  const user = await prisma.user.findFirst({ where: { email } });
  if (user !== null) {
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


// Kakao Strategy 설정
export const kakaoStrategy = new KakaoStrategy(
  {
    clientID: process.env.PASSPORT_KAKAO_CLIENT_ID,
    clientSecret: process.env.PASSPORT_KAKAO_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/oauth2/callback/kakao",
  },
  async (accessToken, refreshToken, profile, done) => {
    try {

      const email = profile._json.kakao_account?.email;
      if (!email) {
        throw new Error("Kakao email not found");
      }

      const nickname = profile._json.kakao_account?.profile?.nickname;
      let user = await prisma.user.findFirst({ where: { email } });

      if (!user) {
        user = await prisma.user.create({
          data: {
            email,
            name: nickname || "Kakao User",
            gender: "추후 수정",
            birth: new Date(1970, 0, 1),
            address: "추후 수정",
            detailAddress: "추후 수정",
            phoneNumber: "추후 수정",
          },
        });
      } else if (user.name === "미연동 계정" || user.name === "Kakao User") {
        // 닉네임으로 업데이트
        user = await prisma.user.update({
            where: { email },
            data: { name: nickname || "Kakao User" },
        });
      }
      
      return done(null, { id: user.id, email: user.email, name: user.name });
    } catch (err) {
      return done(err);
    }
  }
);
