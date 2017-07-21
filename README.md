# Simple React Validator
A simple react form validator inspired by Laravel validation.

[![Powered by Dockwa](https://raw.githubusercontent.com/dockwa/openpixel/dockwa/by-dockwa.png)](https://engineering.dockwa.com/)

## About
Simple React Validator is exactly as it sounds. We wanted to build a validator for react that had minimul configuration and felt nautural to use. It's configuration and usage is similar to the Laravel PHP framework and make validation as easy as one line.

## Usage
Open the `example/index.html` file for more usuage examples of the library or check out the example [Code Pen](https://codepen.io/stuyam/project/full/XxxwML)

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
- **field name**, which is an underscored string that gets replaced in the messaging as the name of the field.
- **value**, which is usually the state of the current field.
- **rules string**, which is a pipe seperated list of rules to apply to the string.
- **optional class name**, which is the class applied to the div that wraps the message, default is 'validation-message'.
- **optional custom error messages**, these will override the normal error messages.

```javascript
render: function() {
  return (
    <div className="container">
      <h1>Write a Review</h1>
      <div className="form-group">
        <label>Title</label>
        <input className="form-control" value={this.state.title} onChange={this.setTitle} />
        {/*   This is where the magic happens     */}
        {this.validator.message('title', this.state.title, 'required|alpha')}
      </div>
      <div className="form-group">
        <label>Email</label>
        <input className="form-control" value={this.state.email} onChange={this.setEmail} />
        {/*   This is where the magic happens     */}
        {this.validator.message('email', this.state.email, 'required|email', 'text-danger')}
      </div>
      <div className="form-group">
        <label>Review</label>
        <textarea className="form-control" value={this.state.review} onChange={this.setReview} />
        {/*   This is where the magic happens     */}
        {this.validator.message('review', this.state.review, 'required|min:20|max:120', false, {min: 'Custom min error'})}
      </div>
      <button className="btn btn-primary" onClick={this.submitForm}>Save Review</button>
    </div>
  );
},
```

3. Check if the validation passes when submiting and turn on messaging if it fails. Once messaging is turned on, validation messages will change and update as the user types.
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

## Rules
This is the list of all the rules you can validate form inputs against. When using multiple rules, seperate them with a pipe `|`. When adding options, append a colon to the rule and seperate options with commas. Examples: `'required|min:20|max:120'` and `'required|in:stu,stuart,stuyam'`

| Rules        | Options      | Description                                              |
|--------------|--------------|----------------------------------------------------------|
|accepted      |              | If 'true', good for required check boxes.                |
|alpha         |              | Must have only letters.                                  |
|alpha_num     |              | Must have only letters and numbers.                      |
|alpha_num_dash|              | Must have only letters, numbers, dashes, and underscores.|
|card_exp      |              | Must have only a valid credit card expiration date.      |
|card_num      |              | Must have only a valid credit card number.               |
|email         |              | Must have only a valid email address.                    |
|gt            |30            | Must be greater than value.                              |
|gte           |25.39         | Must be greater than or equal to value.                  |
|in            |stu, chris, hi| Must be one of the provided options.                     |
|integer       |              | Must have only an integer.                               |
|lt            |193.3         | Must be less than value.                                 |
|lte           |55            | Must be less than or equal to value.                     |
|max           |120           | Must have less than X number of character.               |
|min           |40            | Must have more than X number of characters.              |
|not_in        |john, msgainze| Must not be one of the provided options.                 |
|phone         |              | Must be a valid phone number.                            |
|required      |              | Must be present, use with other rules to require them.   |
|url           |              | Must be a valid url.                                     |
