export const bodyToReview = (body) => {
    return {
        userId: body.userId,
        body: body.body,
        score: body.score,
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