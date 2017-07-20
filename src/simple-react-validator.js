class SimpleReactValidator{
  constructor(){
    this.fields = [];
    this.messagesShown = false;
    this.rules = {
      'accepted'       : {message: 'The :attribute must be accepted.',                              rule: (val) => val === true },
      'alpha'          : {message: 'The :attribute may only contain letters.',                      rule: (val) => this._testRegex(val,/^[A-Z]*$/i) },
      'alpha_num'      : {message: 'The :attribute may only contain letters and numbers.',          rule: (val) => this._testRegex(val,/^[A-Z0-9]*$/i) },
      'alpha_num_dash' : {message: 'The :attribute may only contain letters, numbers, and dashes.', rule: (val) => this._testRegex(val,/^[A-Z0-9_-]*$/i) },
      'card_exp'       : {message: 'The :attribute must be a valid expiration date.',               rule: (val) => this._testRegex(val,/^(([0]?[1-9]{1})|([1]{1}[0-2]{1}))\s?\/\s?(\d{2}|\d{4})$/) },
      'card_num'       : {message: 'The :attribute must be a valid credit card number.',            rule: (val) => this._testRegex(val,/^\d{4}\s?\d{4,6}\s?\d{4,5}\s?\d{0,8}$/) },
      'email'          : {message: 'The :attribute must be a valid email address.',                 rule: (val) => this._testRegex(val,/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i) },
      'gt'             : {message: 'The :attribute must be greater than :gt.',                      rule: (val, options) => this._testRegex(val,/^\d+.?\d*$/) ? parseFloat(val) > parseFloat(options[0]) : false, messageReplace: (message, options) => message.replace(':gt', options[0]) },
      'gte'            : {message: 'The :attribute must be greater than or equal to :gte.',         rule: (val, options) => this._testRegex(val,/^\d+.?\d*$/) ? parseFloat(val) >= parseFloat(options[0]) : false, messageReplace: (message, options) => message.replace(':gte', options[0]) },
      'in'             : {message: 'The selected :attribute must be :values.',                      rule: (val, options) => options.indexOf(val) > -1, messageReplace: (message, options) => message.replace(':values', this._toSentence(options)) },
      'integer'        : {message: 'The :attribute must be an integer.',                            rule: (val) => this._testRegex(val,/^\d+$/)},
      'lt'             : {message: 'The :attribute must be less than :lt.',                         rule: (val, options) => this._testRegex(val,/^\d+.?\d*$/) ? parseFloat(val) < parseFloat(options[0]) : false, messageReplace: (message, options) => message.replace(':lt', options[0]) },
      'lte'            : {message: 'The :attribute must be less than or equal to :lte.',            rule: (val, options) => this._testRegex(val,/^\d+.?\d*$/) ? parseFloat(val) <= parseFloat(options[0]) : false, messageReplace: (message, options) => message.replace(':lte', options[0]) },
      'max'            : {message: 'The :attribute may not be greater than :max characters.',       rule: (val, options) => val.length <= options[0], messageReplace: (message, options) => message.replace(':max', options[0]) },
      'min'            : {message: 'The :attribute must be at least :min characters.',              rule: (val, options) => val.length >= options[0], messageReplace: (message, options) => message.replace(':min', options[0]) },
      'not_in'         : {message: 'The selected :attribute must not be :values.',                  rule: (val, options) => options.indexOf(val) === -1, messageReplace: (message, options) => message.replace(':values', this._toSentence(options)) },
      'numeric'        : {message: 'The :attribute must be a number.',                              rule: (val) => this._testRegex(val,/^\d+.?\d*$/)},
      'phone'          : {message: 'The :attribute must be a valid phone number.',                  rule: (val) => this._testRegex(val,/(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)/)},
      'required'       : {message: 'The :attribute field is required.',                             rule: (val) => this._testRegex(val,/.+/) },
      'url'            : {message: 'The :attribute must be a url.',                                 rule: (val) => this._testRegex(val,/^(https?|ftp):\/\/(-\.)?([^\s/?\.#-]+\.?)+(\/[^\s]*)?$/i) },
    };
  }

  showMessages(){
    this.messagesShown = true;
  }

  hideMessages(){
    this.messagesShown = true;
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
    if( message && this.messagesShown){
      return this._reactErrorElement(message, customClass);
    }
  }

  message(field, value, testString, customClass, extraOptions = {}){
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
        if(this.messagesShown){
          message = extraOptions[rule] || this.rules[rule].message.replace(':attribute', field.replace('_', ' '));
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

  _toSentence(arr){
    return arr.slice(0, -2).join(', ') +
    (arr.slice(0, -2).length ? ', ' : '') +
    arr.slice(-2).join(arr.length > 2 ? ', or ' : ' or ');
  }

  _reactErrorElement(message, customClass){
    return React.createElement('div', {className: customClass || 'validation-message'}, message);
  }

  _testRegex(value, regex){
    return value.toString().match(regex) !== null;
  }
}
