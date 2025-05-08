  // 클라이언트 -> 서버 
  export const bodyToStore = (body, regionId) => {
  
    return {
      name: body.name,
      address: body.address,
      regionId: parseInt(regionId),
    };
  };