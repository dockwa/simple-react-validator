# Simple React Validator
A simple react form validator inspired by Laravel validation.

[![npm](https://img.shields.io/npm/v/simple-react-validator.svg)](https://www.npmjs.com/package/simple-react-validator)
[![npm](https://img.shields.io/npm/dt/simple-react-validator.svg)](https://www.npmjs.com/package/simple-react-validator)

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

## Rules
This is the list of all the rules you can validate form inputs against. When using multiple rules, separate them with a pipe `|`. When adding options, append a colon to the rule and separate options with commas. Examples: `'required|min:20|max:120'` and `'required|in:stu,stuart,stuyam'`

| Rules        | Options      |Example                                       | Description                                              |
|--------------|--------------|----------------------------------------------|----------------------------------------------------------|
|accepted      |              | Javascript true                              | If 'true', good for required check boxes.                |
|alpha         |              | abcdefghijk                                  | Must have only letters.                                  |
|alpha_num     |              | abcdefg12345                                 | Must have only letters and numbers.                      |
|alpha_num_dash|              | abcde-1234_                                  | Must have only letters, numbers, dashes, and underscores.|
|card_exp      |              | 12/18, 12/2018                               | Must have only a valid credit card expiration date.      |
|card_num      |              | 4242 4242 4242 4242 (with or without spaces) | Must have only a valid credit card number.               |
|currency      |              | $2,442,424.12 (optional $ and commas)        | Must have only a valid currency.                         |
|decimal       |              | 24424.123 (optional decimal place)           | Must have only a valid currency.                         |
|email         |              | test+yahoo@example.com                       |  Must have only a valid email address.                   |
|gt            |30            | 100                                          | Must be greater than value.                              |
|gte           |25.39         | 25.39                                        | Must be greater than or equal to value.                  |
|in            |stu, chris, hi| stu                                          | Must be one of the provided options.                     |
|integer       |              | 12345                                        | Must have only an integer.                               |
|lt            |193.3         | 20                                           | Must be less than value.                                 |
|lte           |55            | 45                                           | Must be less than or equal to value.                     |
|max           |120           | this is a test                               | Must have less than X number of character.               |
|min           |20            | this is only a simple test                   | Must have more than X number of characters.              |
|not_in        |john, max     | stu                                          | Must not be one of the provided options.                 |
|phone         |              | (508) 555-1234 OR 5085551234                 | Must be a valid phone number.                            |
|required      |              | something                                    | Must be present, use with other rules to require them.   |
|url           |              | https://dockwa.com                           | Must be a valid url.                                     |

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
