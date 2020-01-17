// Simple React Validator v1.4.4 | Created By Dockwa | MIT License | 2017 - Present
;(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['simple-react-validator'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('simple-react-validator'));
  } else {
    root.SimpleReactValidatorLocaleSr = factory(root.SimpleReactValidator);
  }
}(this, function(SimpleReactValidator) {
"use strict";

// Serbian
SimpleReactValidator.addLocale('sr', {
  accepted: 'Polje :attribute mora biti prihvaćeno.',
  after: 'Polje :attribute mora biti nakon :date.',
  after_or_equal: 'Polje :attribute mora biti nakon ili na :date.',
  alpha: 'Polje :attribute može sadržati samo slova.',
  alpha_space: 'Polje :attribute može sadržati samo slova i razmake.',
  alpha_num: 'Polje :attribute može sadržati samo slova i brojeve.',
  alpha_num_space: 'Polje :attribute može sadržati samo slova, brojeve i razmake.',
  alpha_num_dash: 'Polje :attribute može sadržati samo slova, brojeve i crte.',
  alpha_num_dash_space: 'Polje :attribute može sadržati samo slova, brojeve, crte i razmake.',
  array: 'Polje :attribute mora biti niz.',
  before: 'Polje :attribute mora biti pre :date.',
  before_or_equal: 'Polje :attribute mora biti pre ili na :date.',
  between: 'Polje :attribute mora biti između :min i :max:type.',
  "boolean": 'Polje :attribute mora biti istinitosna vrednost.',
  card_exp: 'Polje :attribute mora biti validan datum isteka.',
  card_num: 'Polje :attribute mora biti validan broj kreditne kartice.',
  currency: 'Polje :attribute mora biti validna valuta.',
  date: 'Polje :attribute mora biti datum.',
  date_equals: 'Polje :attribute mora biti na :date.',
  email: 'Polje :attribute mora biti validna email adresa.',
  "in": 'Izabrano polje :attribute mora biti :values.',
  integer: 'Polje :attribute mora biti ceo broj.',
  max: 'Polje :attribute ne sme biti veće od :max:type.',
  min: 'Polje :attribute mora biti veće od :min:type.',
  not_in: 'Izabrano polje :attribute ne sme biti :values.',
  not_regex: 'Polje :attribute ne sme biti u određenom formatu.',
  numeric: 'Polje :attribute mora biti broj.',
  phone: 'Polje :attribute mora biti validan broj telefona.',
  regex: 'Polje :attribute mora biti u određenom formatu.',
  required: 'Polje :attribute je obavezno.',
  size: 'Polje :attribute mora biti :size:type.',
  string: 'Polje :attribute mora biti niska.',
  "typeof": 'Polje :attribute nije ispravan tip :type.',
  url: 'Polje :attribute mora biti URL.'
});
return null;
}));
