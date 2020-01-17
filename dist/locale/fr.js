// Simple React Validator v1.4.4 | Created By Dockwa | MIT License | 2017 - Present
;(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['simple-react-validator'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('simple-react-validator'));
  } else {
    root.SimpleReactValidatorLocaleFr = factory(root.SimpleReactValidator);
  }
}(this, function(SimpleReactValidator) {
"use strict";

// French
SimpleReactValidator.addLocale('fr', {
  accepted: 'Le champ :attribute doit être accepté.',
  after: 'Le champ :attribute doit être après :date.',
  after_or_equal: 'Le champ :attribute doit correspondre ou bien être après :date.',
  alpha: 'Le champ :attribute ne peut contenir que des lettres.',
  alpha_space: 'Le champ :attribute ne peut contenir que des lettres et des espaces.',
  alpha_num: 'Le champ :attribute ne peut contenir que des lettres et des chiffres.',
  alpha_num_space: 'Le champ :attribute ne peut contenir que des lettres, chiffres, et espaces.',
  alpha_num_dash: 'Le champ :attribute ne peut contenir que des lettres, chiffres, et tirets.',
  alpha_num_dash_space: 'Le champ :attribute ne peut contenir que des lettres, chiffres, tirets, et espaces.',
  array: 'Le champ :attribute doit êttre un tableau.',
  before: 'Le champ :attribute doit être avant :date.',
  before_or_equal: 'Le champ :attribute doit correspondre ou bien être avant :date.',
  between: 'Le champ :attribute doit être entre :min et :max:type.',
  "boolean": 'Le champ :attribute doit être booléen.',
  card_exp: "Le champ :attribute doit être une date d'expiration valide.",
  card_num: 'Le champ :attribute doit être un numéro valide de carte de crédit .',
  currency: 'Le champ :attribute doit être une devise valide.',
  date: 'Le champ :attribute doit être une date.',
  date_equals: 'Le champ :attribute doit correspondre à :date.',
  email: 'Le champ :attribute doit êre une adresse email valide.',
  "in": 'Le champ selectionné :attribute doit être :values.',
  integer: 'Le champ :attribute doit être un entier.',
  max: 'Le champ :attribute ne doit pas dépasser :max:type.',
  min: 'Le champ :attribute doit au moins être :min:type.',
  not_in: 'Le champ selectionné :attribute ne doit pas être :values.',
  not_regex: 'Le champ :attribute ne doit pas correspondre au motif requis.',
  numeric: 'Le champ :attribute doit être un chiffre.',
  phone: 'Le champ :attribute doit être un numéro de téléphone valide.',
  regex: 'Le champ :attribute doit correspondre au motif requis.',
  required: 'Le champ :attribute est requis.',
  size: 'Le champ :attribute doit être :size:type.',
  string: 'Le champ :attribute doit être une chaîne.',
  "typeof": "Le champ :attribute n'est pas le type correcte de :type.",
  url: 'Le champ :attribute doit être un url.'
});
return null;
}));
