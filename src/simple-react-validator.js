class SimpleReactValidator {
  constructor(options = {}) {
    this.fields = {};
    this.errorMessages = {};
    this.messagesShown = false;
    this.rules = {
      accepted       : {message: 'The :attribute must be accepted.',                              rule: (val) => val === true },
      alpha          : {message: 'The :attribute may only contain letters.',                      rule: (val) => this.helpers.testRegex(val,/^[A-Z]*$/i) },
      alpha_num      : {message: 'The :attribute may only contain letters and numbers.',          rule: (val) => this.helpers.testRegex(val,/^[A-Z0-9]*$/i) },
      alpha_num_dash : {message: 'The :attribute may only contain letters, numbers, and dashes.', rule: (val) => this.helpers.testRegex(val,/^[A-Z0-9_-]*$/i) },
      card_exp       : {message: 'The :attribute must be a valid expiration date.',               rule: (val) => this.helpers.testRegex(val,/^(([0]?[1-9]{1})|([1]{1}[0-2]{1}))\s?\/\s?(\d{2}|\d{4})$/) },
      card_num       : {message: 'The :attribute must be a valid credit card number.',            rule: (val) => this.helpers.testRegex(val,/^\d{4}\s?\d{4,6}\s?\d{4,5}\s?\d{0,8}$/) },
      currency       : {message: 'The :attribute must be a valid currency.',                      rule: (val) => this.helpers.testRegex(val,/^\$?(\d{1,3})(\,?\d{3})*\.?\d{0,2}$/) },
      decimal        : {message: 'The :attribute must be a valid decimal.',                       rule: (val) => this.helpers.testRegex(val,/^\d*\.?\d*$/) },
      email          : {message: 'The :attribute must be a valid email address.',                 rule: (val) => this.helpers.testRegex(val,/^[A-Z0-9.!#$%&'*+-/=?^`{|}~]+@[A-Z0-9.-]+.[A-Z]{2,}$/i) },
      gt             : {message: 'The :attribute must be greater than :gt.',                      rule: (val, options) => this.helpers.testRegex(val,/^\d+.?\d*$/) ? parseFloat(val) > parseFloat(options[0]) : false, messageReplace: (message, options) => message.replace(':gt', options[0]) },
      gte            : {message: 'The :attribute must be greater than or equal to :gte.',         rule: (val, options) => this.helpers.testRegex(val,/^\d+.?\d*$/) ? parseFloat(val) >= parseFloat(options[0]) : false, messageReplace: (message, options) => message.replace(':gte', options[0]) },
      in             : {message: 'The selected :attribute must be :values.',                      rule: (val, options) => options.indexOf(val) > -1, messageReplace: (message, options) => message.replace(':values', this.helpers.toSentence(options)) },
      integer        : {message: 'The :attribute must be an integer.',                            rule: (val) => this.helpers.testRegex(val,/^\d+$/)},
      lt             : {message: 'The :attribute must be less than :lt.',                         rule: (val, options) => this.helpers.testRegex(val,/^\d+.?\d*$/) ? parseFloat(val) < parseFloat(options[0]) : false, messageReplace: (message, options) => message.replace(':lt', options[0]) },
      lte            : {message: 'The :attribute must be less than or equal to :lte.',            rule: (val, options) => this.helpers.testRegex(val,/^\d+.?\d*$/) ? parseFloat(val) <= parseFloat(options[0]) : false, messageReplace: (message, options) => message.replace(':lte', options[0]) },
      max            : {message: 'The :attribute may not be greater than :max characters.',       rule: (val, options) => val.length <= options[0], messageReplace: (message, options) => message.replace(':max', options[0]) },
      min            : {message: 'The :attribute must be at least :min characters.',              rule: (val, options) => val.length >= options[0], messageReplace: (message, options) => message.replace(':min', options[0]) },
      not_in         : {message: 'The selected :attribute must not be :values.',                  rule: (val, options) => options.indexOf(val) === -1, messageReplace: (message, options) => message.replace(':values', this.helpers.toSentence(options)) },
      numeric        : {message: 'The :attribute must be a number.',                              rule: (val) => this.helpers.testRegex(val,/^\d+.?\d*$/)},
      phone          : {message: 'The :attribute must be a valid phone number.',                  rule: (val) => this.helpers.testRegex(val,/(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)/)},
      required       : {message: 'The :attribute field is required.',                             rule: (val) => this.helpers.testRegex(val,/.+/) },
      url            : {message: 'The :attribute must be a url.',                                 rule: (val) => this.helpers.testRegex(val,/^(https?|ftp):\/\/(-\.)?([^\s/?\.#-]+\.?)+(\/[^\s]*)?$/i) },
      ...(options.validators || {}),
    };

    // apply default messages
    this.messages = options.messages || {};

    // apply default element
    if( options.element === false) {
      this.element = message => message;
    } else if( options.hasOwnProperty('element') ) {
      this.element = options.element;
    } else if (navigator.product === "ReactNative") {
      this.element = message => React.createElement(Text, {}, message);
    } else {
      this.element = message => React.createElement('div', {className: (options.className || 'text-danger')}, message);
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
  customMessage(message, customClass) {
    if( message && this.messagesShown){
      return this.element(message);
    }
  }

  message(field, inputValue, validatorString, options = {}) {
    this.errorMessages[field] = null;
    this.fields[field] = true;
    var validators = validatorString.split('|');
    var message;
    for (let validator of validators) {
      let [value, rule, validatorOptions] = this.helpers.normalizeValues(inputValue, validator);
      if( this.helpers.runValidation(rule, value, validatorOptions) ){
        this.fields[field] = false;
        message = this.rules[rule].message.replace(':attribute', field.replace(/_/g, ' '));
        if( options.hasOwnProperty('messages') ) {
          message = options.messages[rule] || options.messages.default || message;
        }
        this.errorMessages[field] = message;
        if(this.messagesShown){
          if(validatorOptions.length > 0 && this.rules[rule].hasOwnProperty('messageReplace')){
            return this.element(this.rules[rule].messageReplace(message, validatorOptions));
          } else {
            return this.element(message);
          }
        }
      }
    }
  }

  helpers = {
    parent: this,

    runValidation(rule, value, options) {
      return this.parent.rules[rule].rule.call(this.parent, value, options) === false;
    },

    normalizeValues(value, validator) {
      return [this.valueOrEmptyString(value), this.getRule(validator), this.getOptions(validator)];
    },

    getRule(validator) {
      return validator.split(':')[0];
    },

    getOptions(validator) {
      var parts = validator.split(':');
      return parts.length > 1 ? parts[1].split(',') : [];
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
    }
  }
}



// this.validator = new SimpleReactValidator({
//   element: (message) => {
//     return React.createElement('div', {className: 'text-danger'}, message);
//     // return <div className="something">{message}</div>;
//   },
//   className: 'text-danger',
//   validators: {
//     ip: { // name the rule
//       message: 'The :attribute must be a valid IP address.', // give a message that will display when there is an error. :attribute will be replaced by the name you supply in calling it.
//       rule: function(val, options) { // return true if it is succeeds and false it if fails validation. the testRegex method is available to give back a true/false for the regex and given value
//         // check that it is a valid IP address and is not blacklisted
//         return this.helpers.testRegex(val,/^(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/i) && options.indexOf(val) === -1
//       }
//     }
//   }
// });

// options should be able to be set on initialize and overridden or added per element basis
// add messages and default messages to options
// allow validators to be added via an object as well as string form
// :check: allow setting the base element or removing it entirely
// :check: allow setting a custom class on default element
// add 'any' validator for requiring values in array
// :check: currency validator is broken without comma
