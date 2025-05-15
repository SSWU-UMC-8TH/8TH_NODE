  // 클라이언트 -> 서버 
  export const bodyToStore = (body, regionId) => {
  
    return {
      name: body.name,
      address: body.address,
      regionId: parseInt(regionId),
    };
  };

  export const responseFromReviews = (reviews) => {
    return {
      data: reviews,
      pagination: {
        cursor: reviews.length ? reviews[reviews.length - 1].id : null,
      },
    };
  };

  // userStoreReview 쿼리 작성하기!!!!!!!!!!!!!!!!!!!!