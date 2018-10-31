<p align="center">
  <h3 align="center">Simple React Validator</h3>

  <p align="center">
    A simple react and react native form validator inspired by Laravel validation.
    <br>
    <a href="https://www.npmjs.com/package/simple-react-validator"><img src="https://img.shields.io/npm/v/simple-react-validator.svg" /></a>
    <a href="https://www.npmjs.com/package/simple-react-validator"><img src="https://img.shields.io/npm/dt/simple-react-validator.svg" /></a>
    <br>
    <a href="https://www.npmjs.com/package/simple-react-validator"><strong>View on NPM »</strong></a>
  </p>
</p>

[![Powered by Dockwa](https://raw.githubusercontent.com/dockwa/openpixel/dockwa/by-dockwa.png)](https://engineering.dockwa.com/)

## About
Simple React Validator is exactly as it sounds. We wanted to build a validator for react that had minimal configuration and felt natural to use. It's configuration and usage is similar to the Laravel PHP framework and make validation as easy as one line.

## Usage
Open the `example/index.html` file for more usage examples of the library or check out the example [Code Pen](https://codepen.io/stuyam/project/full/XxxwML)

**npm**
```
npm install simple-react-validator --save
```

**bower**
```
bower install simple-react-validator --save
```

#### 3 Easy Steps
1. Initialize the validator.

es5
```javascript
componentWillMount: function() {
  this.validator = new SimpleReactValidator();
},
```
es6
```javascript
constructor() {
  this.validator = new SimpleReactValidator();
}
```

2. Add validation rules under inputs. The `message` method accepts 5 arguments:
- **Field Name**: A unique underscored string that gets replaced in the messaging as the name of the field.
- **Value**: Usually the state of the current field.
- **Rules String**: A pipe separated list of rules to apply to the string.
- **Optional Class Name**: The class applied to the div that wraps the message, default is 'validation-message'.
- **Optional Custom Error Messages**: Will override the normal error messages.

```jsx
render: function() {
  return (
    <div className="container">
      <h1>Write a Review</h1>
      <div className="form-group">
        <label>Title</label>
        <input className="form-control" value={this.state.title} onChange={this.setTitle} />

        {/**********   This is where the magic happens     ***********/}
        {this.validator.message('title', this.state.title, 'required|alpha')}

      </div>
      <div className="form-group">
        <label>Email</label>
        <input className="form-control" value={this.state.email} onChange={this.setEmail} />

        {/**********   This is where the magic happens     ***********/}
        {this.validator.message('email', this.state.email, 'required|email', 'text-danger')}

      </div>
      <div className="form-group">
        <label>Review</label>
        <textarea className="form-control" value={this.state.review} onChange={this.setReview} />

        {/**********   This is where the magic happens     ***********/}
        {this.validator.message('review', this.state.review, 'required|min:20|max:120', false, {min: 'Custom min error'})}

      </div>
      <button className="btn btn-primary" onClick={this.submitForm}>Save Review</button>
    </div>
  );
},
```

3. Check if the validation passes when submitting and turn on messaging if it fails. Once messaging is turned on, validation messages will change and update as the user types.
```javascript
submitForm: function() {
  if( this.validator.allValid() ){
    alert('You submitted the form and stuff!');
  } else {
    this.validator.showMessages();
    // rerender to show messages for the first time
    this.forceUpdate();
  }
},
```

There is another method you can use to check if a single field is valid or not.
```javascript
if( this.validator.fieldValid('email') ){
  // booya this field is valid!
}
```

## React Native

You need to wrap validator with `<Text>` Element.

```javascript
<Text>
  {this.validator.message('title', this.state.title, 'required|alpha')}
</Text>
```

## Rules
This is the list of all the rules you can validate form inputs against. When using multiple rules, separate them with a pipe `|`. When adding options, append a colon to the rule and separate options with commas. Examples: `'required|min:20|max:120'` and `'required|in:stu,stuart,stuyam'`. You can apply the rules via an array like `['require', {max: 20, min: 120}]` or `['require', {in: ['stu', 'stuyam']}]`. This is necessary for things like the regex validator where you may be using pipes or commas in the regex and would conflict with the rule string.

* <a href="#accepted">Accepted</a>
* <a href="#afterdate">After</a>
* <a href="#after_or_equaldate">After or Equal</a>
* <a href="#alpha">Alpha</a>
* <a href="#alpha_space">Alpha Space</a>
* <a href="#alpha_num">Alpha Num</a>
* <a href="#alpha_num_space">Alpha Num Space</a>
* <a href="#alpha_num_dash">Alpha Num Dash</a>
* <a href="#alpha_num_dash_space">Alpha Num Dash Space</a>
* <a href="#array">Array</a>
* <a href="#beforedate">Before</a>
* <a href="#before_or_equaldate">Before or Equal</a>
* <a href="#betweenminmaxtypeoptional">Between</a>
* <a href="#boolean">Boolean</a>
* <a href="#card_exp">Card Expiration</a>
* <a href="#card_num">Card Number</a>
* <a href="#currency">Currency</a>
* <a href="#date">Date</a>
* <a href="#date_equalsdate">Date Equals</a>
* <a href="#email">Email</a>
* <a href="#infoobar">In</a>
* <a href="#integer">Integer</a>
* <a href="#maxsizetypeoptional">Max</a>
* <a href="#minsizetypeoptional">Min</a>
* <a href="#not_infoobar">Not In</a>
* <a href="#not_regexpattern">Not Regex</a>
* <a href="#numeric">Numeric</a>
* <a href="#phone">Phone</a>
* <a href="#regexpattern">Regex</a>
* <a href="#required">Required</a>
* <a href="#sizesizetypeoptional">Size</a>
* <a href="#string">string</a>
* <a href="#typeoftype">Type Of</a>
* <a href="#url">Url</a>

#### accepted
Must be a JavaScript _true_, good for required check boxes.

#### after:date
Must be after date. See <a href="#date">Date</a> for info on accepted date values.

#### after_or_equal:date
Must be after or on date. See <a href="#date">Date</a> for info on accepted date values.

#### alpha
Must only container letters.

#### alpha_space
Must only container letters and spaces.

#### alpha_num
Must only container letters and numbers.

#### alpha_num_space
Must only container letters, numbers, and spaces.

#### alpha_num_dash
Must only container letters, numbers, dashes, and underscores.

#### alpha_num_dash_space
Must only container letters, numbers, dashes, underscores, and spaces.

#### array
Must be a JavaScript Array.

#### before:date
Must be before date. See <a href="#date">Date</a> for info on accepted date values.

#### before_or_equal:date
Must be before or on date. See <a href="#date">Date</a> for info on accepted date values.

#### between:min,max,type(optional)
Must be between two values. See <a href="#sizesizetypeoptional">Size</a> for info on how size is calculated and how options work.

#### boolean
Must be a JavaScript Boolean.

#### card_exp
Must be a valid credit card expiration date. Ex. 10/18 or 10/2018

#### card_num
Must be a valid credit card number. Ex. 4242424242424242 or 4242 4242 4242 4242

#### currency
Must be a valid currency. Dollar signs and commas are optional. Ex. 4.25, $3000 or $3,245,525.12

#### date
Must be a date type <a href="https://momentjs.com/">momentjs</a> date.
**Requires Momentjs**

#### date_equals:date
Must be a date on a specific date.
<br />*Options:* date must be a momentjs date object.

#### email
Must be a valid email format.

#### in:foo,bar,...
Must match a string in options.
<br />*Options:* list of values it must match.

#### integer
Must be an integer value.

#### max:size,type(optional)
Must not be greater than max. See <a href="#sizesizetypeoptional">Size</a> for info on how size is calculated and how options work.

#### min:size,type(optional)
Must not be less than min. See <a href="#sizesizetypeoptional">Size</a> for info on how size is calculated and how options work.

#### not_in:foo,bar,...
Must NOT match a string in options.
<br />*Options:* list of values it must not match.

#### not_regex:pattern
Must NOT match a regex.
<br />*Options:* regex it must not match.
<br />*Note:* if your regex uses a | or , or other special characters use the array syntax to define the rule.

#### numeric
Must be a number of any type.

#### phone
Must be a valid phone number format. Ex. (508) 555-1234 or 5085551234

#### regex:pattern
Must match a regex.
<br />*Options:* regex it must match.
<br />*Note:* if your regex uses a | or , or other special characters use the array syntax to define the rule.

#### required
Must be present, use with other validators to require them.

#### size:size,type(optional)
Must be of a particular size. Can be a string length, array length, or number.
<br />*Options:* type is optional and defaults to `string`. There are 3 types 'string', 'num', and 'array'. String is length of string, num is size of number, array is length of array.

#### string
Must be of type string.

#### typeof:type
Must be of JavaScript type specified in the options.
<br />*Options:* compare the type of the value given to the type provided. Use array syntax to define the type else it will always be type string.

#### url
Must be a valid url. Ex. https://dockwa.com or dockwa.com


<span style="color: red">Requires Momentjs</span>

## Custom Rules
You can write custom rules that you can use the validate. A rule is comprised of 3 parts; the name, the message, and the rule itself. Here is an example of adding a custom rule on initialize of the validator.

Example:

```javascript
constructor() {
  this.validator = new SimpleReactValidator({
    ip: { // name the rule
      message: 'The :attribute must be a valid IP address.', // give a message that will display when there is an error. :attribute will be replaced by the name you supply in calling it.
      rule: function(val, options){ // return true if it is succeeds and false it if fails validation. the _testRegex method is available to give back a true/false for the regex and given value
        // check that it is a valid IP address and is not blacklisted
        return this._testRegex(val,/^(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/i) && options.indexOf(val) === -1
      }
    }
  });
}
```

Usage:

```jsx
render: function() {
  return (
    <div className="container">
      <h1>Give Me Your IP</h1>
      <div className="form-group">
        <label>IP Address</label>
        <input className="form-control" value={this.state.ip} onChange={this.setIP} />
        {/*   This is where the magic happens     */}
        {this.validator.message('ip_address', this.state.ip, 'required|ip:127.0.0.1')}
      </div>
      ...
    </div>
  );
},
```

## Custom Error Messages
The fifth parameter is an object. The keys correspond to the rule names.
If you use the key 'default' then that will be used for all errors that do not have custom errors set.

```jsx
<div className="form-group">
  <label>Amount</label>
  <textarea className="form-control" value={this.state.amount} onChange={this.setAmount} />
  {this.validator.message(
    'amount',
    this.state.amount,
    'required|min:20|max:120',
    false,
    {min: 'Custom min error', default: 'Invalid.'}
  )}
</div>
```
