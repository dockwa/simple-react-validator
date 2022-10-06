// Simple React Validator v1.6.2 | Created By Dockwa | MIT License | 2017 - Present
;(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['simple-react-validator'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('simple-react-validator'));
  } else {
    root.SimpleReactValidatorLocaleSv = factory(root.SimpleReactValidator);
  }
}(this, function(SimpleReactValidator) {
"use strict";

// Swedish
SimpleReactValidator.addLocale('sv', {
  accepted: 'Fält :attribut måste accepteras.',
  after: 'Fält :attribut måste vara efter :date.',
  after_or_equal: 'Fält :attribut måste matcha eller vara efter :date.',
  alpha: 'Fält :attribut kan bara innehålla bokstäver.',
  alpha_space: 'Fält :attributet kan bara innehålla bokstäver och mellanslag.',
  alpha_num: 'Fält :attribut kan bara innehålla bokstäver och siffror.',
  alpha_num_space: 'Fält :attribut kan bara innehålla bokstäver, siffror och mellanslag.',
  alpha_num_dash: 'Fält :attribut kan bara innehålla bokstäver, siffror och bindestreck.',
  alpha_num_dash_space: 'Fält :attribut kan bara innehålla bokstäver, siffror, bindestreck och mellanslag.',
  array: 'Fält :attribut måste vara en array.',
  before: 'Fält :attribut måste vara före :date.',
  before_or_equal: 'Fält :attribut måste matcha eller vara före :date.',
  between: 'Fält :attribut måste vara mellan :min och :max:type.',
  "boolean": 'Fält :attribut måste vara booleskt.',
  card_exp: "Fält :attribut måste vara ett giltigt utgångsdatum.",
  card_num: 'Fält :attribut måste vara ett giltigt kreditkortsnummer.',
  currency: 'Fält :attribut måste vara en giltig valuta.',
  date: 'Fält :attribut måste vara ett datum.',
  date_equals: 'Fält :attribut måste matcha :date.',
  email: 'Fält :attribut måste vara en giltig e-postadress.',
  "in": 'Fält valt: attribut måste vara :values.',
  integer: 'Fält :attribut måste vara ett heltal.',
  max: 'Fält :attribut får inte överstiga :max:type.',
  min: 'Fält :attribut måste åtminstone vara :min:type.',
  not_in: 'Fält vald :attribut får inte vara :values.',
  not_regex: 'Fält :attributet får inte matcha det obligatoriska mönstret.',
  numeric: 'Fält :attribut måste vara ett nummer.',
  phone: 'Fält :attribut måste vara ett giltigt telefonnummer.',
  regex: 'Fält :attribut måste matcha det obligatoriska mönstret.',
  required: 'Fält :attribut krävs.',
  size: 'Fält :attribut måste vara :size:type.',
  string: 'Fält :attribut måste vara en sträng.',
  "typeof": "Fält :attribut är inte den korrekta typen av :type.",
  url: 'Fält :attribut måste vara en url.'
});
return null;
}));
