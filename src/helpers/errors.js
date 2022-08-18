class MainError extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class ValidationError extends MainError {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class UserNotFoundError extends MainError {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class DebitBalansError extends MainError {
  constructor(message) {
    super(message);
    this.status = 401;
  }
}

module.exports = {
  MainError,
  ValidationError,
  UserNotFoundError,
  DebitBalansError,
};
