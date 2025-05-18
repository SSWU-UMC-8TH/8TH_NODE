export class AppError extends Error {
  constructor({ errorCode = "unknown", reason = null, data = null, statusCode = 500 }) {
    super(reason);
    this.errorCode = errorCode;
    this.reason = reason;
    this.data = data;
    this.statusCode = statusCode;
  }
}

export class DuplicateUserEmailError extends Error {
  errorCode = "U001";

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

export class MissionCreateError extends AppError {
  constructor(reason = "미션 생성 중 오류 발생", data = null) {
    super({
      errorCode: "M001",
      reason,
      data,
      statusCode: 500,
    });
  }
}

export class StoreCreateError extends AppError {
  constructor(reason = "가게 생성 중 오류 발생", data = null) {
    super({
      errorCode: "S001",
      reason,
      data,
      statusCode: 500,
    });
  }
}

export class ReviewCreateError extends AppError {
  constructor(reason = "리뷰 생성 중 오류 발생", data = null) {
    super({
      errorCode: "R001",
      reason,
      data,
      statusCode: 500,
    });
  }
}
