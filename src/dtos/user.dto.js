export const bodyToUser = (body) => {
    const birth = new Date(body.birth);
  
    return {
      email: body.email,
      name: body.name,
      gender: body.gender,
      birth,
      address: body.address || "",
      detailAddress: body.detailAddress || "",
      phoneNumber: body.phoneNumber,
      preferences: body.preferences,
    };
  };

  export const responseFromUser = ({ user, preferences }) => {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      gender: user.gender,
      birth: user.birth.toISOString().split('T')[0], // yyyy-mm-dd 형태로 변환
      address: user.address,
      detailAddress: user.detailAddress,
      phoneNumber: user.phoneNumber,
      preferences: preferences.map((pref) => pref.name), // 이름만 추출
    };
  };
  