// Simple React Validator v0.0.1 | Created By Dockwa | MIT License | 2017
;(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['react'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('react'));
  } else {
    root.SimpleReactValidator = factory(root.React);
  }
}(this, function(React) {
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SimpleReactValidator = function () {
  function SimpleReactValidator() {
    var _this = this;

    _classCallCheck(this, SimpleReactValidator);

    this.fields = [];
    this.messagesShown = false;
    this.rules = {
      'accepted': { message: 'The :attribute must be accepted.', rule: function rule(val) {
          return val === true;
        } },
      'alpha': { message: 'The :attribute may only contain letters.', rule: function rule(val) {
          return _this._testRegex(val, /^[A-Z]*$/i);
        } },
      'alpha_num': { message: 'The :attribute may only contain letters and numbers.', rule: function rule(val) {
          return _this._testRegex(val, /^[A-Z0-9]*$/i);
        } },
      'alpha_num_dash': { message: 'The :attribute may only contain letters, numbers, and dashes.', rule: function rule(val) {
          return _this._testRegex(val, /^[A-Z0-9_-]*$/i);
        } },
      'card_exp': { message: 'The :attribute must be a valid expiration date.', rule: function rule(val) {
          return _this._testRegex(val, /^(([0]?[1-9]{1})|([1]{1}[0-2]{1}))\s?\/\s?(\d{2}|\d{4})$/);
        } },
      'card_num': { message: 'The :attribute must be a valid credit card number.', rule: function rule(val) {
          return _this._testRegex(val, /^\d{4}\s?\d{4,6}\s?\d{4,5}\s?\d{0,8}$/);
        } },
      'email': { message: 'The :attribute must be a valid email address.', rule: function rule(val) {
          return _this._testRegex(val, /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i);
        } },
      'gt': { message: 'The :attribute must be greater than :gt.', rule: function rule(val, options) {
          return _this._testRegex(val, /^\d+.?\d*$/) ? parseFloat(val) > parseFloat(options[0]) : false;
        }, messageReplace: function messageReplace(message, options) {
          return message.replace(':gt', options[0]);
        } },
      'gte': { message: 'The :attribute must be greater than or equal to :gte.', rule: function rule(val, options) {
          return _this._testRegex(val, /^\d+.?\d*$/) ? parseFloat(val) >= parseFloat(options[0]) : false;
        }, messageReplace: function messageReplace(message, options) {
          return message.replace(':gte', options[0]);
        } },
      'in': { message: 'The selected :attribute must be :values.', rule: function rule(val, options) {
          return options.indexOf(val) > -1;
        }, messageReplace: function messageReplace(message, options) {
          return message.replace(':values', _this._toSentence(options));
        } },
      'integer': { message: 'The :attribute must be an integer.', rule: function rule(val) {
          return _this._testRegex(val, /^\d+$/);
        } },
      'lt': { message: 'The :attribute must be less than :lt.', rule: function rule(val, options) {
          return _this._testRegex(val, /^\d+.?\d*$/) ? parseFloat(val) < parseFloat(options[0]) : false;
        }, messageReplace: function messageReplace(message, options) {
          return message.replace(':lt', options[0]);
        } },
      'lte': { message: 'The :attribute must be less than or equal to :lte.', rule: function rule(val, options) {
          return _this._testRegex(val, /^\d+.?\d*$/) ? parseFloat(val) <= parseFloat(options[0]) : false;
        }, messageReplace: function messageReplace(message, options) {
          return message.replace(':lte', options[0]);
        } },
      'max': { message: 'The :attribute may not be greater than :max characters.', rule: function rule(val, options) {
          return val.length <= options[0];
        }, messageReplace: function messageReplace(message, options) {
          return message.replace(':max', options[0]);
        } },
      'min': { message: 'The :attribute must be at least :min characters.', rule: function rule(val, options) {
          return val.length >= options[0];
        }, messageReplace: function messageReplace(message, options) {
          return message.replace(':min', options[0]);
        } },
      'not_in': { message: 'The selected :attribute must not be :values.', rule: function rule(val, options) {
          return options.indexOf(val) === -1;
        }, messageReplace: function messageReplace(message, options) {
          return message.replace(':values', _this._toSentence(options));
        } },
      'numeric': { message: 'The :attribute must be a number.', rule: function rule(val) {
          return _this._testRegex(val, /^\d+.?\d*$/);
        } },
      'phone': { message: 'The :attribute must be a valid phone number.', rule: function rule(val) {
          return _this._testRegex(val, /(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)/);
        } },
      'required': { message: 'The :attribute field is required.', rule: function rule(val) {
          return _this._testRegex(val, /.+/);
        } },
      'url': { message: 'The :attribute must be a url.', rule: function rule(val) {
          return _this._testRegex(val, /^(https?|ftp):\/\/(-\.)?([^\s/?\.#-]+\.?)+(\/[^\s]*)?$/i);
        } }
    };
  }

  _createClass(SimpleReactValidator, [{
    key: 'showMessages',
    value: function showMessages() {
      this.messagesShown = true;
    }
  }, {
    key: 'hideMessages',
    value: function hideMessages() {
      this.messagesShown = true;
    }

    // return true if all fields cleared, false if there is a validation error

  }, {
    key: 'allValid',
    value: function allValid() {
      for (var key in this.fields) {
        if (this.fields.hasOwnProperty(key) && this.fields[key] === false) {
          return false;
        }
      }
      return true;
    }

    // if a message is present, show an error message

  }, {
    key: 'customMessage',
    value: function customMessage(message, customClass) {
      if (message && this.messagesShown) {
        return this._reactErrorElement(message, customClass);
      }
    }
  }, {
    key: 'message',
    value: function message(field, value, testString, customClass) {
      var extraOptions = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};

      this.fields[field] = true;
      var tests = testString.split('|');
      var rule, options, message;
      for (var i = 0; i < tests.length; i++) {
        // if the validation does not pass the test
        value = this._valueOrEmptyString(value);
        rule = this._getRule(tests[i]);
        options = this._getOptions(tests[i]);
        // test if the value passes validation
        if (this.rules[rule].rule(value, options) === false) {
          this.fields[field] = false;
          if (this.messagesShown) {
            message = extraOptions[rule] || this.rules[rule].message.replace(':attribute', field.replace('_', ' '));
            if (options.length > 0 && this.rules[rule].hasOwnProperty('messageReplace')) {
              return this._reactErrorElement(this.rules[rule].messageReplace(message, options));
            } else {
              return this._reactErrorElement(message, customClass);
            }
          }
        }
      }
    }

    // Private Methods

  }, {
    key: '_getRule',
    value: function _getRule(type) {
      return type.split(':')[0];
    }
  }, {
    key: '_getOptions',
    value: function _getOptions(type) {
      var parts = type.split(':');
      return parts.length > 1 ? parts[1].split(',') : [];
    }
  }, {
    key: '_valueOrEmptyString',
    value: function _valueOrEmptyString(value) {
      return typeof value === 'undefined' || value === null ? '' : value;
    }
  }, {
    key: '_toSentence',
    value: function _toSentence(arr) {
      return arr.slice(0, -2).join(', ') + (arr.slice(0, -2).length ? ', ' : '') + arr.slice(-2).join(arr.length > 2 ? ', or ' : ' or ');
    }
  }, {
    key: '_reactErrorElement',
    value: function _reactErrorElement(message, customClass) {
      return React.createElement('div', { className: customClass || 'validation-message' }, message);
    }
  }, {
    key: '_testRegex',
    value: function _testRegex(value, regex) {
      return value.toString().match(regex) !== null;
    }
  }]);

  return SimpleReactValidator;
}();
return SimpleReactValidator;
}));
