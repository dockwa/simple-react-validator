// Simple React Validator v1.2.4 | Created By Dockwa | MIT License | 2017 - Present
;(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['simple-react-validator'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('simple-react-validator'));
  } else {
    root.SimpleReactValidatorLocaleTemplateEn = factory(root.SimpleReactValidator);
  }
}(this, function(SimpleReactValidator) {
"use strict";

/******* This in an example template ***********
This file does nothing since English is the default language
build into simple react validator.

Copy this file to add more
supported languages. This is a great reference for translations
of these messages: https://github.com/caouecs/Laravel-lang/tree/master/src

If you don't have a translation for a line, comment out that line
and move on. It is smart enough to fall back to the default English
and hopefully someone else will contribute to fill in the gaps later!

Note: the "const" variable name will be the camelCase filename.
/**********************************************/
var templateEn = {
  accepted: 'The :attribute must be accepted.',
  after: 'The :attribute must be after :date.',
  after_or_equal: 'The :attribute must be after or on :date.',
  alpha: 'The :attribute may only contain letters.',
  alpha_space: 'The :attribute may only contain letters and spaces.',
  alpha_num: 'The :attribute may only contain letters and numbers.',
  alpha_num_space: 'The :attribute may only contain letters, numbers, and spaces.',
  alpha_num_dash: 'The :attribute may only contain letters, numbers, and dashes.',
  alpha_num_dash_space: 'The :attribute may only contain letters, numbers, dashes, and spaces.',
  array: 'The :attribute must be an array.',
  before: 'The :attribute must be before :date.',
  before_or_equal: 'The :attribute must be before or on :date.',
  between: 'The :attribute must be between :min and :max:type.',
  "boolean": 'The :attribute must be a boolean.',
  card_exp: 'The :attribute must be a valid expiration date.',
  card_num: 'The :attribute must be a valid credit card number.',
  currency: 'The :attribute must be a valid currency.',
  date: 'The :attribute must be a date.',
  date_equals: 'The :attribute must be on :date.',
  email: 'The :attribute must be a valid email address.',
  "in": 'The selected :attribute must be :values.',
  integer: 'The :attribute must be an integer.',
  max: 'The :attribute may not be greater than :max:type.',
  min: 'The :attribute must be at least :min:type.',
  not_in: 'The selected :attribute must not be :values.',
  not_regex: 'The :attribute must not match the required pattern.',
  numeric: 'The :attribute must be a number.',
  phone: 'The :attribute must be a valid phone number.',
  regex: 'The :attribute must match the required pattern.',
  required: 'The :attribute field is required.',
  size: 'The :attribute must be :size:type.',
  string: 'The :attribute must be a string.',
  "typeof": 'The :attribute is not the correct type of :type.',
  url: 'The :attribute must be a url.'
};
SimpleReactValidator.addLocale('en', templateEn);
return templateEn;
}));
