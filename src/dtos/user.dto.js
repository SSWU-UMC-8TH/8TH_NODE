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
      birth: user.birth,
      address: user.address,
      detailAddress: user.detailAddress,
      phoneNumber: user.phoneNumber,
      preferences: preferences || [],
      createdAt: user.created_at,
      updatedAt: user.updated_at,
    };
  };