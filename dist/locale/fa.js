// Simple React Validator v1.6.1 | Created By Dockwa | MIT License | 2017 - Present
;(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['simple-react-validator'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('simple-react-validator'));
  } else {
    root.SimpleReactValidatorLocaleFa = factory(root.SimpleReactValidator);
  }
}(this, function(SimpleReactValidator) {
"use strict";

// Persian
SimpleReactValidator.addLocale('fa', {
  accepted: ':attribute مورد قبول قرار نگرفت',
  after: ':attribute باید تاریخی بعد از :date باشد.',
  after_or_equal: ':attribute باید تاریخی برابر یا بعد از :date باشد.',
  alpha: ":attribute باید شامل حروف انگلیسی باشد.",
  alpha_space: ":attribute باید شامل حروف انگلیسی و فاصله باشد.",
  alpha_num: ":attribute باید شامل اعداد و حروف انگلیسی باشد.",
  alpha_num_space: ":attribute باید شامل اعداد و حروف انگلیسی و فاصله باشد.",
  alpha_num_dash: ":attribute باید شامل اعداد و حروف انگلیسی و خط تیره.",
  alpha_num_dash_space: ":attribute باید شامل اعداد و حروف انگلیسی، خط تیره و فاصله باشد.",
  array: ":attribute باید یک آرایه باشد.",
  before: ":attribute باید قبل از :date باشد.",
  before_or_equal: ":attribute باید قبل یا برابر با :date باشد.",
  between: ":attribute باید بین :min و :max:type باشد.",
  "boolean": ":attribute باید یک بول باشد.",
  card_exp: ":attribute باید یک تاریخ انقضا معتبر باشد.",
  card_num: ":attribute باید یک شماره کارت اعتباری معتبر باشد.",
  currency: ":attribute باید یک ارز معتبر باشد.",
  date: ":attribute باید تاریخ باشد.",
  date_equals: ":attribute باید در :date بازه باشد.",
  email: ":attribute بایدآدرس ایمیل معتبر باشد.",
  "in": ":attribute باید یکی از :values باشد.",
  integer: ":attribute باید یک عدد صحیح باشد.",
  max: ":attribute باید کمتر از :max:type باشد.",
  min: ":attribute باید بیشتر از :min:type باشد.",
  not_in: ":attribute نباید مشابه با :values باشد.",
  not_regex: ":attribute نباید با الگوی مورد نیاز مطابقت داشته باشد.",
  numeric: ":attribute باید عدد باشد.",
  phone: ":attribute باید یک شماره تلفن معتبر باشد.",
  regex: ":attribute باید با الگوی مورد نیاز مطابقت داشته باشد.",
  required: "قسمت :attribute الزامی است.",
  size: ":attribute باید تبدیل شود به size:type:.",
  string: ":attribute باید یک رشته باشد.",
  "typeof": ":attribute نوع صحیح :type نوع نیست.",
  url: ":attribute باید یک آدرس اینترنتی باشد."
});
return null;
}));
