// 사용자 추가 후, 사용자가 제대로 추가되었다면 선호하는 음식 카테고리 연결해주는 코드 
import { responseFromUser } from "../dtos/user.dto.js";
import {
  addUser,
  getUser,
  getUserPreferencesByUserId,
  setPreference,
} from "../repositories/user.repository.js";
import { DuplicateUserEmailError } from "../error.js";

// 프론트에서 보낸 회원가입 요청 데이터를 인자로 받음 
export const userSignUp = async (data) => {
  // addUser 함수로 사용자 정보를 DB에 저장하고, 삽입된 유저의 ID를 받아옴 
  const joinUserId = await addUser({
    email: data.email,
    name: data.name,
    gender: data.gender,
    birth: data.birth,
    address: data.address,
    detailAddress: data.detailAddress,
    phoneNumber: data.phoneNumber,
  });
  
  // 같은 이메일이 존재한다면 addUser()에서 null을 반환
  if (joinUserId === null) {
    throw new DuplicateUserEmailError("이미 존재하는 이메일입니다.", data);
  }

  for (const preference of data.preferences) {
    await setPreference(joinUserId, preference);
  }

  // 새로 만든 유저 정보 다시 가져오기 
  const user = await getUser(joinUserId); 
  // 사용자 ID 기준으로 등록된 선호 카테고리 정보(한식/중식 등)을 가져옴
  const preferences = await getUserPreferencesByUserId(joinUserId); 

  // DB에서 가져온 데이터를 프론트에서 보기 좋게 정리해서 리턴해주는 함수(responseFromUser())
  return responseFromUser({ user, preferences });
};