export const bodyToMission = (body) => {
    return {
        reward: body.reward,
        deadline: new Date(body.deadline),
        missionSpec: body.missionSpec,
    };
};