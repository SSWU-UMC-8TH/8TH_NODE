// errorCode는 고정된 값을 넣고, 생상자(constructor)를 통해 필요에 따라 오류 데이터를 추가로 담을 수 있도록 구현
export class DuplicateUserEmailError extends Error {
    errorCode = "U001";

    constructor(reason, data) {
        super(reason);
        this.reason = reason;
        this.data = data;
    }
}

export class UserNotFoundError extends Error {
    errorCode = "U002";

    constructor(reason = "존재하지 않는 사용자입니다.", data = null) {
        super(reason);
        this.reason = reason;
        this.data = data;
        this.statusCode = 404;
    }
}

export class InvalidUserIdFormatError extends Error {
    errorCode = "U003";

    constructor(reason = "유효하지 않은 사용자 ID입니다.", data = null) {
        super(reason);
        this.reason = reason;
        this.data = data;
        this.statusCode = 400;
    }
}

export class StoreNotFoundError extends Error {
    errorCode = "U004";

    constructor(reason = "존재하지 않는 가게입니다.", data = null) {
        super(reason);
        this.reason = reason;
        this.data = data;
        this.statusCode = 404;
    }
}

export class InvalidStoreIdFormatError extends Error {
    errorCode = "U005";

    constructor(reason = "유효하지 않은 가게 ID입니다.", data = null) {
        super(reason);
        this.reason = reason;
        this.data = data;
        this.statusCode = 400;
    }
}

export class CompletedMissionError extends Error {
    errorCode = "U006";

    constructor(reason = "이미 완료된 미션입니다.", data = null) {
        super(reason);
        this.reason = reason;
        this.data = data;
        this.statusCode = 400;
    }
}

export class ChallengeNotFoundError extends Error {
    errorCode = "C007";

    constructor(reason = "존재하지 않는 미션입니다.", data = null) {
        super(reason);
        this.reason = reason;
        this.data = data;
        this.statusCode = 404;
    }
}
