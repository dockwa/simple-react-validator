class SimpleReactValidator {
  constructor(options = {}, language = 'en', languageConstructor) {
    this.fields = {};
    this.errorMessages = {};
    this.messagesShown = false;
    let messages= null;
    if( language='custom' ){
      if(typeof languageConstructor === "object"){
        messages= messageMerger(languageConstructor)
      } else{
        messages= languageSelector('en');
      }
    }else{
      messages= languageSelector(language);
    }
    this.rules = {
      accepted             : {message: messages.accepted             ,        rule: val => val === true, required: true},
      after                : {message: messages.after                ,        rule: (val, params) => this.helpers.momentInstalled() && moment.isMoment(val) && val.isAfter(params[0], 'day'), messageReplace: (message, params) => message.replace(':date', params[0].format('MM/DD/YYYY'))},
      after_or_equal       : {message: messages.after_or_equal       ,        rule: (val, params) => this.helpers.momentInstalled() && moment.isMoment(val) && val.isSameOrAfter(params[0], 'day'), messageReplace: (message, params) => message.replace(':date', params[0].format('MM/DD/YYYY'))},
      alpha                : {message: messages.alpha                ,        rule: val => this.helpers.testRegex(val,/^[A-Z]*$/i)},
      alpha_space          : {message: messages.alpha_space          ,        rule: val => this.helpers.testRegex(val,/^[A-Z\s]*$/i)},
      alpha_num            : {message: messages.alpha_num            ,        rule: val => this.helpers.testRegex(val,/^[A-Z0-9]*$/i)},
      alpha_num_space      : {message: messages.alpha_num_space      ,        rule: val => this.helpers.testRegex(val,/^[A-Z0-9\s]*$/i)},
      alpha_num_dash       : {message: messages.alpha_num_dash       ,        rule: val => this.helpers.testRegex(val,/^[A-Z0-9_-]*$/i)},
      alpha_num_dash_space : {message: messages.alpha_num_dash_space ,        rule: val => this.helpers.testRegex(val,/^[A-Z0-9_-\s]*$/i)},
      array                : {message: messages.array                ,        rule: val => Array.isArray(val)},
      before               : {message: messages.before               ,        rule: (val, params) => this.helpers.momentInstalled() && moment.isMoment(val) && val.isBefore(params[0], 'day'), messageReplace: (message, params) => message.replace(':date', params[0].format('MM/DD/YYYY'))},
      before_or_equal      : {message: messages.before_or_equal      ,        rule: (val, params) => this.helpers.momentInstalled() && moment.isMoment(val) && val.isSameOrBefore(params[0], 'day'), messageReplace: (message, params) => message.replace(':date', params[0].format('MM/DD/YYYY'))},
      between              : {message: messages.between              ,        rule: (val, params) => this.helpers.size(val, params[2]) >= parseFloat(params[0]) && this.helpers.size(val, params[2]) <= parseFloat(params[1]), messageReplace: (message, params) => message.replace(':min', params[0]).replace(':max', params[1]).replace(':type', this.helpers.sizeText(params[2]))},
      boolean              : {message: messages.boolean              ,        rule: val => val === false || val === true},
      card_exp             : {message: messages.card_exp             ,        rule: val => this.helpers.testRegex(val,/^(([0]?[1-9]{1})|([1]{1}[0-2]{1}))\s?\/\s?(\d{2}|\d{4})$/)},
      card_num             : {message: messages.card_num             ,        rule: val => this.helpers.testRegex(val,/^\d{4}\s?\d{4,6}\s?\d{4,5}\s?\d{0,8}$/)},
      currency             : {message: messages.currency             ,        rule: val => this.helpers.testRegex(val,/^\$?(\d{1,3})(\,?\d{3})*\.?\d{0,2}$/)},
      date                 : {message: messages.date                 ,        rule: val => this.helpers.momentInstalled() && moment.isMoment(val)},
      date_equals          : {message: messages.date_equals          ,        rule: (val, params) => this.helpers.momentInstalled() && moment.isMoment(val) && val.isSame(params[0], 'day'), messageReplace: (message, params) => message.replace(':date', params[0].format('MM/DD/YYYY'))},
      email                : {message: messages.email                ,        rule: val => this.helpers.testRegex(val,/^[A-Z0-9.!#$%&'*+-/=?^_`{|}~]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i)},
      in                   : {message: messages.in                   ,        rule: (val, params) => params.indexOf(val) > -1, messageReplace: (message, params) => message.replace(':values', this.helpers.toSentence(params))},
      integer              : {message: messages.integer              ,        rule: val => this.helpers.testRegex(val,/^\d*$/)},
      max                  : {message: messages.max                  ,        rule: (val, params) => this.helpers.size(val, params[1]) <= parseFloat(params[0]), messageReplace: (message, params) => message.replace(':max', params[0]).replace(':type', this.helpers.sizeText(params[1]))},
      min                  : {message: messages.min                  ,        rule: (val, params) => this.helpers.size(val, params[1]) >= parseFloat(params[0]), messageReplace: (message, params) => message.replace(':min', params[0]).replace(':type', this.helpers.sizeText(params[1]))},
      not_in               : {message: messages.not_in               ,        rule: (val, params) => params.indexOf(val) === -1, messageReplace: (message, params) => message.replace(':values', this.helpers.toSentence(params))},
      not_regex            : {message: messages.not_regex            ,        rule: (val, params) => !this.helpers.testRegex(val, typeof params[0] === 'string' || params[0] instanceof String ? new RegExp(params[0]) : params[0])},
      numeric              : {message: messages.numeric              ,        rule: val => this.helpers.numeric(val)},
      phone                : {message: messages.phone                ,        rule: val => this.helpers.testRegex(val,/^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/)},
      regex                : {message: messages.regex                ,        rule: (val, params) => this.helpers.testRegex(val, typeof params[0] === 'string' || params[0] instanceof String ? new RegExp(params[0]) : params[0])},
      required             : {message: messages.required             ,        rule: val => !this.helpers.isBlank(val), required: true },
      size                 : {message: messages.size                 ,        rule: (val, params) => this.helpers.size(val, params[1]) == parseFloat(params[0]), messageReplace: (message, params) => message.replace(':size', params[0]).replace(':type', this.helpers.sizeText(params[1]))},
      string               : {message: messages.string               ,        rule: val => typeof(val) === typeof('string')},
      typeof               : {message: messages.typeof               ,        rule: (val, params) => typeof(val) === typeof(params[0]), messageReplace: (message, params) => message.replace(':type', typeof(params[0]))},
      url                  : {message: messages.url                  ,        rule: val => this.helpers.testRegex(val,/^(https?|ftp):\/\/(-\.)?([^\s/?\.#-]+\.?)+(\/[^\s]*)?$/i)},
      ...(options.validators || {}),
    };

    // apply default options
    this.messages = options.messages || {};
    this.className = options.className;

    // apply default element
    if (options.element === false) {
      this.element = message => message;
    } else if (options.hasOwnProperty('element')) {
      this.element = options.element;
    } else if (typeof navigator === 'object' && navigator.product === 'ReactNative') {
      this.element = message => message;
    } else {
      this.element = (message, className) => React.createElement('div', {className: (className || this.className || 'srv-validation-message')}, message);
    }
  }

  getErrorMessages() {
    return this.errorMessages;
  }

  showMessages() {
    this.messagesShown = true;
  }

  hideMessages() {
    this.messagesShown = false;
  }

  allValid() {
    for (let key in this.fields) {
      if (this.fieldValid(key) === false) {
        return false;
      }
    }
    return true;
  }

  fieldValid(field) {
    return this.fields.hasOwnProperty(field) && this.fields[field] === true;
  }

  purgeFields() {
    this.fields = {};
    this.errorMessages = {};
  }

  messageWhenPresent(message, options = {}) {
    if (!this.helpers.isBlank(message) && this.messagesShown) {
      return this.helpers.element(message, options);
    }
  }

  messageAlways(field, message, options = {}) {
    console.warn('The messageAlways() method is deprecated in SimpleReactValidator. Please see the documentation and switch to the messageWhenPresent() method.')
    if (message && this.messagesShown) {
      return this.helpers.element(message, options);
    }
  }

  message(field, inputValue, validations, options = {}) {
    this.errorMessages[field] = null;
    this.fields[field] = true;
    if (!Array.isArray(validations)) {
      validations = validations.split('|');
    }
    var rules = options.validators ? {...this.rules, ...options.validators} : this.rules;
    for (let validation of validations) {
      let [value, rule, params] = this.helpers.normalizeValues(inputValue, validation);
      if (!this.helpers.passes(rule, value, params, rules)) {
        this.fields[field] = false;
        let message = this.helpers.message(rule, field, options, rules);

        if (params.length > 0 && rules[rule].hasOwnProperty('messageReplace')) {
          message = rules[rule].messageReplace(message, params);
        }

        this.errorMessages[field] = message;
        if (this.messagesShown) {
          return this.helpers.element(message, options);
        }
      }
    }
  }

  helpers = {
    parent: this,

    passes(rule, value, params, rules) {
      if (!rules.hasOwnProperty(rule)) {
        console.error(`Rule Not Found: There is no rule with the name ${rule}.`);
        return true;
      }
      if (!this.isRequired(rule, rules) && this.isBlank(value)) {
        return true;
      }
      return rules[rule].rule(value, params, this.parent) !== false;
    },

    isRequired(rule, rules) {
      return rules[rule].hasOwnProperty('required') && rules[rule].required;
    },

    isBlank(value) {
      return typeof(value) === 'undefined' || value === null || value === '';
    },

    normalizeValues(value, validation) {
      return [this.valueOrEmptyString(value), this.getValidation(validation), this.getOptions(validation)];
    },

    getValidation(validation) {
      if (validation === Object(validation) && !!Object.keys(validation).length) {
        return Object.keys(validation)[0];
      } else {
        return validation.split(':')[0];
      }
    },

    getOptions(validation) {
      if (validation === Object(validation) && !!Object.values(validation).length) {
        var params = Object.values(validation)[0];
        return Array.isArray(params) ? params : [params];
      } else {
        var params = validation.split(':');
        return params.length > 1 ? params[1].split(',') : [];
      }
    },

    valueOrEmptyString(value) {
      return typeof value === 'undefined' || value === null ? '' : value;
    },

    toSentence(arr) {
      return arr.slice(0, -2).join(', ') +
      (arr.slice(0, -2).length ? ', ' : '') +
      arr.slice(-2).join(arr.length > 2 ? ', or ' : ' or ');
    },

    testRegex(value, regex) {
      return value.toString().match(regex) !== null;
    },

    message(rule, field, options, rules) {
      options.messages = options.messages || {};
      var message = options.messages[rule] || options.messages.default || this.parent.messages[rule] || this.parent.messages.default || rules[rule].message;
      return message.replace(':attribute', this.humanizeFieldName(field));
    },

    humanizeFieldName(field) {
      // supports snake_case or camelCase
      return field.replace( /([A-Z])/g, ' $1' ).replace(/_/g, ' ').toLowerCase();
    },

    element(message, options) {
      var element = options.element || this.parent.element;
      return element(message, options.className);
    },

    numeric(val) {
      return this.testRegex(val,/^(\d+.?\d*)?$/);
    },

    momentInstalled() {
      if (!window || !window.moment) {
        console.warn('Date validators require using momentjs https://momentjs.com and moment objects.');
        return false;
      } else {
        return true;
      }
    },

    size(val, type) {
      // if an array or string get the length, else return the value.
      if (type === 'string' || type === undefined || type === 'array') {
        return val.length;
      } else if (type === 'num') {
        return parseFloat(val);
      }
    },

    sizeText(type) {
      if (type === 'string' || type === undefined) {
        return ' characters';
      } else if (type === 'array') {
        return ' elements';
      } else {
        return '';
      }
    }
  }
}
const defaultMessages = {
  accepted             :'The :attribute must be accepted.',
  after                :'The :attribute must be after :date.',
  after_or_equal       :'The :attribute must be after or on :date.',
  alpha                :'The :attribute may only contain letters.',
  alpha_space          :'The :attribute may only contain letters and spaces.',
  alpha_num            :'The :attribute may only contain letters and numbers.',
  alpha_num_space      :'The :attribute may only contain letters, numbers, and spaces.',
  alpha_num_dash       :'The :attribute may only contain letters, numbers, and dashes.',
  alpha_num_dash_space :'The :attribute may only contain letters, numbers, dashes, and spaces.',
  array                :'The :attribute must be an array.',
  before               :'The :attribute must be before :date.',
  before_or_equal      :'The :attribute must be before or on :date.',
  between              :'The :attribute must be between :min and :max:type.',
  boolean              :'The :attribute must be a boolean.',
  card_exp             :'The :attribute must be a valid expiration date.',
  card_num             :'The :attribute must be a valid credit card number.',
  currency             :'The :attribute must be a valid currency.',
  date                 :'The :attribute must be a date.',
  date_equals          :'The :attribute must be on :date.',
  email                :'The :attribute must be a valid email address.',
  in                   :'The selected :attribute must be :values.',
  integer              :'The :attribute must be an integer.',
  max                  :'The :attribute may not be greater than :max:type.',
  min                  :'The :attribute must be at least :min:type.',
  not_in               :'The selected :attribute must not be :values.',
  not_regex            :'The :attribute must not match the required pattern.',
  numeric              :'The :attribute must be a number.',
  phone                :'The :attribute must be a valid phone number.',
  regex                :'The :attribute must match the required pattern.',
  required             :'The :attribute field is required.',
  size                 :'The :attribute must be :size:type.',
  string               :'The :attribute must be a string.',
  typeof               :'The :attribute is not the correct type of :type.',
  url                  :'The :attribute must be a url.',
}

const frenchMessages = {
accepted             : 'Le champ :attribute doit être accepté.',
after                : 'Le champ :attribute doit être après :date.',
after_or_equal       : 'Le champ :attribute doit correspondre ou bien être après :date.',
alpha                : 'Le champ :attribute ne peut contenir que des lettres.',
alpha_space          : 'Le champ :attribute ne peut contenir que des lettres et des espaces.',
alpha_num            : 'Le champ :attribute ne peut contenir que des lettres et des chiffres.',
alpha_num_space      : 'Le champ :attribute ne peut contenir que des lettres, chiffres, et espaces.',
alpha_num_dash       : 'Le champ :attribute ne peut contenir que des lettres, chiffres, et tirets.',
alpha_num_dash_space : 'Le champ :attribute ne peut contenir que des lettres, chiffres, tirets, et espaces.',
array                : 'Le champ :attribute doit êttre un tableau.',
before               : 'Le champ :attribute doit être avant :date.',
before_or_equal      : 'Le champ :attribute doit correspondre ou bien être avant  :date.',
between              : 'Le champ :attribute doit être entre :min et :max:type.',
boolean              : 'Le champ :attribute doit être booléen.',
card_exp             : "Le champ :attribute doit être une date d'expiration valide.", 
card_num             : 'Le champ :attribute doit être un numéro valide de carte de crédit .',
currency             : 'Le champ :attribute doit être une devise valide.',
date                 : 'Le champ :attribute doit être une date.',
date_equals          : 'Le champ :attribute doit correspondre à :date.',
email                : 'Le champ :attribute doit êre une adresse email valide.',
in                   : 'Le champ selectionné :attribute doit être :values.',
integer              : 'Le champ :attribute doit être un entier.',
max                  : 'Le champ :attribute ne doit pas dépasser :max:type.',
min                  : 'Le champ :attribute doit au moins être :min:type.',
not_in               : 'Le champ selectionné :attribute ne doit pas être :values.',
not_regex            : 'Le champ :attribute ne doit pas correspondre au motif requis.',
numeric              : 'Le champ :attribute doit être un chiffre.',
phone                : 'Le champ :attribute doit être un numéro de téléphone valide.',
regex                : 'Le champ :attribute doit correspondre au motif requis.',
required             : 'Le champ :attribute est requis.',
size                 : 'Le champ :attribute doit être :size:type.',
string               : 'Le champ :attribute doit être une chaîne.',
typeof               : "Le champ :attribute n'est pas le type correcte de :type.",
url                  : 'Le champ :attribute doit être un url.',
}
const languageSelector = (language) => {
if( language === 'fr'){
    return frenchMessages
}
return defaultMessages
}
const messageMerger = (customLanguage) => {
  const englishMessages = defaultMessages;
  const customMessages = {
      accepted             : customLanguage.accepted             ||          englishMessages.accepted            ,
      after                : customLanguage.after                ||          englishMessages.after               ,
      after_or_equal       : customLanguage.after_or_equal       ||          englishMessages.after_or_equal      ,
      alpha                : customLanguage.alpha                ||          englishMessages.alpha               ,
      alpha_space          : customLanguage.alpha_space          ||          englishMessages.alpha_space         ,
      alpha_num            : customLanguage.alpha_num            ||          englishMessages.alpha_num           ,
      alpha_num_space      : customLanguage.alpha_num_space      ||          englishMessages.alpha_num_space     ,
      alpha_num_dash       : customLanguage.alpha_num_dash       ||          englishMessages.alpha_num_dash      ,
      alpha_num_dash_space : customLanguage.alpha_num_dash_space ||          englishMessages.alpha_num_dash_space,
      array                : customLanguage.array                ||          englishMessages.array               ,
      before               : customLanguage.before               ||          englishMessages.before              ,
      before_or_equal      : customLanguage.before_or_equal      ||          englishMessages.before_or_equal     ,
      between              : customLanguage.between              ||          englishMessages.between             ,
      boolean              : customLanguage.boolean              ||          englishMessages.boolean             ,
      card_exp             : customLanguage.card_exp             ||          englishMessages.card_exp            ,
      card_num             : customLanguage.card_num             ||          englishMessages.card_num            ,
      currency             : customLanguage.currency             ||          englishMessages.currency            ,
      date                 : customLanguage.date                 ||          englishMessages.date                ,
      date_equals          : customLanguage.date_equals          ||          englishMessages.date_equals         ,
      email                : customLanguage.email                ||          englishMessages.email               ,
      in                   : customLanguage.in                   ||          englishMessages.in                  ,
      integer              : customLanguage.integer              ||          englishMessages.integer             ,
      max                  : customLanguage.max                  ||          englishMessages.max                 ,
      min                  : customLanguage.min                  ||          englishMessages.min                 ,
      not_in               : customLanguage.not_in               ||          englishMessages.not_in              ,
      not_regex            : customLanguage.not_regex            ||          englishMessages.not_regex           ,
      numeric              : customLanguage.numeric              ||          englishMessages.numeric             ,
      phone                : customLanguage.phone                ||          englishMessages.phone               ,
      regex                : customLanguage.regex                ||          englishMessages.regex               ,
      required             : customLanguage.required             ||          englishMessages.required            ,
      size                 : customLanguage.size                 ||          englishMessages.size                ,
      string               : customLanguage.string               ||          englishMessages.string              ,
      typeof               : customLanguage.typeof               ||          englishMessages.typeof              ,
      url                  : customLanguage.url                  ||          englishMessages.url                 ,
  }
  return customLanguage;
}