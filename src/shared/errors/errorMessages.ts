export type ErroMessage = {
  message: string;
  detail: string;
};

export type ErrorMessages = {
  [errorName: string]: ErroMessage;
};
