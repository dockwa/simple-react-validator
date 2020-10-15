interface IObject {
  [key: string]: any;
}

interface IOptions {
  validators?: IRules;
  messages?: any;
  className?: any;
  autoForceUpdate?: any;
  element?: any;
  locale?: string;
}

type IRule = 'accepted' | 'after' | 'after_or_equal' | 'alpha' | 'alpha_space' | 'alpha_num' | ' alpha_num_space' | 'alpha_num_dash' | 'alpha_num_dash_space' | 'array' | 'before' | 'before_or_equal' | 'between' | 'boolean' | 'card_exp' | 'card_num' | 'currency' | 'date' | 'date_equals' | 'email' | 'in' | 'integer' | 'max' | 'min' | 'not_in' | 'not_regex' | 'numeric' | 'phone' | 'regex' | 'required' | 'size' | 'string' | 'typeof' | 'url';

interface IRules {
  [key: IRule | string]: {
    message: string;
    rule: (val: any, params?: any) => boolean;
  }
}

interface IHelpers {
  parent: any;
  passes(rule: any, value: any, params: any, rules: any): boolean;
  isRequired(rule: any, rules: any): boolean;
  isBlank(value: any): boolean;
  normalizeValues(value: any, validation: any): any;
  getValidation(validation: any): any;
  getOptions(validation: any): any;
  valueOrEmptyString(value: any): any;
  toSentence(arr: any[]): any;
  testRegex(value: any, regex: RegExp): boolean;
  forceUpdateIfNeeded(): void;
  message(rule: any, field: any, options: any, rules: any): any;
  humanizeFieldName(field: string): string;
  element(message: any, options: any): any;
  numeric(val: any): boolean;
  momentInstalled(): boolean;
  size(val: any, type: any): number;
  sizeText(type: any): string;
}

declare class SimpleReactValidator {
  constructor(options?: IOptions);
  fields: IObject;
  visibleFields: any[];
  errorMessages: IObject;
  messagesShown: boolean;
  rules: IRules;

  messages: IOptions["messages"];
  className: IOptions["className"];
  autoForceUpdate: IOptions["autoForceUpdate"];
  element: IOptions["element"];

  getErrorMessages(): IObject;
  showMessages(): void;
  hideMessages(): void;
  showMessageFor(field: string): void;
  hideMessageFor(field: string): void;
  allValid(): boolean;
  fieldValid(field: string): boolean;
  purgeFields(): void;
  messageWhenPresent(message: any, options?: IObject): any;
  messageAlways(field: string, message: any, options?: IObject): any;
  check(inputValue: any, validations: any, options?: IObject): boolean;
  message(field: string, inputValue: any, validations: any, options?: IObject): any;
  helpers: IHelpers;
}

export default SimpleReactValidator;
