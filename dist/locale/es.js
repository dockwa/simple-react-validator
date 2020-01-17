// Simple React Validator v1.4.4 | Created By Dockwa | MIT License | 2017 - Present
;(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['simple-react-validator'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('simple-react-validator'));
  } else {
    root.SimpleReactValidatorLocaleEs = factory(root.SimpleReactValidator);
  }
}(this, function(SimpleReactValidator) {
"use strict";

// Spanish
SimpleReactValidator.addLocale('es', {
  accepted: ':attribute debe ser aceptado.',
  after: ':attribute debe ser una fecha posterior a :date.',
  after_or_equal: ':attribute debe ser una fecha posterior o igual a :date.',
  alpha: ':attribute sólo debe contener letras.',
  // alpha_space          : 'The :attribute may only contain letters and spaces.',
  // alpha_num            : 'The :attribute may only contain letters and numbers.',
  // alpha_num_space      : 'The :attribute may only contain letters, numbers, and spaces.',
  // alpha_num_dash       : 'The :attribute may only contain letters, numbers, and dashes.',
  // alpha_num_dash_space : 'The :attribute may only contain letters, numbers, dashes, and spaces.',
  array: ':attribute debe ser un conjunto.',
  before: ':attribute debe ser una fecha anterior a :date.',
  before_or_equal: ':attribute debe ser una fecha anterior o igual a :date.',
  between: ':attribute tiene que estar entre :min - :max:type.',
  "boolean": 'El campo :attribute debe tener un valor verdadero o falso.',
  // card_exp             : 'The :attribute must be a valid expiration date.',
  // card_num             : 'The :attribute must be a valid credit card number.',
  // currency             : 'The :attribute must be a valid currency.',
  date: ':attribute no es una fecha válida.',
  date_equals: ':attribute debe ser una fecha igual a :date.',
  email: ':attribute no es un correo válido',
  "in": ':attribute es inválido :values.',
  integer: ':attribute debe ser un número entero.',
  max: ':attribute no debe ser mayor a :max:type.',
  min: 'El tamaño de :attribute debe ser de al menos :min:type.',
  not_in: ':attribute es inválido :values.',
  not_regex: 'El formato del campo :attribute no es válido.',
  numeric: ':attribute debe ser numérico.',
  // phone                : 'The :attribute must be a valid phone number.',
  regex: 'El formato de :attribute es inválido.',
  required: 'El campo :attribute es obligatorio.',
  size: 'El tamaño de :attribute debe ser :size:type.',
  string: 'El campo :attribute debe ser una cadena de caracteres.',
  // typeof               : 'The :attribute is not the correct type of :type.',
  url: 'El formato :attribute es inválido.'
});
return null;
}));
