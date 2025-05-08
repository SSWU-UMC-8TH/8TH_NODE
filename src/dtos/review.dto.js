  // 클라이언트 -> 서버 
  export const bodyToReview = (body, storeId) => {
  
    return {
      userId: body.userId,
      review: body.review,
      score:body.score,
      storeId: parseInt(storeId),
    };
  };