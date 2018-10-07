class SimpleReactValidator {
  constructor(options = {}) {
    this.fields = {};
    this.errorMessages = {};
    this.messagesShown = false;
    this.rules = {
      accepted       : {message: 'The :attribute must be accepted.',                              rule: val => val === true, required: true },
      alpha          : {message: 'The :attribute may only contain letters.',                      rule: val => this.helpers.testRegex(val,/^[A-Z]*$/i) },
      alpha_num      : {message: 'The :attribute may only contain letters and numbers.',          rule: val => this.helpers.testRegex(val,/^[A-Z0-9]*$/i) },
      alpha_num_dash : {message: 'The :attribute may only contain letters, numbers, and dashes.', rule: val => this.helpers.testRegex(val,/^[A-Z0-9_-]*$/i) },
      card_exp       : {message: 'The :attribute must be a valid expiration date.',               rule: val => this.helpers.testRegex(val,/^(([0]?[1-9]{1})|([1]{1}[0-2]{1}))\s?\/\s?(\d{2}|\d{4})$/) },
      card_num       : {message: 'The :attribute must be a valid credit card number.',            rule: val => this.helpers.testRegex(val,/^\d{4}\s?\d{4,6}\s?\d{4,5}\s?\d{0,8}$/) },
      currency       : {message: 'The :attribute must be a valid currency.',                      rule: val => this.helpers.testRegex(val,/^\$?(\d{1,3})(\,?\d{3})*\.?\d{0,2}$/) },
      email          : {message: 'The :attribute must be a valid email address.',                 rule: val => this.helpers.testRegex(val,/^[A-Z0-9.!#$%&'*+-/=?^`{|}~]+@[A-Z0-9.-]+.[A-Z]{2,}$/i) },
      gt             : {message: 'The :attribute must be greater than :gt.',                      rule: (val, options) => this.helpers.numeric(val) ? parseFloat(val) > parseFloat(options[0]) : false, messageReplace: (message, options) => message.replace(':gt', options[0]) },
      gte            : {message: 'The :attribute must be greater than or equal to :gte.',         rule: (val, options) => this.helpers.numeric(val) ? parseFloat(val) >= parseFloat(options[0]) : false, messageReplace: (message, options) => message.replace(':gte', options[0]) },
      in             : {message: 'The selected :attribute must be :values.',                      rule: (val, options) => options.indexOf(val) > -1, messageReplace: (message, options) => message.replace(':values', this.helpers.toSentence(options)) },
      integer        : {message: 'The :attribute must be an integer.',                            rule: val => this.helpers.testRegex(val,/^\d?$/)},
      lt             : {message: 'The :attribute must be less than :lt.',                         rule: (val, options) => this.helpers.numeric(val) ? parseFloat(val) < parseFloat(options[0]) : false, messageReplace: (message, options) => message.replace(':lt', options[0]) },
      lte            : {message: 'The :attribute must be less than or equal to :lte.',            rule: (val, options) => this.helpers.numeric(val) ? parseFloat(val) <= parseFloat(options[0]) : false, messageReplace: (message, options) => message.replace(':lte', options[0]) },
      max            : {message: 'The :attribute may not be greater than :max characters.',       rule: (val, options) => val.length <= options[0], messageReplace: (message, options) => message.replace(':max', options[0]) },
      min            : {message: 'The :attribute must be at least :min characters.',              rule: (val, options) => val.length >= options[0], messageReplace: (message, options) => message.replace(':min', options[0]) },
      not_in         : {message: 'The selected :attribute must not be :values.',                  rule: (val, options) => options.indexOf(val) === -1, messageReplace: (message, options) => message.replace(':values', this.helpers.toSentence(options)) },
      numeric        : {message: 'The :attribute must be a number.',                              rule: val => this.helpers.numeric(val)},
      phone          : {message: 'The :attribute must be a valid phone number.',                  rule: val => this.helpers.testRegex(val,/^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/)},
      regex          : {message: 'The :attribute does not match the required pattern.',           rule: (val, options) => this.helpers.testRegex(val, typeof options[0] === 'string' || options[0] instanceof String ? new RegExp(options[0]) : options[0])},
      required       : {message: 'The :attribute field is required.',                             rule: val => !!val, required: true },
      url            : {message: 'The :attribute must be a url.',                                 rule: val => this.helpers.testRegex(val,/^(https?|ftp):\/\/(-\.)?([^\s/?\.#-]+\.?)+(\/[^\s]*)?$/i) },
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
    } else if (navigator.product === "ReactNative") {
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

  // return true if all fields cleared, false if there is a validation error
  allValid() {
    for (let key in this.fields) {
      if( this.fieldValid(key) === false ) {
        return false;
      }
    }
    return true;
  }

  // return true if the one field passed in is valid, false if there is an error
  fieldValid(field) {
    return this.fields.hasOwnProperty(field) && this.fields[field] === true;
  }

  // if a message is present, generate a validation error react element
  messageAlways(field, message, options = {}) {
    this.errorMessages[field] = null;
    this.fields[field] = true;
    if( message && this.messagesShown){
      this.fields[field] = false;
      this.errorMessages[field] = message;
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
      let [value, rule, validatorOptions] = this.helpers.normalizeValues(inputValue, validation);
      if (!this.helpers.passes(rule, value, validatorOptions, rules)){
        this.fields[field] = false;
        let message = this.helpers.message(rule, field, options, rules);
        this.errorMessages[field] = message;
        if (this.messagesShown && (validatorOptions.length > 0 && rules[rule].hasOwnProperty('messageReplace'))) {
          return this.helpers.element(rules[rule].messageReplace(message, validatorOptions), options);
        } else if (this.messagesShown) {
          return this.helpers.element(message, options);
        }
      }
    }
  }

  helpers = {
    parent: this,

    passes(rule, value, options, rules) {
      if ((!rules[rule].hasOwnProperty('required') || !rules[rule].required) && !value) {
        return true;
      }
      return rules[rule].rule.call(this.parent, value, options) !== false;
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
        var options = Object.values(validation)[0];
        return Array.isArray(options) ? options : [options];
      } else {
        var options = validation.split(':');
        return options.length > 1 ? options[1].split(',') : [];
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
      return message.replace(':attribute', field.replace(/_/g, ' '));
    },

    element(message, options) {
      var element = options.element || this.parent.element;
      return element(message, options.className);
    },

    numeric(val) {
      return this.testRegex(val,/^(\d+.?\d*)?$/);
    }
  }
}
