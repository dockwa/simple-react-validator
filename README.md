<p align="center">
  <h3 align="center">Simple React Validator</h3>

  <p align="center">
    A simple react and react native form validator inspired by Laravel validation.
    <br>
    <a href="https://www.npmjs.com/package/simple-react-validator"><img src="https://img.shields.io/npm/v/simple-react-validator.svg" /></a>
    <a href="https://www.npmjs.com/package/simple-react-validator"><img src="https://img.shields.io/npm/dt/simple-react-validator.svg" /></a>
    <a href="https://www.jsdelivr.com/package/npm/simple-react-validator"><img src="https://data.jsdelivr.com/v1/package/npm/simple-react-validator/badge?style=rounded" /></a>
    <br>
    <a href="https://www.npmjs.com/package/simple-react-validator"><strong>View on NPM »</strong></a>
  </p>
</p>

[![Powered by Dockwa](https://raw.githubusercontent.com/dockwa/openpixel/dockwa/by-dockwa.png)](https://engineering.dockwa.com/)

# About
Simple React Validator is exactly as it sounds. We wanted to build a validator for react that had minimal configuration and felt natural to use. It's configuration and usage is similar to the Laravel PHP framework and make validation as easy as one line.

[Working Example](https://dockwa.github.io/simple-react-validator/index.html)

# Documentation
1. [Usage](#usage)
2. [Setup](#3-easy-steps)
3. [Rules](#rules)
4. [Options](#options)
    1. [Element](#1-element)
    2. [Class Name](#2-classname)
    3. [Messages](#3-messages)
    4. [Validators](#4-validators)
    5. [Auto Force Update](#5-autoforceupdate)
    6. [Localization](#6-locale)
5. [Custom Validators](#custom-validators)

# Usage
Open the `example/index.html` file for more usage examples of the library or check out the [Example](https://dockwa.github.io/simple-react-validator)

**npm**
```
npm install simple-react-validator --save
```

**bower**
```
bower install simple-react-validator --save
```

# 3 Easy Steps
1. Import and Initialize the validator.
```javascript
import SimpleReactValidator from 'simple-react-validator';
```
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
- **Options (Optional)**: Object of options same as the [default options](#).

```javascript
this.validator.message('title', this.state.title, 'required|email')
```

**Example:**
```jsx
render() {
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
        {this.validator.message('review', this.state.review, 'required|min:20|max:120'})}

      </div>
      <button className="btn btn-primary" onClick={this.submitForm}>Save Review</button>
    </div>
  );
}
```

3. Check if the validation passes when submitting and turn on messaging if it fails. Once messaging is turned on, validation messages will change and update as the user types.
```javascript
submitForm() {
  if (this.validator.allValid()) {
    alert('You submitted the form and stuff!');
  } else {
    this.validator.showMessages();
    // rerender to show messages for the first time
    // you can use the autoForceUpdate option to do this automatically`
    this.forceUpdate();
  }
}
```

There is another method you can use to check if a single field is valid or not.
```javascript
if (this.validator.fieldValid('email')) {
  // booya this field is valid!
}
```

#### Note: autoForceUpdate
As of v1.1.0 you can initialize the the constructor with the `autoForceUpdate` option and pass it react instance that is responsible for the state. This will automatically call the `this.forceUpdate()` for you when `showMessages`, `hideMessages`, `showMessageFor`, and `hideMessageFor` are called.
```javascript
constructor() {
  this.validator = new SimpleReactValidator({autoForceUpdate: this});
}


```

## Available Public Methods
`getErrorMessages()` Returns a JS object, key being the field name, value being the error message.

`showMessages()` Turns on showing messages for all messages.

`hideMessages()` Turns off showing messages for all messages.

`showMessageFor(field)` Turns on showing messages for a specific field. Useful for [onBlur](#onblur).

`hideMessageFor(field)` Turns off showing messages for a specific field. Useful for [onBlur](#onblur).

`allValid()` Returns a boolean if all the fields pass validation or not.

`fieldValid(field)` Checks if a single field is valid or not.

`purgeFields()` Empties the validation object for [conditional fields.](#conditional-fields)

`messageWhenPresent(message, options = {})` Show a message when the message is set, good for ajax validation errors.

`check(value, validations)` A simple way of checking a value against a built in validation rule. Does not add to the validator, just gives a true / false return value.

`message(field, value, validations, options = {})` How you define validation rules and add messages into the form.

## onBlur

You can use the react onBlur action to show individual fields once the input is blurred. Use the `showMesssageFor` or `hideMessageFor` methods.

```jsx
<div>
  <label>Email</label>
  <input value={this.state.email} onChange={/* update email */} onBlur={() => this.validator.showMessageFor('email')} />
  {this.validator.message('email', this.state.email, 'required|email')}
</div>

```

## React Native

You need to wrap validator with `<Text>` Element.

```jsx
<Text>
  {this.validator.message('title', this.state.title, 'required|alpha')}
</Text>
```

## Conditional Fields

A field is added to validator via the above `message` method. But sometimes you want to conditionally add and remove validation as the form is completed. For this you can use the `purgeFields` method to clear all validator before each render so only the fields added during that render are validated.

```jsx
render() {
  this.validator.purgeFields();
  return (
    <div>
      <div className="form-group">
        <label>Address Line 1</label>
        <input className="form-control" value={this.state.title} onChange={this.setTitle} />
        {this.validator.message('title', this.state.title, 'required|alpha')}
      </div>
      {this.optinallyAddAnotherAddressLine()}
      <button className="btn btn-primary" onClick={this.submitForm}>Save Review</button>
    </div>
  );
}
```

# Rules
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
* <a href="#string">String</a>
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
<br />Positive numbers: "numeric|min:0,num"
<br />Negative numbers "numeric|max:0,num"

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


# Options
The Simple React Validator can receive an options object when initialized or as the fourth parameter when defining a validator. There are 4 options you can provide.
#### 1. element:
Accepts a block where you can return the default element that you want to wrap the message from a validator message. The default element is `<div className="srv-validation-message">{message}</div>`. If you are using React Native the default will be just the message the gets returned. You can also set `element: false` to just return a message.
  * **Takes 2 params**
  * message: The message coming from the validator.
  * className (optional): Will optionally be provided so you can change the className on a per validation basis.
```jsx
this.validator = new SimpleReactValidator({
  element: message => <div>{message}</div>
  // OR
  element: (message, className) => <div className={className}>{message}</div>
})
```
#### 2. className:
String of classes to be passed into an element, default is `srv-validation-message` and can be overriden.
#### 3. messages:
Accepts an object to override validation messages. It also accepts a default which will override all messages.
```jsx
this.validator = new SimpleReactValidator({
  messages: {
    email: 'That is not an email.'
    // OR
    default: 'Validation has failed!'  // will override all messages
  },
})
```
#### 4. validators:
Accepts an object of custom validators. See [Custom Validators](#custom-validators) for more info on defining custom validators.
#### 5. autoForceUpdate:
Accepts a react instance and will automatically be called when messages are shown and hidden automatically. [More on autoForceUpdate](#note-autoforceupdate)
#### 6. locale:
Accepts a string with the localized messages of your choice. **For this to work, the correct language file also needs to be loaded into your front end.** [Current Supported Languages](https://github.com/dockwa/simple-react-validator/tree/master/src/locale). To contribute to translating the project use [this file as a template.](https://github.com/dockwa/simple-react-validator/blob/master/src/locale/template-en.js)
```jsx
// sets french default validation messages.
this.validator = new SimpleReactValidator({locale: 'fr'});
```
You can apply custom messages with the [messages](#3-messages) option. However you can also apply a custom language that you can later select with the `addLocale` class method.
```jsx
SimpleReactValidator.addLocale('klingon', {
  accepted: 'Hab SoSlI’ Quch!',
  email: 'Heghlu’meH QaQ jajvam'
});
...
this.validator = new SimpleReactValidator({locale: 'klingon'});
```


# Custom Validators
You can write custom rules that you can use the validate. A rule has 4 options:
1. message: The message the will be shown when the validation fails. :attribute will be replaced by the _humanized_ name that your provide of the attribute you are validating (supports snake_case or camelCase).
2. rule: Accepts a block that returns true if validator passes and false if it fails.
  * **Takes 3 params**
  * val: The value that is being validated.
  * params: An array containing the params passed into the validator.
  * validator: The validator object, allows you to access helper methods such as `validator.helpers.textRegex(val, regex)` which returns true or false if the regex passes.
3. messageReplace (optional): Accepts a block uses to modify and return the message on the fly.
  * **Takes 2 params**
  * message: The message provided above.
  * params: An array containing the params passed into the validator.
4. required (optional): True if you want the validator to be implicitly required when it is applied. All validators are not required by default. The equivalent of adding `required` to each validation definition.

Example:

```javascript
constructor() {
  this.validator = new SimpleReactValidator({
    validators: {
      ip: {  // name the rule
        message: 'The :attribute must be a valid IP address and must be :values.',
        rule: (val, params, validator) => {
          return validator.helpers.testRegex(val,/^(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/i) && params.indexOf(val) === -1
        },
        messageReplace: (message, params) => message.replace(':values', this.helpers.toSentence(params)),  // optional
        required: true  // optional
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
        {this.validator.message('ipAddress', this.state.ip, 'required|ip:127.0.0.1')}
      </div>
      ...
    </div>
  );
},
```
