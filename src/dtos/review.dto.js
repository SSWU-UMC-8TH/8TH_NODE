// 리뷰 목록 응답 포맷
export const responseFromUserReview = (review) => {
  return {
    reviewId: review.id,
    content: review.content,
    rating: review.rating,
    createdAt: review.createdAt,
    storeName: review.store?.name || null,
    images: review.images?.map((img) => img.imageUrl) || [],
  
  };
};

// 여러 리뷰 리스트 변환
export const responseListFromUserReviews = (reviews) => {
  return reviews.map(responseFromUserReview);
};
