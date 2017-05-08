class SimpleReactValidator{
  constructor(){
    this.fields = [];
    this.showErrors = false;
    this.rules = {
      'required'         : {message: 'This field is required', rule: (val) => this._testRegex(val,/.+/) },
      'true'             : {message: 'You must check the check box', rule: (val) => val === true },
      'email'            : {message: 'Please enter a valid email address', rule: (val) => this._testRegex(val,/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i) },
      'number'           : {message: 'Please enter a number', rule: (val) => this._testRegex(val,/^\d+$/)},
      'float'            : {message: 'Please enter a number', rule: (val) => this._testRegex(val,/^\d+.?\d*$/)},
      'alpha_num'        : {message: 'Please enter only letters or numbers', rule: (val) => this._testRegex(val,/^[A-Z0-9]*$/i) },
      'alpha_num_under'  : {message: 'Please enter only letters or numbers', rule: (val) => this._testRegex(val,/^[A-Z0-9_]*$/i) },
      'same'             : {message: 'Please enter a valid expiration date', rule: (val) => this._testRegex(val,/^(([0]?[1-9]{1})|([1]{1}[0-2]{1}))\s?\/\s?\d{2}$/) },
      'card_expiration'  : {message: 'Please enter a valid expiration date', rule: (val) => this._testRegex(val,/^(([0]?[1-9]{1})|([1]{1}[0-2]{1}))\s?\/\s?\d{2}$/) },
      'card_number'      : {message: 'Please enter a valid credit card number', rule: (val) => this._testRegex(val,/^\d{4}\s{1}\d{4,6}\s{1}\d{4,5}\s?\d{0,8}$/) },
      'min'              : {message: 'Please enter :MIN: or more characters', rule: (val, options) => val.length >= options[0], messageReplace: (message, options) => message.replace(':MIN:', args[0]) },
      'max'              : {message: 'Please enter no more than :MAX: characters', rule: (val, options) => val.length <= options[0], messageReplace: (message, options) => message.replace(':MAX:', args[0]) },
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
    var rule;
    var options;
    for(var i = 0; i < tests.length; i++){
      // if the validation does not pass the test
      value = this._valueOrEmptyString(value);
      rule = this._getRule(tests[i]);
      options = this._getOptions(tests[i]);
      // test if the value passes validation
      if(this.rules[rule].rule(value, options) === false){
        this.fields[field] = false;
        if(this.showErrors === true){
          if(options.length > 1 && this.rules[rule].hasOwnProperty('messageReplace')){
            return this._reactErrorElement(this.rules[rule].messageReplace(this.rules[rule].message, options));
          } else {
            return this._reactErrorElement(this.rules[rule].message, customClass);
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
    return React.createElement('div', {className: customClass || 'error-message'}, message);
  }

  _testRegex(value, regex){
    return value.toString().match(regex) !== null;
  }
}
