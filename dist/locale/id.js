// Simple React Validator v1.4.4 | Created By Dockwa | MIT License | 2017 - Present
;(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['simple-react-validator'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('simple-react-validator'));
  } else {
    root.SimpleReactValidatorLocaleId = factory(root.SimpleReactValidator);
  }
}(this, function(SimpleReactValidator) {
"use strict";

// Indonesian
SimpleReactValidator.addLocale('id', {
  accepted: ':attribute harus diterima.',
  after: ':attribute harus lebih dari :date.',
  after_or_equal: ':attribute harus lebih dari atau sama dengan :date.',
  alpha: ':attribute hanya boleh berisikan teks.',
  alpha_space: ':attribute hanya boleh berisikan teks dan spasi.',
  alpha_num: ':attribute hanya boleh berisikan teks dan angka.',
  alpha_num_space: ':attribute hanya boleh berisikan teks, angka, dan spasi.',
  alpha_num_dash: ':attribute hanya boleh berisikan teks, angka, dan garis datar.',
  alpha_num_dash_space: ':attribute hanya boleh berisikan teks, angka, garis datar dan spasi.',
  array: ':attribute harus berupa array.',
  before: ':attribute harus kurang dari :date.',
  before_or_equal: ':attribute harus kurang dari atau sama dengan :date.',
  between: ':attribute harus diantara :min dan :max:type.',
  "boolean": ':attribute harus berupa boolean.',
  card_exp: ':attribute harus berupa tanggal expire yang valid valid expiration date.',
  card_num: ':attribute harus berupa nomor kartu kredit.',
  currency: ':attribute harus berupa mata uang yang valid.',
  date: ':attribute harus berupa tanggal.',
  date_equals: ':attribute harus sama dengan :date.',
  email: ':attribute harus berupa alamat email yang valid.',
  "in": ':attribute terpilih harus :values.',
  integer: ':attribute harus berupa integer.',
  max: ':attribute harus kurang dari :max:type.',
  min: ':attribute harus lebih dari :min:type.',
  not_in: ':attribute terpilih tidak boleh sama dngan :values.',
  not_regex: ':attribute tidak boleh cocok dengan pola yang ditentukan.',
  numeric: ':attribute harus berupa angka.',
  phone: ':attribute harus berupa nomor ponsel yang valid.',
  regex: ':attribute harus cocok dengan pola yang ditentukan.',
  required: ':attribute tidak boleh kosong.',
  size: ':attribute harus :size:type.',
  string: ':attribute harus berupa string.',
  "typeof": ':attribute tida cocok dengan tiipe :type.',
  url: ':attribute harus berupa url.'
});
return null;
}));
