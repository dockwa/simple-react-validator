// Simple React Validator v1.0.0 | Created By Dockwa | MIT License | 2018
;(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['react'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('react'));
  } else {
    root.SimpleReactValidator = factory(root.React);
  }
}(this, function(React) {
"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SimpleReactValidator =
/*#__PURE__*/
function () {
  function SimpleReactValidator() {
    var _this = this;

    var _options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, SimpleReactValidator);

    _defineProperty(this, "helpers", {
      parent: this,
      validationFailed: function validationFailed(rule, value, options, rules) {
        if ((!rules[rule].hasOwnProperty('required') || !rules[rule].required) && !value) {
          return false;
        }

        return rules[rule].rule.call(this.parent, value, options) === false;
      },
      normalizeValues: function normalizeValues(value, validator) {
        return [this.valueOrEmptyString(value), this.getRule(validator), this.getOptions(validator)];
      },
      getRule: function getRule(validator) {
        return validator.split(':')[0];
      },
      getOptions: function getOptions(validator) {
        var parts = validator.split(':');
        return parts.length > 1 ? parts[1].split(',') : [];
      },
      valueOrEmptyString: function valueOrEmptyString(value) {
        return typeof value === 'undefined' || value === null ? '' : value;
      },
      toSentence: function toSentence(arr) {
        return arr.slice(0, -2).join(', ') + (arr.slice(0, -2).length ? ', ' : '') + arr.slice(-2).join(arr.length > 2 ? ', or ' : ' or ');
      },
      testRegex: function testRegex(value, regex) {
        return value.toString().match(regex) !== null;
      },
      message: function message(rule, field, options) {
        options.messages = options.messages || {};
        var message = options.messages[rule] || options.messages.default || this.parent.messages[rule] || this.parent.messages.default || this.rules[rule].message;
        message.replace(':attribute', field.replace(/_/g, ' '));
        return message;
      },
      element: function element(message, options) {
        var element = options.element || this.parent.element;
        return element(message, options.className);
      },
      numeric: function numeric(val) {
        return this.testRegex(val, /^(\d+.?\d*)?$/);
      }
    });

    this.fields = {};
    this.errorMessages = {};
    this.messagesShown = false;
    this.rules = _objectSpread({
      accepted: {
        message: 'The :attribute must be accepted.',
        rule: function rule(val) {
          return val === true;
        },
        required: true
      },
      alpha: {
        message: 'The :attribute may only contain letters.',
        rule: function rule(val) {
          return _this.helpers.testRegex(val, /^[A-Z]*$/i);
        }
      },
      alpha_num: {
        message: 'The :attribute may only contain letters and numbers.',
        rule: function rule(val) {
          return _this.helpers.testRegex(val, /^[A-Z0-9]*$/i);
        }
      },
      alpha_num_dash: {
        message: 'The :attribute may only contain letters, numbers, and dashes.',
        rule: function rule(val) {
          return _this.helpers.testRegex(val, /^[A-Z0-9_-]*$/i);
        }
      },
      card_exp: {
        message: 'The :attribute must be a valid expiration date.',
        rule: function rule(val) {
          return _this.helpers.testRegex(val, /^(([0]?[1-9]{1})|([1]{1}[0-2]{1}))\s?\/\s?(\d{2}|\d{4})$/);
        }
      },
      card_num: {
        message: 'The :attribute must be a valid credit card number.',
        rule: function rule(val) {
          return _this.helpers.testRegex(val, /^\d{4}\s?\d{4,6}\s?\d{4,5}\s?\d{0,8}$/);
        }
      },
      currency: {
        message: 'The :attribute must be a valid currency.',
        rule: function rule(val) {
          return _this.helpers.testRegex(val, /^\$?(\d{1,3})(\,?\d{3})*\.?\d{0,2}$/);
        }
      },
      email: {
        message: 'The :attribute must be a valid email address.',
        rule: function rule(val) {
          return _this.helpers.testRegex(val, /^[A-Z0-9.!#$%&'*+-/=?^`{|}~]+@[A-Z0-9.-]+.[A-Z]{2,}$/i);
        }
      },
      gt: {
        message: 'The :attribute must be greater than :gt.',
        rule: function rule(val, options) {
          return _this.helpers.numeric(val) ? parseFloat(val) > parseFloat(options[0]) : false;
        },
        messageReplace: function messageReplace(message, options) {
          return message.replace(':gt', options[0]);
        }
      },
      gte: {
        message: 'The :attribute must be greater than or equal to :gte.',
        rule: function rule(val, options) {
          return _this.helpers.numeric(val) ? parseFloat(val) >= parseFloat(options[0]) : false;
        },
        messageReplace: function messageReplace(message, options) {
          return message.replace(':gte', options[0]);
        }
      },
      in: {
        message: 'The selected :attribute must be :values.',
        rule: function rule(val, options) {
          return options.indexOf(val) > -1;
        },
        messageReplace: function messageReplace(message, options) {
          return message.replace(':values', _this.helpers.toSentence(options));
        }
      },
      integer: {
        message: 'The :attribute must be an integer.',
        rule: function rule(val) {
          return _this.helpers.testRegex(val, /^\d?$/);
        }
      },
      lt: {
        message: 'The :attribute must be less than :lt.',
        rule: function rule(val, options) {
          return _this.helpers.numeric(val) ? parseFloat(val) < parseFloat(options[0]) : false;
        },
        messageReplace: function messageReplace(message, options) {
          return message.replace(':lt', options[0]);
        }
      },
      lte: {
        message: 'The :attribute must be less than or equal to :lte.',
        rule: function rule(val, options) {
          return _this.helpers.numeric(val) ? parseFloat(val) <= parseFloat(options[0]) : false;
        },
        messageReplace: function messageReplace(message, options) {
          return message.replace(':lte', options[0]);
        }
      },
      max: {
        message: 'The :attribute may not be greater than :max characters.',
        rule: function rule(val, options) {
          return val.length <= options[0];
        },
        messageReplace: function messageReplace(message, options) {
          return message.replace(':max', options[0]);
        }
      },
      min: {
        message: 'The :attribute must be at least :min characters.',
        rule: function rule(val, options) {
          return val.length >= options[0];
        },
        messageReplace: function messageReplace(message, options) {
          return message.replace(':min', options[0]);
        }
      },
      not_in: {
        message: 'The selected :attribute must not be :values.',
        rule: function rule(val, options) {
          return options.indexOf(val) === -1;
        },
        messageReplace: function messageReplace(message, options) {
          return message.replace(':values', _this.helpers.toSentence(options));
        }
      },
      numeric: {
        message: 'The :attribute must be a number.',
        rule: function rule(val) {
          return _this.helpers.numeric(val);
        }
      },
      phone: {
        message: 'The :attribute must be a valid phone number.',
        rule: function rule(val) {
          return _this.helpers.testRegex(val, /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/);
        }
      },
      required: {
        message: 'The :attribute field is required.',
        rule: function rule(val) {
          return !!val;
        },
        required: true
      },
      url: {
        message: 'The :attribute must be a url.',
        rule: function rule(val) {
          return _this.helpers.testRegex(val, /^(https?|ftp):\/\/(-\.)?([^\s/?\.#-]+\.?)+(\/[^\s]*)?$/i);
        }
      }
    }, _options.validators || {}); // apply default options

    this.messages = _options.messages || {};
    this.className = _options.className; // apply default element

    if (_options.element === false) {
      this.element = function (message, className) {
        return message;
      };
    } else if (_options.hasOwnProperty('element')) {
      this.element = _options.element;
    } else if (navigator.product === "ReactNative") {
      this.element = function (message, className) {
        return message;
      };
    } else {
      this.element = function (message, className) {
        return React.createElement('div', {
          className: _this.className || 'srv-validation-message'
        }, message);
      };
    }
  }

  _createClass(SimpleReactValidator, [{
    key: "getErrorMessages",
    value: function getErrorMessages() {
      return this.errorMessages;
    }
  }, {
    key: "showMessages",
    value: function showMessages() {
      this.messagesShown = true;
    }
  }, {
    key: "hideMessages",
    value: function hideMessages() {
      this.messagesShown = false;
    } // return true if all fields cleared, false if there is a validation error

  }, {
    key: "allValid",
    value: function allValid() {
      for (var key in this.fields) {
        if (this.fieldValid(key) === false) {
          return false;
        }
      }

      return true;
    } // return true if the one field passed in is valid, false if there is an error

  }, {
    key: "fieldValid",
    value: function fieldValid(field) {
      return this.fields.hasOwnProperty(field) && this.fields[field] === true;
    } // if a message is present, generate a validation error react element

  }, {
    key: "customMessage",
    value: function customMessage(message, customClass) {
      if (message && this.messagesShown) {
        return this.element(message);
      }
    }
  }, {
    key: "message",
    value: function message(field, inputValue, validatorString) {
      var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      this.errorMessages[field] = null;
      this.fields[field] = true;
      var validators = validatorString.split('|');
      var rules = options.validators ? _objectSpread({}, this.rules, options.validators) : this.rules;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = validators[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var validator = _step.value;

          var _this$helpers$normali = this.helpers.normalizeValues(inputValue, validator),
              _this$helpers$normali2 = _slicedToArray(_this$helpers$normali, 3),
              value = _this$helpers$normali2[0],
              rule = _this$helpers$normali2[1],
              validatorOptions = _this$helpers$normali2[2];

          if (this.helpers.validationFailed(rule, value, validatorOptions, rules)) {
            this.fields[field] = false;
            var message = this.helpers.message(rule, field, options);
            this.errorMessages[field] = message;

            if (this.messagesShown && validatorOptions.length > 0 && rules[rule].hasOwnProperty('messageReplace')) {
              return this.helpers.element(rules[rule].messageReplace(message, validatorOptions), options);
            } else if (this.messagesShown) {
              return this.helpers.element(message, options);
            }
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }]);

  return SimpleReactValidator;
}();
return SimpleReactValidator;
}));
