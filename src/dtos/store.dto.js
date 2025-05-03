  // 클라이언트 -> 서버 
  export const bodyToStore = (body) => {
  
    return {
      name: body.name,
      address: body.address,
      regionId: body.regionId,
    };
  };