import { prisma } from "../db.config.js";

// User 데이터 삽입 (사용자 등록)
export const addUser = async (data) => {
  const user = await prisma.user.findFirst({where:{email:data.email}});

  if(user) {
    return null;
  }
  
  const created = await prisma.user.create({data:data});
  return created.id;
};


// 사용자 정보 얻기 
export const getUser = async (data) => {
  const user = await prisma.user.findFirstOrThrow({where: {id:userId}})
  return user;
};

// 사용자 선호 카테고리 매핑 
export const setPreference = async(userId, foodCategoryId) => {
  await prisma.userFavorCategory.create({
    data:{
      userId: userId,
      foodCategoryId:foodCategoryId,
    }
  })
}

// 사용자 선호 카테고리 반환
export const getUserPreferencesByUserId = async(userId) => {
  const preferences = await prisma.userFavorCategory.findMany({
    select : {
      id:true, // 중간 테이블의 기본키
      userId:true,
      foodCategoryId:true,
      foodCategory:true, // JOIN 
    },
    where : {userId: userId},
    orderBy: {foodCategory: "asc"},
  });

  return preferences;
}