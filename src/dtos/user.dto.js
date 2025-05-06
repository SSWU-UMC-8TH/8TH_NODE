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
    const preferFoods = preferences.map(
        (preference) => preference.foodCategory.name    // JOIN된 Entity를 거쳐 조회
    );

    return {
        email: user.email,
        name: user.name,
        preferCategory: preferFoods,
    };
};
