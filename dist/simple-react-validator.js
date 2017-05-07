// Simple React Validator v0.0.1 | Created By Dockwa | MIT License | 2017
;(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['react'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('react'));
  } else {
    root.Simple-react-validator = factory(root.React);
  }
}(this, function(React) {
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SimpleReactValidator = function () {
  function SimpleReactValidator() {
    _classCallCheck(this, SimpleReactValidator);

    this.fields = [];
    this.showErrors = false;
    this.typeRules = {
      'required': { message: 'This field is required', rule: function rule(val) {
          return this._runRegex(val, /.+/);
        } },
      'required_checkbox': { message: 'You must check the check box', rule: function rule(val) {
          return val === true;
        } },
      'email': { message: 'Please enter a valid email address', rule: function rule(val) {
          return this._runRegex(val, /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i);
        } },
      'number': { message: 'Please enter a number', rule: function rule(val) {
          return this._runRegex(val, /^\d+$/);
        } },
      'alpha_num': { message: 'Please enter only letters or numbers', rule: function rule(val) {
          return this._runRegex(val, /^[A-Z0-9]*$/i);
        } },
      'alpha_num_under': { message: 'Please enter only letters or numbers', rule: function rule(val) {
          return this._runRegex(val, /^[A-Z0-9_]*$/i);
        } },
      'expiration': { message: 'Please enter a valid expiration date', rule: function rule(val) {
          return this._runRegex(val, /^(([0]?[1-9]{1})|([1]{1}[0-2]{1}))\s?\/\s?\d{2}$/);
        } },
      'credit-card': { message: 'Please enter a valid credit card number', rule: function rule(val) {
          return this._runRegex(val, /^\d{4}\s{1}\d{4,6}\s{1}\d{4,5}\s?\d{0,8}$/);
        } },
      'min': { message: 'Please enter :REPLACE: or more characters', rule: function rule(val, option) {
          return val.length >= option;
        } },
      'max': { message: 'Please enter no more than :REPLACE: characters', rule: function rule(val, option) {
          return val.length <= option;
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
        if (this.fields.hasOwnProperty(key)) {
          if (this.fields[key] === false) {
            return false;
          }
        }
      }
      return true;
    }
  }, {
    key: 'message',
    value: function message(field, value, typeString, className) {
      this.fields[field] = true;
      var types = typeString.split('|');
      var parts;
      var lastParts;
      for (var i = 0; i < types.length; i++) {
        // if the validation does not pass the test
        value = typeof value === 'undefined' || value === null ? '' : value;
        parts = types[i].split(':');
        lastParts = types[i].split(':');
        lastParts.shift();
        // pass in the value being tested and any parts after the rule being specified
        if (this.typeRules[parts[0]].rule.apply(this, [value].concat(lastParts)) === false) {
          this.fields[field] = false;
          if (this.showErrors === true) {
            if (parts.length > 1) {
              return this._errorHTML(this.typeRules[parts[0]].message.replace(':REPLACE:', parts[1]), className);
            } else {
              return this._errorHTML(this.typeRules[parts[0]].message, className);
            }
          }
        }
      }
    }
  }, {
    key: 'customMessage',
    value: function customMessage(message, className) {
      if (isset(message)) {
        return this._errorHTML(message, className);
      }
    }
  }, {
    key: '_errorHTML',
    value: function _errorHTML(message, className) {
      var name = "form-error-message";
      if (isset(className)) {
        name += " " + className;
      }
      return React.createElement('div', { className: name }, message);
    }
  }, {
    key: '_runRegex',
    value: function _runRegex(value, regex) {
      return value.toString().match(regex) !== null;
    }
  }]);

  return SimpleReactValidator;
}();
return SimpleReactValidator;
}));
