// Simple React Validator v1.6.1 | Created By Dockwa | MIT License | 2017 - Present
;(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['simple-react-validator'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('simple-react-validator'));
  } else {
    root.SimpleReactValidatorLocaleEl = factory(root.SimpleReactValidator);
  }
}(this, function(SimpleReactValidator) {
"use strict";

// Greek
SimpleReactValidator.addLocale('el', {
  accepted: 'Πρέπει να αποδεχετείτε το πεδίο :attribute',
  after: 'Η ημ/νία :attribute πρέπει να είναι μετά από :date.',
  after_or_equal: 'Η ημ/νία :attribute πρέπει να είναι ίση με ή μετά από :date.',
  alpha: 'Το πεδίο :attribute μπορεί να περιέχει μόνο γράμματα',
  alpha_space: 'Το πεδίο :attribute μπορεί να περιέχει μόνο γράμματα και κενά.',
  alpha_num: 'Το πεδίο :attribute μπορεί να περιέχει μόνο γράμματα και αριθμούς.',
  alpha_num_space: 'Το πεδίο :attribute μπορεί να περιέχει μόνο γράμματα, κενά και αριθμούς.',
  alpha_num_dash: 'Το πεδίο :attribute μπορεί να περιέχει μόνο γράμματα, κενά και παύλες(-).',
  alpha_num_dash_space: 'Το πεδίο :attribute μπορεί να περιέχει μόνο αριθμούς, κενά και παύλες(-).',
  array: 'Το πεδίο :attribute πρέπει να είναι array.',
  before: 'Η ημ/νία πρέπει να είναι πριν από :date.',
  before_or_equal: 'Η ημ/νία πρέπει να είναι πριν ή ίση με :date.',
  between: 'Η τιμή του πεδίου :attribute πρέπει να βρίσκεται ανάμεσα από :min - :max:type.',
  "boolean": 'Το πεδίο :attribute πρέπει να είναι boolean',
  card_exp: 'To πεδίο :attribute πρέπει να είναι μια έγκυρη ημ/νία.',
  card_num: 'Το πεδίο :attribute πρέπει να είναι ένας έγκυρος αριθμός κάρτας.',
  currency: 'Το πεδίο :attribute πρέπει να έιναι ένα έγκυρο ποσό',
  date: 'Το πεδίο :attribute πρέπει να είναι μια έγκυρη ημ/νία.',
  date_equals: 'Η ημ/νία :attribute πρέπει να είναι ίδια με :date.',
  email: 'Το πεδίο :attribute πρέπει να είναι ένα έγκυρο email.',
  "in": 'To πεδίο :attribute πρέπει να περιέχει τις τιμές :values.',
  integer: 'Το πεδίο :attribute πρέπει να είναι ένας ακέραιος αριθμός.',
  max: 'Η τιμή του πεδίου :attribute δεν μπορεί να είναι μεγαλύτερη απο :max:type.',
  min: 'Η τιμή του πεδίου :attribute πρέπει να είναι τουλάχιστον :min:type.',
  not_in: 'Η επιλεγμένη τιμή :attribute δεν πρέπει να περιέχει :values.',
  not_regex: 'Η τιμή :attribute δεν πρέπει να ταιριάζει με το υπόδειγμα.',
  numeric: 'Η τιμή :attribute πρέπει να είναι αριθμός.',
  phone: 'Το πεδίο :attribute πρέπει να είναι ένας έγκυρος τηλεφωνικός αριθμός.',
  regex: 'Η τιμή του πεδίου :attribute πρέπει να ταιριάζει στο υπόδειγμα.',
  required: 'Το πεδίο :attribute είναι υποχρεωτικό.',
  size: 'Η τιμή του πεδίου :attribute πρέπει να ισούται με :size:type.',
  string: 'Ο τύπος του πεδίου :attribute πρέπει να ειναι string',
  "typeof": 'Η τιμή του πεδίου :attribute δεν ταιρίαζει με τον τύπο :type.',
  url: 'Η τιμή του πεδίου :attribute πρέπει να είναι της μορφής λινκ(url).'
});
return null;
}));
