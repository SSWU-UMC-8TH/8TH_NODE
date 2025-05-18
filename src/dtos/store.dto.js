export const responseFromReviews = (reviews) => {
  return {
    data: reviews,
    pagination: {
      cursor: reviews.length ? reviews[reviews.length - 1].id : null,
    },
  };
};

// 가게 생성 요청 DTO
export const bodyToStoreCreateDto = (body) => {
  const { name, address, description } = body;

  return {
    name,
    address,
    description,
  };
};
