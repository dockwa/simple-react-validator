# Simple React Validator
A simple react form validator inspired by Laravel validation.

[![Powered by Dockwa](https://raw.githubusercontent.com/dockwa/openpixel/dockwa/by-dockwa.png)](https://engineering.dockwa.com/)

## About
Simple React Validator is exactly as it sounds. We wanted to build a validator for react that had minimul configuration and felt nautural to use. It's configuration and usage is similar to the Laravel PHP framework and make validation as easy as one line.

## Usage
Open the `example/index.html` file for more usuage examples of the library.

#### 3 Easy Steps
1. Initialize the validator.

es5
```Javascript
componentWillMount: function() {
  this.validator = new SimpleReactValidator();
},
```
es6
```Javascript
constructor() {
  this.validator = new SimpleReactValidator();
}
```

2. Add validation rules under inputs.

```Javascript
render: function() {
  return (
    <div className="container">
      <h1>Write a Review</h1>
      <div className="form-group">
        <label>Title</label>
        <input className="form-control" value={this.state.title} onChange={this.setTitle} />
        {this.validator.message('title', this.state.title, 'required|alpha')}
      </div>
      <div className="form-group">
        <label>Email</label>
        <input className="form-control" value={this.state.email} onChange={this.setEmail} />
        {this.validator.message('email', this.state.email, 'required|email')}
      </div>
      <div className="form-group">
        <label>Review</label>
        <textarea className="form-control" value={this.state.min} onChange={this.setReview} />
        {this.validator.message('review', this.state.review, 'required|min:20|max:120')}
      </div>
    </div>
  );
},
```
es6

## Rules
This is the list of all the rules you can validate form inputs against. When using multiple rules, seperate them with a pipe `|`. When adding options, append a colon to the rule and seperate options with commas. Examples: `'required|min:20|max:120'` and `'required|in:stu,stuart,stuyam'`

| Rules        | Options     | Description                                              |
|--------------|-------------|----------------------------------------------------------|
|accepted      |             | If 'true', good for required check boxes.                |
|alpha         |             | Must have only letters.                                  |
|alpha_num     |             | Must have only letters and numbers.                      |
|alpha_num_dash|             | Must have only letters, numbers, dashes, and underscores.|
|card_exp      |             | Must have only a valid credit card expiration date.      |
|card_num      |             | Must have only a valid credit card number.               |
|email         |             | Must have only a valid email address.                    |
|in            |stuart,chris | Must be one of the provided options.                     |
|integer       |             | Must have only an integer.                               |
|max           |120          | Must have less than X number of character.               |
|min           |40           | Must have more than X number of characters.              |
|not_in        |john,msgainze| Must not be one of the provided options.                 |
|phone         |             | Must be a valid phone number.                            |
|required      |             | Must be present, use with other rules to require them.   |
|url           |             | Must be a valid url.                                     |
