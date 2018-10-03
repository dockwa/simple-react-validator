// Simple React Validator v0.0.5 | Created By Dockwa | MIT License | 2018
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

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SimpleReactValidator = function () {
  function SimpleReactValidator() {
    var _this = this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, SimpleReactValidator);

    this.fields = {};
    this.errorMessages = {};
    this.messagesShown = false;
    this.rules = _extends({
      accepted: { message: 'The :attribute must be accepted.', rule: function rule(val) {
          return val === true;
        } },
      alpha: { message: 'The :attribute may only contain letters.', rule: function rule(val) {
          return _this._testRegex(val, /^[A-Z]*$/i);
        } },
      alpha_num: { message: 'The :attribute may only contain letters and numbers.', rule: function rule(val) {
          return _this._testRegex(val, /^[A-Z0-9]*$/i);
        } },
      alpha_num_dash: { message: 'The :attribute may only contain letters, numbers, and dashes.', rule: function rule(val) {
          return _this._testRegex(val, /^[A-Z0-9_-]*$/i);
        } },
      card_exp: { message: 'The :attribute must be a valid expiration date.', rule: function rule(val) {
          return _this._testRegex(val, /^(([0]?[1-9]{1})|([1]{1}[0-2]{1}))\s?\/\s?(\d{2}|\d{4})$/);
        } },
      card_num: { message: 'The :attribute must be a valid credit card number.', rule: function rule(val) {
          return _this._testRegex(val, /^\d{4}\s?\d{4,6}\s?\d{4,5}\s?\d{0,8}$/);
        } },
      currency: { message: 'The :attribute must be a valid currency.', rule: function rule(val) {
          return _this._testRegex(val, /^\$?(\d{1,3}(\,?\d{3}))*\.?\d{0,2}$/);
        } },
      decimal: { message: 'The :attribute must be a valid decimal.', rule: function rule(val) {
          return _this._testRegex(val, /^\d*\.?\d*$/);
        } },
      email: { message: 'The :attribute must be a valid email address.', rule: function rule(val) {
          return _this._testRegex(val, /^[A-Z0-9.!#$%&'*+-/=?^`{|}~]+@[A-Z0-9.-]+.[A-Z]{2,}$/i);
        } },
      gt: { message: 'The :attribute must be greater than :gt.', rule: function rule(val, options) {
          return _this._testRegex(val, /^\d+.?\d*$/) ? parseFloat(val) > parseFloat(options[0]) : false;
        }, messageReplace: function messageReplace(message, options) {
          return message.replace(':gt', options[0]);
        } },
      gte: { message: 'The :attribute must be greater than or equal to :gte.', rule: function rule(val, options) {
          return _this._testRegex(val, /^\d+.?\d*$/) ? parseFloat(val) >= parseFloat(options[0]) : false;
        }, messageReplace: function messageReplace(message, options) {
          return message.replace(':gte', options[0]);
        } },
      in: { message: 'The selected :attribute must be :values.', rule: function rule(val, options) {
          return options.indexOf(val) > -1;
        }, messageReplace: function messageReplace(message, options) {
          return message.replace(':values', _this._toSentence(options));
        } },
      integer: { message: 'The :attribute must be an integer.', rule: function rule(val) {
          return _this._testRegex(val, /^\d+$/);
        } },
      lt: { message: 'The :attribute must be less than :lt.', rule: function rule(val, options) {
          return _this._testRegex(val, /^\d+.?\d*$/) ? parseFloat(val) < parseFloat(options[0]) : false;
        }, messageReplace: function messageReplace(message, options) {
          return message.replace(':lt', options[0]);
        } },
      lte: { message: 'The :attribute must be less than or equal to :lte.', rule: function rule(val, options) {
          return _this._testRegex(val, /^\d+.?\d*$/) ? parseFloat(val) <= parseFloat(options[0]) : false;
        }, messageReplace: function messageReplace(message, options) {
          return message.replace(':lte', options[0]);
        } },
      max: { message: 'The :attribute may not be greater than :max characters.', rule: function rule(val, options) {
          return val.length <= options[0];
        }, messageReplace: function messageReplace(message, options) {
          return message.replace(':max', options[0]);
        } },
      min: { message: 'The :attribute must be at least :min characters.', rule: function rule(val, options) {
          return val.length >= options[0];
        }, messageReplace: function messageReplace(message, options) {
          return message.replace(':min', options[0]);
        } },
      not_in: { message: 'The selected :attribute must not be :values.', rule: function rule(val, options) {
          return options.indexOf(val) === -1;
        }, messageReplace: function messageReplace(message, options) {
          return message.replace(':values', _this._toSentence(options));
        } },
      numeric: { message: 'The :attribute must be a number.', rule: function rule(val) {
          return _this._testRegex(val, /^\d+.?\d*$/);
        } },
      phone: { message: 'The :attribute must be a valid phone number.', rule: function rule(val) {
          return _this._testRegex(val, /(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)/);
        } },
      required: { message: 'The :attribute field is required.', rule: function rule(val) {
          return _this._testRegex(val, /.+/);
        } },
      url: { message: 'The :attribute must be a url.', rule: function rule(val) {
          return _this._testRegex(val, /^(https?|ftp):\/\/(-\.)?([^\s/?\.#-]+\.?)+(\/[^\s]*)?$/i);
        } }
    }, options.validators || {});

    // apply default element
    if (options.element === false) {
      this.element = function (message) {
        return message;
      };
    } else if (options.hasOwnProperty('element')) {
      this.element = options.element;
    } else {
      this.element = function (message) {
        return React.createElement('div', { className: options.className || 'text-danger' }, message);
      };
    }
  }

  _createClass(SimpleReactValidator, [{
    key: 'getErrorMessages',
    value: function getErrorMessages() {
      return this.errorMessages;
    }
  }, {
    key: 'showMessages',
    value: function showMessages() {
      this.messagesShown = true;
    }
  }, {
    key: 'hideMessages',
    value: function hideMessages() {
      this.messagesShown = false;
    }

    // return true if all fields cleared, false if there is a validation error

  }, {
    key: 'allValid',
    value: function allValid() {
      for (var key in this.fields) {
        if (this.fieldValid(key) === false) {
          return false;
        }
      }
      return true;
    }

    // return true if the one field passed in is valid, false if there is an error

  }, {
    key: 'fieldValid',
    value: function fieldValid(field) {
      return this.fields.hasOwnProperty(field) && this.fields[field] === true;
    }

    // if a message is present, generate a validation error react element

  }, {
    key: 'customMessage',
    value: function customMessage(message, customClass) {
      if (message && this.messagesShown) {
        return this.element(message);
      }
    }
  }, {
    key: 'message',
    value: function message(field, inputValue, validatorString) {
      var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

      this.errorMessages[field] = null;
      this.fields[field] = true;
      var validators = validatorString.split('|');
      var message;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = validators[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var validator = _step.value;

          var _normalizeValues2 = this._normalizeValues(inputValue, validator),
              _normalizeValues3 = _slicedToArray(_normalizeValues2, 3),
              value = _normalizeValues3[0],
              rule = _normalizeValues3[1],
              validatorOptions = _normalizeValues3[2];

          if (this._runValidation(rule, value, validatorOptions)) {
            this.fields[field] = false;
            message = this.rules[rule].message.replace(':attribute', field.replace(/_/g, ' '));
            if (options.hasOwnProperty('messages')) {
              message = options.messages[rule] || options.messages.default || message;
            }
            this.errorMessages[field] = message;
            if (this.messagesShown) {
              if (validatorOptions.length > 0 && this.rules[rule].hasOwnProperty('messageReplace')) {
                return this.element(this.rules[rule].messageReplace(message, validatorOptions));
              } else {
                return this.element(message);
              }
            }
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }

    // Private Methods

  }, {
    key: '_runValidation',
    value: function _runValidation(rule, value, options) {
      return this.rules[rule].rule.call(this, value, options) === false;
    }
  }, {
    key: '_normalizeValues',
    value: function _normalizeValues(value, validator) {
      return [this._valueOrEmptyString(value), this._getRule(validator), this._getOptions(validator)];
    }
  }, {
    key: '_getRule',
    value: function _getRule(validator) {
      return validator.split(':')[0];
    }
  }, {
    key: '_getOptions',
    value: function _getOptions(validator) {
      var parts = validator.split(':');
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
    key: '_testRegex',
    value: function _testRegex(value, regex) {
      return value.toString().match(regex) !== null;
    }
  }]);

  return SimpleReactValidator;
}();

// this.validator = new SimpleReactValidator({
//   element: (message) => {
//     return React.createElement('div', {className: 'text-danger'}, message);
//     // return <div className="something">{message}</div>;
//   },
//   className: 'text-danger',
//   validators: {
//     ip: { // name the rule
//       message: 'The :attribute must be a valid IP address.', // give a message that will display when there is an error. :attribute will be replaced by the name you supply in calling it.
//       rule: function(val, options) { // return true if it is succeeds and false it if fails validation. the _testRegex method is available to give back a true/false for the regex and given value
//         // check that it is a valid IP address and is not blacklisted
//         return this._testRegex(val,/^(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/i) && options.indexOf(val) === -1
//       }
//     }
//   }
// });

// options should be able to be set on initialize and overridden or added per element basis
// only different option on a message should be the default message
// allow validators to be added via an object as well as string form
// :check: allow setting the base element or removing it entirely
// :check: allow setting a custom class on default element
// add 'any' validator for requiring values in array
// currency validator is broken without comma
return SimpleReactValidator;
}));
