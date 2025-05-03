export const bodyToReview = (body) => {
    return {
      user_id: body.user_id,
      store_id: body.store_id,
      body: body.body,
      score: body.score,
    };
  };
  
  export const responseFromReview = (review) => {
    return {
      id: review.id,
      user_id: review.user_id,
      store_id: review.store_id,
      body: review.body,
      score: review.score,
      createdAt: review.created_at,
    };
  };
  