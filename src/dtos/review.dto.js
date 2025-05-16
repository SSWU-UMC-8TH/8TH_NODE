  // 클라이언트 -> 서버 
  export const bodyToReview = (body, storeId) => {
  
    return {
      userId: body.userId,
      review: body.review,
      score:body.score,
      storeId: parseInt(storeId),
    };
  };

// 서버 -> 클라이언트 
export const responseFromReviewList = (reviews) => {
  return reviews.map((review) => ({
    id:review.id,
    review: review.body,
    score: review.score,
    createdAt: review.createdAt,
    storeName: review.store.name,
    storeAddress: review.store.address,
  }));
};