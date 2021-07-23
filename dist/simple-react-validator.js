// Simple React Validator v1.6.1 | Created By Dockwa | MIT License | 2017 - Present
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

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SimpleReactValidator = /*#__PURE__*/function () {
  function SimpleReactValidator() {
    var _this = this;

    var _options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, SimpleReactValidator);

    _defineProperty(this, "showMessageFor", function (field) {
      if (!_this.visibleFields.includes(field)) {
        _this.visibleFields.push(field);
      }

      _this.helpers.forceUpdateIfNeeded();
    });

    _defineProperty(this, "hideMessageFor", function (field) {
      var index = _this.visibleFields.indexOf(field);

      if (index > -1) {
        _this.visibleFields.splice(index, 1);
      }

      _this.helpers.forceUpdateIfNeeded();
    });

    _defineProperty(this, "helpers", {
      parent: this,
      passes: function passes(rule, value, params, rules) {
        if (!rules.hasOwnProperty(rule)) {
          console.error("Rule Not Found: There is no rule with the name ".concat(rule, "."));
          return true;
        }

        if (!this.isRequired(rule, rules) && this.isBlank(value)) {
          return true;
        }

        return rules[rule].rule(value, params, this.parent) !== false;
      },
      isRequired: function isRequired(rule, rules) {
        return rules[rule].hasOwnProperty('required') && rules[rule].required;
      },
      isBlank: function isBlank(value) {
        return typeof value === 'undefined' || value === null || this.testRegex(value, /^[\s]*$/);
      },
      normalizeValues: function normalizeValues(value, validation) {
        return [this.valueOrEmptyString(value), this.getValidation(validation), this.getOptions(validation)];
      },
      getValidation: function getValidation(validation) {
        if (validation === Object(validation) && !!Object.keys(validation).length) {
          return Object.keys(validation)[0];
        } else {
          return validation.split(':')[0];
        }
      },
      getOptions: function getOptions(validation) {
        if (validation === Object(validation) && !!Object.values(validation).length) {
          var params = Object.values(validation)[0];
          return Array.isArray(params) ? params : [params];
        } else {
          var params = validation.split(':');
          return params.length > 1 ? params[1].split(',') : [];
        }
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
      forceUpdateIfNeeded: function forceUpdateIfNeeded() {
        if (this.parent.autoForceUpdate) {
          this.parent.autoForceUpdate.forceUpdate();
        }
      },
      message: function message(rule, field, options, rules) {
        options.messages = options.messages || {};
        var message = options.messages[rule] || options.messages["default"] || this.parent.messages[rule] || this.parent.messages["default"] || rules[rule].message;
        return message.replace(':attribute', this.humanizeFieldName(field));
      },
      humanizeFieldName: function humanizeFieldName(field) {
        // supports snake_case or camelCase
        return field.replace(/([A-Z])/g, ' $1').replace(/_/g, ' ').toLowerCase();
      },
      element: function element(message, options) {
        var element = options.element || this.parent.element;
        return element(message, options.className);
      },
      momentInstalled: function momentInstalled() {
        if (!window || !window.moment) {
          console.warn('Date validators require using momentjs https://momentjs.com and moment objects.');
          return false;
        } else {
          return true;
        }
      },
      size: function size(val, type) {
        // if an array or string get the length, else return the value.
        if (type === 'string' || type === undefined || type === 'array') {
          return val.length;
        } else if (type === 'num') {
          return parseFloat(val);
        }
      },
      sizeText: function sizeText(type) {
        if (type === 'string' || type === undefined) {
          return ' characters';
        } else if (type === 'array') {
          return ' elements';
        } else {
          return '';
        }
      }
    });

    this.fields = {};
    this.visibleFields = [];
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
      after: {
        message: 'The :attribute must be after :date.',
        rule: function rule(val, params) {
          return _this.helpers.momentInstalled() && moment.isMoment(val) && val.isAfter(params[0], 'day');
        },
        messageReplace: function messageReplace(message, params) {
          return message.replace(':date', params[0].format('MM/DD/YYYY'));
        }
      },
      after_or_equal: {
        message: 'The :attribute must be after or on :date.',
        rule: function rule(val, params) {
          return _this.helpers.momentInstalled() && moment.isMoment(val) && val.isSameOrAfter(params[0], 'day');
        },
        messageReplace: function messageReplace(message, params) {
          return message.replace(':date', params[0].format('MM/DD/YYYY'));
        }
      },
      alpha: {
        message: 'The :attribute may only contain letters.',
        rule: function rule(val) {
          return _this.helpers.testRegex(val, /^[A-Z]*$/i);
        }
      },
      alpha_space: {
        message: 'The :attribute may only contain letters and spaces.',
        rule: function rule(val) {
          return _this.helpers.testRegex(val, /^[A-Z\s]*$/i);
        }
      },
      alpha_num: {
        message: 'The :attribute may only contain letters and numbers.',
        rule: function rule(val) {
          return _this.helpers.testRegex(val, /^[A-Z0-9]*$/i);
        }
      },
      alpha_num_space: {
        message: 'The :attribute may only contain letters, numbers, and spaces.',
        rule: function rule(val) {
          return _this.helpers.testRegex(val, /^[A-Z0-9\s]*$/i);
        }
      },
      alpha_num_dash: {
        message: 'The :attribute may only contain letters, numbers, and dashes.',
        rule: function rule(val) {
          return _this.helpers.testRegex(val, /^[A-Z0-9_-]*$/i);
        }
      },
      alpha_num_dash_space: {
        message: 'The :attribute may only contain letters, numbers, dashes, and spaces.',
        rule: function rule(val) {
          return _this.helpers.testRegex(val, /^[A-Z0-9_-\s]*$/i);
        }
      },
      array: {
        message: 'The :attribute must be an array.',
        rule: function rule(val) {
          return Array.isArray(val);
        }
      },
      before: {
        message: 'The :attribute must be before :date.',
        rule: function rule(val, params) {
          return _this.helpers.momentInstalled() && moment.isMoment(val) && val.isBefore(params[0], 'day');
        },
        messageReplace: function messageReplace(message, params) {
          return message.replace(':date', params[0].format('MM/DD/YYYY'));
        }
      },
      before_or_equal: {
        message: 'The :attribute must be before or on :date.',
        rule: function rule(val, params) {
          return _this.helpers.momentInstalled() && moment.isMoment(val) && val.isSameOrBefore(params[0], 'day');
        },
        messageReplace: function messageReplace(message, params) {
          return message.replace(':date', params[0].format('MM/DD/YYYY'));
        }
      },
      between: {
        message: 'The :attribute must be between :min and :max:type.',
        rule: function rule(val, params) {
          return _this.helpers.size(val, params[2]) >= parseFloat(params[0]) && _this.helpers.size(val, params[2]) <= parseFloat(params[1]);
        },
        messageReplace: function messageReplace(message, params) {
          return message.replace(':min', params[0]).replace(':max', params[1]).replace(':type', _this.helpers.sizeText(params[2]));
        }
      },
      "boolean": {
        message: 'The :attribute must be a boolean.',
        rule: function rule(val) {
          return val === false || val === true;
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
      date: {
        message: 'The :attribute must be a date.',
        rule: function rule(val) {
          return _this.helpers.momentInstalled() && moment.isMoment(val);
        }
      },
      date_equals: {
        message: 'The :attribute must be on :date.',
        rule: function rule(val, params) {
          return _this.helpers.momentInstalled() && moment.isMoment(val) && val.isSame(params[0], 'day');
        },
        messageReplace: function messageReplace(message, params) {
          return message.replace(':date', params[0].format('MM/DD/YYYY'));
        }
      },
      email: {
        message: 'The :attribute must be a valid email address.',
        rule: function rule(val) {
          return _this.helpers.testRegex(val, /^[A-Z0-9.!#$%&'*+-/=?^_`{|}~]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i);
        }
      },
      "in": {
        message: 'The selected :attribute must be :values.',
        rule: function rule(val, params) {
          return params.includes(val);
        },
        messageReplace: function messageReplace(message, params) {
          return message.replace(':values', _this.helpers.toSentence(params));
        }
      },
      integer: {
        message: 'The :attribute must be an integer.',
        rule: function rule(val) {
          return _this.helpers.testRegex(val, /^\-?\d*$/);
        }
      },
      max: {
        message: 'The :attribute may not be greater than :max:type.',
        rule: function rule(val, params) {
          return _this.helpers.size(val, params[1]) <= parseFloat(params[0]);
        },
        messageReplace: function messageReplace(message, params) {
          return message.replace(':max', params[0]).replace(':type', _this.helpers.sizeText(params[1]));
        }
      },
      min: {
        message: 'The :attribute must be at least :min:type.',
        rule: function rule(val, params) {
          return _this.helpers.size(val, params[1]) >= parseFloat(params[0]);
        },
        messageReplace: function messageReplace(message, params) {
          return message.replace(':min', params[0]).replace(':type', _this.helpers.sizeText(params[1]));
        }
      },
      not_in: {
        message: 'The selected :attribute must not be :values.',
        rule: function rule(val, params) {
          return !params.includes(val);
        },
        messageReplace: function messageReplace(message, params) {
          return message.replace(':values', _this.helpers.toSentence(params));
        }
      },
      not_regex: {
        message: 'The :attribute must not match the required pattern.',
        rule: function rule(val, params) {
          return !_this.helpers.testRegex(val, typeof params[0] === 'string' || params[0] instanceof String ? new RegExp(params[0]) : params[0]);
        }
      },
      numeric: {
        message: 'The :attribute must be a number.',
        rule: function rule(val) {
          return _this.helpers.testRegex(val, /^\-?\d*\.?\d+$/);
        }
      },
      phone: {
        message: 'The :attribute must be a valid phone number.',
        rule: function rule(val) {
          return _this.helpers.testRegex(val, /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)$/) && !_this.helpers.testRegex(val, /^\b(\d)\1{8,}\b$/);
        }
      },
      regex: {
        message: 'The :attribute must match the required pattern.',
        rule: function rule(val, params) {
          return _this.helpers.testRegex(val, typeof params[0] === 'string' || params[0] instanceof String ? new RegExp(params[0]) : params[0]);
        }
      },
      required: {
        message: 'The :attribute field is required.',
        rule: function rule(val) {
          return !_this.helpers.isBlank(val);
        },
        required: true
      },
      size: {
        message: 'The :attribute must be :size:type.',
        rule: function rule(val, params) {
          return _this.helpers.size(val, params[1]) == parseFloat(params[0]);
        },
        messageReplace: function messageReplace(message, params) {
          return message.replace(':size', params[0]).replace(':type', _this.helpers.sizeText(params[1]));
        }
      },
      string: {
        message: 'The :attribute must be a string.',
        rule: function rule(val) {
          return _typeof(val) === _typeof('string');
        }
      },
      "typeof": {
        message: 'The :attribute is not the correct type of :type.',
        rule: function rule(val, params) {
          return _typeof(val) === _typeof(params[0]);
        },
        messageReplace: function messageReplace(message, params) {
          return message.replace(':type', _typeof(params[0]));
        }
      },
      url: {
        message: 'The :attribute must be a url.',
        rule: function rule(val) {
          return _this.helpers.testRegex(val, /^https?:\/\/[-a-z0-9@:%._\+~#=]{1,256}\.[a-z0-9()]{2,13}\b([-a-z0-9()@:%_\+.~#?&//=]*)$/i);
        }
      }
    }, _options.validators || {}); // apply language

    if (_options.locale && !SimpleReactValidator.locales.hasOwnProperty(_options.locale)) {
      console.warn('Locale not found! Make sure it is spelled correctly and the locale file is loaded.');
    }

    var locale = SimpleReactValidator.locales[_options.locale] || {};
    Object.keys(this.rules).forEach(function (key) {
      _this.rules[key].message = locale[key] || _this.rules[key].message;
    }); // apply default options

    this.messages = _options.messages || {};
    this.className = _options.className;
    this.autoForceUpdate = _options.autoForceUpdate || false; // apply default element

    if (_options.element === false) {
      this.element = function (message) {
        return message;
      };
    } else if (_options.hasOwnProperty('element')) {
      this.element = _options.element;
    } else if ((typeof navigator === "undefined" ? "undefined" : _typeof(navigator)) === 'object' && navigator.product === 'ReactNative') {
      this.element = function (message) {
        return message;
      };
    } else {
      this.element = function (message, className) {
        return React.createElement('div', {
          className: className || _this.className || 'srv-validation-message'
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
      this.helpers.forceUpdateIfNeeded();
    }
  }, {
    key: "hideMessages",
    value: function hideMessages() {
      this.messagesShown = false;
      this.helpers.forceUpdateIfNeeded();
    }
  }, {
    key: "allValid",
    value: function allValid() {
      for (var key in this.fields) {
        if (this.fieldValid(key) === false) {
          return false;
        }
      }

      return true;
    }
  }, {
    key: "fieldValid",
    value: function fieldValid(field) {
      return this.fields.hasOwnProperty(field) && this.fields[field] === true;
    }
  }, {
    key: "purgeFields",
    value: function purgeFields() {
      this.fields = {};
      this.errorMessages = {};
    }
  }, {
    key: "messageWhenPresent",
    value: function messageWhenPresent(message) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (!this.helpers.isBlank(message) && this.messagesShown) {
        return this.helpers.element(message, options);
      }
    }
  }, {
    key: "messageAlways",
    value: function messageAlways(field, message) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      console.warn('The messageAlways() method is deprecated in SimpleReactValidator. Please see the documentation and switch to the messageWhenPresent() method.');

      if (message && this.messagesShown) {
        return this.helpers.element(message, options);
      }
    }
  }, {
    key: "check",
    value: function check(inputValue, validations) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      if (!Array.isArray(validations)) {
        validations = validations.split('|');
      }

      var rules = options.validators ? _objectSpread(_objectSpread({}, this.rules), options.validators) : this.rules;

      var _iterator = _createForOfIteratorHelper(validations),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var validation = _step.value;

          var _this$helpers$normali = this.helpers.normalizeValues(inputValue, validation),
              _this$helpers$normali2 = _slicedToArray(_this$helpers$normali, 3),
              value = _this$helpers$normali2[0],
              rule = _this$helpers$normali2[1],
              params = _this$helpers$normali2[2];

          if (!this.helpers.passes(rule, value, params, rules)) {
            return false;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return true;
    }
  }, {
    key: "message",
    value: function message(field, inputValue, validations) {
      var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      this.errorMessages[field] = null;
      this.fields[field] = true;

      if (!Array.isArray(validations)) {
        validations = validations.split('|');
      }

      var rules = options.validators ? _objectSpread(_objectSpread({}, this.rules), options.validators) : this.rules;

      var _iterator2 = _createForOfIteratorHelper(validations),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var validation = _step2.value;

          var _this$helpers$normali3 = this.helpers.normalizeValues(inputValue, validation),
              _this$helpers$normali4 = _slicedToArray(_this$helpers$normali3, 3),
              value = _this$helpers$normali4[0],
              rule = _this$helpers$normali4[1],
              params = _this$helpers$normali4[2];

          if (!this.helpers.passes(rule, value, params, rules)) {
            this.fields[field] = false;
            var message = this.helpers.message(rule, field, options, rules);

            if (params.length > 0 && rules[rule].hasOwnProperty('messageReplace')) {
              message = rules[rule].messageReplace(message, params);
            }

            this.errorMessages[field] = message;

            if (this.messagesShown || this.visibleFields.includes(field)) {
              return this.helpers.element(message, options);
            }
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }
  }], [{
    key: "addLocale",
    value: function addLocale(lang, messages) {
      this.locales[lang] = messages;
    }
  }]);

  return SimpleReactValidator;
}();

_defineProperty(SimpleReactValidator, "version", '1.5.1');

_defineProperty(SimpleReactValidator, "locales", {
  'en': {}
});
return SimpleReactValidator;
}));
