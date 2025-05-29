import dotenv from "dotenv";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { prisma } from "./db.config.js";
import { Strategy as KakaoStrategy } from "passport-kakao";
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
    if(!email){
        throw new Error(`profile.email was not fount : ${profile}`);
    }

    const user = await prisma.user.findFirst({
        where : {email}
    });
    if(user !== null){
        return {id:user.id, email : user.email, name:user.name};
    }

    const created = await prisma.user.create({
        data: {
            email, 
            name:profile.displayName,
            gender:"추후 수정",
            birth: new Date(1970, 0,1),
            address: "추후 수정",
            detailAddress:"추후 수정",
            phoneNumber: "추후 수정",
        },
    });

    return {id : created.id, email: created.email, name: created.name};
};

export const kakaoStrategy = new KakaoStrategy(
    {
        clientID: process.env.KAKAO_CLIENT_ID,
        callbackURL : process.env.KAKAO_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
        try{
            const user={
                id:profile.id,
                provider:"kakao",
                nickname: profile.username || profile.displayName,
                email:profile._json?.kakao_account?.email || null,
            };
            return done(null, user);
        } catch(err){
            return done(err);
        }
    }
);