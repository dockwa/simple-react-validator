// Simple React Validator v1.6.2 | Created By Dockwa | MIT License | 2017 - Present
;(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['simple-react-validator'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('simple-react-validator'));
  } else {
    root.SimpleReactValidatorLocaleDe = factory(root.SimpleReactValidator);
  }
}(this, function(SimpleReactValidator) {
"use strict";

// German
SimpleReactValidator.addLocale('de', {
  accepted: ':attribute muss akzeptiert werden.',
  after: ':attribute muss ein Datum nach dem :date sein.',
  after_or_equal: ':attribute muss ein Datum nach oder am :date sein.',
  alpha: ':attribute darf nur Buchstaben enthalten.',
  alpha_space: ':attribute darf nur Buchstaben und Leerzeichen enthalten.',
  alpha_num: ':attribute darf nur Buchstaben und Zahlen enthalten.',
  alpha_num_space: ':attribute darf nur Buchstaben, Zahlen und Leerzeichen enthalten.',
  alpha_num_dash: ':attribute darf nur Buchstaben, Zahlen, Unterstriche (_) und Bindestriche (-) enthalten.',
  alpha_num_dash_space: ':attribute darf nur Buchstaben, Zahlen, Leerzeichen, Unterstriche (_) und Bindestriche (-) enthalten.',
  array: ':attribute muss ausgewählte Elemente enthalten.',
  before: ':attribute muss ein Datum vor dem :date sein.',
  before_or_equal: ':attribute muss ein Dateum vor oder am :date sein.',
  between: ':attribute muss zwischen :min und :max:type liegen.',
  "boolean": ':attribute sollte ja oder nein lauten.',
  card_exp: ':attribute muss ein gültiges Verfallsdatum sein.',
  card_num: ':attribute muss eine gültige Kreditkartennummer sein.',
  currency: ':attribute muss eine gültige Währung sein.',
  date: ':attribute muss ein Datum sein.',
  date_equals: ':attribute muss ein Datum sein das dem :date entspricht.',
  email: ':attribute ist keine gültige E-Mail Adresse.',
  "in": ':attribute muss ein Element von :values sein.',
  integer: ':attribute muss eine Zahl sein.',
  max: ':attribute darf :max:type nicht überschreiten.',
  min: ':attribute darf :min:type nicht unterschreiten.',
  not_in: 'Das Format :attribute ist ungültig.',
  not_regex: ':attribute format ist ungültig.',
  numeric: ':attribute muss eine Zahl sein.',
  phone: ':attribute muss eine gültige Telefonnummer sein.',
  regex: ':attribute format ist ungültig.',
  required: ':attribute ist ein Pflichtfeld.',
  size: ':attribute muss :size:type sein.',
  string: ':attribute muss ein Text sein.',
  "typeof": ':attribute ist nicht der richtige Typ für :type.',
  url: ':attribute muss eine gültige URL sein.'
});
return null;
}));
