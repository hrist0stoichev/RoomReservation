class ErrorHandler {
  constructor(message, showError) {
    this.message = message;
    this.showError = showError;
  }

  catchStep(error) {
    if (error.status === 400) {
      return error.json();
    } else {
      this.showError(`Could not ${this.message}. Try again later.`);
      console.log(error);
    }
  }

  thenStep(error) {
    if (error && error.error_message) {
      this.showError(error.error_message);
    } else {
      this.showError(`Could not ${this.message}. Try again later.`);
    }
  }
}

export default ErrorHandler;