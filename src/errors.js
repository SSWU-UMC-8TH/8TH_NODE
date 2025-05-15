// errorCode는 고정된 값을 넣고, 생상자(constructor)를 통해 필요에 따라 오류 데이터를 추가로 담을 수 있도록 구현
export class DuplicateUserEmailError extends Error {
    errorCode = "U001";

    constructor(reason, data) {
        super(reason);
        this.reason = reason;
        this.data = data;
    }
}