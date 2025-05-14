type ExceptionMonthsage = string;

type ExceptionArguments = {
  min?: number;
  max?: number;
  version?: string;
  format?: string;
};

type ExceptionMonthsages = {
  [exceptionName: string]: (
    prop: string,
    args?: ExceptionArguments,
  ) => ExceptionMonthsage;
};

export const ExceptionMonthsages: ExceptionMonthsages = {
  isNotEmpty: (prop) => `${prop} é obrigatório.`,
  isString: (prop) => `${prop} deve ser uma string.`,
  isAlphanumeric: (prop) => `${prop} deve conter apenas números e letras.`,
  isAlphaWithWhitespaces: (prop) =>
    `${prop} deve conter apenas letras e espaços.`,
  isEmail: (prop) => `${prop} deve ser um email válido.`,
  isNumber: (prop) => `${prop} deve ser um número.`,
  isBoolean: (prop) => `${prop} deve ser um booleano`,
};
