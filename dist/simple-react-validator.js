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
    this.showErrors = false;
    this.rules = {
      'required': { message: 'This field is required', rule: function rule(val) {
          return _this._testRegex(val, /.+/);
        } },
      'true': { message: 'You must check the check box', rule: function rule(val) {
          return val === true;
        } },
      'email': { message: 'Please enter a valid email address', rule: function rule(val) {
          return _this._testRegex(val, /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i);
        } },
      'number': { message: 'Please enter a number', rule: function rule(val) {
          return _this._testRegex(val, /^\d+$/);
        } },
      'float': { message: 'Please enter a number', rule: function rule(val) {
          return _this._testRegex(val, /^\d+.?\d*$/);
        } },
      'alpha_num': { message: 'Please enter only letters or numbers', rule: function rule(val) {
          return _this._testRegex(val, /^[A-Z0-9]*$/i);
        } },
      'alpha_num_under': { message: 'Please enter only letters or numbers', rule: function rule(val) {
          return _this._testRegex(val, /^[A-Z0-9_]*$/i);
        } },
      'same': { message: 'Please enter a valid expiration date', rule: function rule(val) {
          return _this._testRegex(val, /^(([0]?[1-9]{1})|([1]{1}[0-2]{1}))\s?\/\s?\d{2}$/);
        } },
      'card_expiration': { message: 'Please enter a valid expiration date', rule: function rule(val) {
          return _this._testRegex(val, /^(([0]?[1-9]{1})|([1]{1}[0-2]{1}))\s?\/\s?\d{2}$/);
        } },
      'card_number': { message: 'Please enter a valid credit card number', rule: function rule(val) {
          return _this._testRegex(val, /^\d{4}\s{1}\d{4,6}\s{1}\d{4,5}\s?\d{0,8}$/);
        } },
      'min': { message: 'Please enter :MIN: or more characters', rule: function rule(val, options) {
          return val.length >= options[0];
        }, messageReplace: function messageReplace(message, options) {
          return message.replace(':MIN:', options[0]);
        } },
      'max': { message: 'Please enter no more than :MAX: characters', rule: function rule(val, options) {
          return val.length <= options[0];
        }, messageReplace: function messageReplace(message, options) {
          return message.replace(':MAX:', options[0]);
        } }
    };
  }

  _createClass(SimpleReactValidator, [{
    key: 'displayErrors',
    value: function displayErrors(boolean) {
      this.showErrors = boolean || true;
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
      if (message) {
        return this._reactErrorElement(message, customClass);
      }
    }
  }, {
    key: 'message',
    value: function message(field, value, testString, customClass) {
      this.fields[field] = true;
      var tests = testString.split('|');
      var rule;
      var options;
      for (var i = 0; i < tests.length; i++) {
        // if the validation does not pass the test
        value = this._valueOrEmptyString(value);
        rule = this._getRule(tests[i]);
        options = this._getOptions(tests[i]);
        // test if the value passes validation
        if (this.rules[rule].rule(value, options) === false) {
          this.fields[field] = false;
          if (this.showErrors === true) {
            if (options.length > 0 && this.rules[rule].hasOwnProperty('messageReplace')) {
              return this._reactErrorElement(this.rules[rule].messageReplace(this.rules[rule].message, options));
            } else {
              return this._reactErrorElement(this.rules[rule].message, customClass);
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
