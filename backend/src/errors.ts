export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, ValidationError.prototype)
  }
}

export class AuthenticationError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, AuthenticationError.prototype)
  }
}

export class DocNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, DocNotFoundError.prototype)
  }
}

export class DocExistsError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, DocExistsError.prototype)
  }
}

