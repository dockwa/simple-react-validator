class SimpleReactValidator{
  constructor(){
    this.fields = [];
    this.showErrors = false;
    this.rules = {
      'required'        : {message: 'The :attribute field is required.', rule: (val) => this._testRegex(val,/.+/) },
      'accepted'        : {message: 'The :attribute must be accepted.', rule: (val) => val },
      'email'           : {message: 'The :attribute must be a valid email address.', rule: (val) => this._testRegex(val,/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i) },
      'integer'         : {message: 'The :attribute must be an integer.', rule: (val) => this._testRegex(val,/^\d+$/)},
      'numeric'         : {message: 'The :attribute must be a number.', rule: (val) => this._testRegex(val,/^\d+.?\d*$/)},
      'alpha'           : {message: 'The :attribute may only contain letters.', rule: (val) => this._testRegex(val,/^[A-Z]*$/i) },
      'alpha_num'       : {message: 'The :attribute may only contain letters and numbers.', rule: (val) => this._testRegex(val,/^[A-Z0-9]*$/i) },
      'alpha_num_dash'  : {message: 'The :attribute may only contain letters, numbers, and dashes.', rule: (val) => this._testRegex(val,/^[A-Z0-9_-]*$/i) },
      'in'              : {message: 'The selected :attribute is invalid.', rule: (val, options) => options.indexOf(val) > -1 },
      'not_in'          : {message: 'The selected :attribute is invalid.', rule: (val, options) => options.indexOf(val) === -1 },
      // 'required_if'     : {message: 'The :attribute field is required when :other is :value.', rule: (val, options) => options.indexOf(val) > -1 },
      // 'required_unless' : {message: 'The :attribute field is required unless :other is in :values.', rule: (val, options) => options.indexOf(val) > -1 },
      'same'            : {message: 'The :attribute and :other must match.', rule: (val) => this._testRegex(val,/^(([0]?[1-9]{1})|([1]{1}[0-2]{1}))\s?\/\s?\d{2}$/) },
      'url'             : {message: 'The :attribute must be a url.', rule: (val) => this._testRegex(val,/^(([0]?[1-9]{1})|([1]{1}[0-2]{1}))\s?\/\s?\d{2}$/) },
      'card_expiration' : {message: 'The :attribute must be a valid expiration date.', rule: (val) => this._testRegex(val,/^(([0]?[1-9]{1})|([1]{1}[0-2]{1}))\s?\/\s?\d{2}$/) },
      'card_number'     : {message: 'The :attribute must be a valid credit card number.', rule: (val) => this._testRegex(val,/^\d{4}\s{1}\d{4,6}\s{1}\d{4,5}\s?\d{0,8}$/) },
      'min'             : {message: 'The :attribute must be at least :min characters.', rule: (val, options) => val.length >= options[0], messageReplace: (message, options) => message.replace(':min', options[0]) },
      'max'             : {message: 'The :attribute may not be greater than :max characters.', rule: (val, options) => val.length <= options[0], messageReplace: (message, options) => message.replace(':max', options[0]) },
    };
  }

  displayErrors(boolean){
    this.showErrors = boolean || true;
  }

  // return true if all fields cleared, false if there is a validation error
  allValid(){
    for (var key in this.fields) {
      if( this.fields.hasOwnProperty(key) && this.fields[key] === false ) {
        return false;
      }
    }
    return true;
  }

  // if a message is present, show an error message
  customMessage(message, customClass){
    if( message ){
      return this._reactErrorElement(message, customClass);
    }
  }

  message(field, value, testString, customClass){
    this.fields[field] = true;
    var tests = testString.split('|');
    var rule, options, message;
    for(var i = 0; i < tests.length; i++){
      // if the validation does not pass the test
      value = this._valueOrEmptyString(value);
      rule = this._getRule(tests[i]);
      options = this._getOptions(tests[i]);
      // test if the value passes validation
      if(this.rules[rule].rule(value, options) === false){
        this.fields[field] = false;
        if(this.showErrors === true){
          message = this.rules[rule].message.replace(':attribute', field);
          if(options.length > 0 && this.rules[rule].hasOwnProperty('messageReplace')){
            return this._reactErrorElement(this.rules[rule].messageReplace(message, options));
          } else {
            return this._reactErrorElement(message, customClass);
          }
        }
      }
    }
  }

  // Private Methods
  _getRule(type){
    return type.split(':')[0];
  }

  _getOptions(type){
    var parts = type.split(':');
    return parts.length > 1 ? parts[1].split(',') : [];
  }

  _valueOrEmptyString(value){
    return typeof value === 'undefined' || value === null ? '' : value;
  }

  _reactErrorElement(message, customClass){
    return React.createElement('div', {className: customClass || 'validation-message'}, message);
  }

  _testRegex(value, regex){
    return value.toString().match(regex) !== null;
  }
}
