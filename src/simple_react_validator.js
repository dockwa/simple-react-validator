class SimpleReactValidator{
  constructor(){
    this.fields = [];
    this.showErrors = false;
    this.typeRules = {
      'required'         : {message: 'This field is required', rule: function(val){return this._runRegex(val,/.+/)}},
      'true'             : {message: 'You must check the check box', rule: function(val){return val === true}},
      'email'            : {message: 'Please enter a valid email address', rule: function(val){return this._runRegex(val,/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i)}},
      'number'           : {message: 'Please enter a number', rule: function(val){return this._runRegex(val,/^\d+$/)}},
      'float'            : {message: 'Please enter a number', rule: function(val){return this._runRegex(val,/^\d+.?\d*$/)}},
      'alpha_num'        : {message: 'Please enter only letters or numbers', rule: function(val){return this._runRegex(val,/^[A-Z0-9]*$/i)}},
      'alpha_num_under'  : {message: 'Please enter only letters or numbers', rule: function(val){return this._runRegex(val,/^[A-Z0-9_]*$/i)}},
      'same'             : {message: 'Please enter a valid expiration date', rule: function(val){return this._runRegex(val,/^(([0]?[1-9]{1})|([1]{1}[0-2]{1}))\s?\/\s?\d{2}$/)}},
      'card_expiration'  : {message: 'Please enter a valid expiration date', rule: function(val){return this._runRegex(val,/^(([0]?[1-9]{1})|([1]{1}[0-2]{1}))\s?\/\s?\d{2}$/)}},
      'card_number'      : {message: 'Please enter a valid credit card number', rule: function(val){return this._runRegex(val,/^\d{4}\s{1}\d{4,6}\s{1}\d{4,5}\s?\d{0,8}$/)}},
      'min'              : {message: 'Please enter :REPLACE: or more characters', rule: function(val, option){return val.length >= option}},
      'max'              : {message: 'Please enter no more than :REPLACE: characters', rule: function(val, option){return val.length <= option}},
    };
  }

  displayErrors(boolean){
    this.showErrors = boolean || true;
  }

  // return true if all fields cleared, false if there is a validation error
  allValid(){
    for (var key in this.fields) {
      if( this.fields.hasOwnProperty(key) ) {
        if(this.fields[key] === false){
          return false;
        }
      }
    }
    return true;
  }

  message(field, value, typeString, className){
    this.fields[field] = true;
    var types = typeString.split('|');
    var parts;
    var lastParts;
    for(var i = 0; i < types.length; i++){
      // if the validation does not pass the test
      value = typeof value === 'undefined' || value === null ? '' : value;
      parts = types[i].split(':');
      lastParts = types[i].split(':');
      lastParts.shift();
      // pass in the value being tested and any parts after the rule being specified
      if(this.typeRules[parts[0]].rule.apply(this, [value].concat(lastParts)) === false){
        this.fields[field] = false;
        if(this.showErrors === true){
          if(parts.length > 1){
            return this._errorHTML(this.typeRules[parts[0]].message.replace(':REPLACE:', parts[1]), className);
          } else {
            return this._errorHTML(this.typeRules[parts[0]].message, className);
          }
        }
      }
    }
  }

  customMessage(message, className){
    if(isset(message)){
      return this._errorHTML(message, className);
    }
  }

  _errorHTML(message, className){
    var name = "form-error-message";
    if(isset(className)){
      name += " " + className;
    }
    return React.createElement('div', {className: name}, message);
  }

  _runRegex(value, regex){
    return value.toString().match(regex) !== null;
  }
}
