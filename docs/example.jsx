class ExampleForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      ajaxError: 'There was a server error the prevented the form from submitting.'
    };
    this.validator = new SimpleReactValidator({
      // element: (message, className) => <div className="invalid-feedback d-block">{message}</div>,
      // locale: 'fr',
      autoForceUpdate: this,
      className: 'text-danger',
      messages: {
        email: 'That is not an email.',
        // default: "Womp! That's not right!"
      },
      validators: {
        ip: { // name the rule
          message: 'The :attribute must be a valid IP address.', // give a message that will display when there is an error. :attribute will be replaced by the name you supply in calling it.
          rule: function(val, params, validator) { // return true if it is succeeds and false it if fails validation. the testRegex method is available to give back a true/false for the regex and given value
            // check that it is a valid IP address and is not blacklisted
            return validator.helpers.testRegex(val,/^(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/i) && params.indexOf(val) === -1
          }
        }
      }
    });
  }

  submitForm() {
    if( this.validator.allValid() ){
      alert('You submitted the form and stuff!');
    } else {
      this.validator.showMessages();
    }
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  example(name, value, rules, type = 'text') {
    value = value || this.state[name];
    rules = rules || name;
    return (
      <div className="col-sm-6 col-md-4">
        <div className="form-group">
          <label>{name}</label>
          <input className="form-control" type={type} name={name} value={this.state[name]} onChange={this.handleInputChange.bind(this)} onBlur={() => this.validator.showMessageFor(name)} />
          {this.validator.message(name, value, rules)}
        </div>
      </div>
    );
  }

  render() {
    console.log(this.validator.check('thing', 'required|phone'))
    console.log(this.validator.check('8025086177', 'required|phone'))

    return (
      <div className="container card my-4">
        <div className="card-body">
          <h3>Example Form</h3>
          <small className="text-muted">Click submit to view messages.</small>
          <hr />
          <div className="row">

            <div className="col-sm-6 col-md-4">
              <div className="form-check">
                <label className="form-check-label">
                  <input type="checkbox" name="accepted" className="form-check-input" checked={this.state.accepted} onChange={this.handleInputChange.bind(this)} />
                  <span>accepted</span>
                </label>
                {this.validator.message('checkbox', this.state.accepted, 'accepted')}
              </div>
            </div>

            {this.example('after', this.state.after && moment(this.state.after, 'YYYY-MM-DD'), [{after: moment().add(1, 'month')}], 'date')}
            {this.example('after_or_equal', this.state.after_or_equal && moment(this.state.after_or_equal, 'YYYY-MM-DD'), [{after_or_equal: moment().add(1, 'month')}], 'date')}
            {this.example('alpha')}
            {this.example('alpha_space')}
            {this.example('alpha_num')}
            {this.example('alpha_num_space')}
            {this.example('alpha_num_dash')}
            {this.example('alpha_num_dash_space')}
            {this.example('array')}
            {this.example('before', this.state.before && moment(this.state.before, 'YYYY-MM-DD'), [{before: moment().add(1, 'month')}], 'date')}
            {this.example('before_or_equal', this.state.before_or_equal && moment(this.state.before_or_equal, 'YYYY-MM-DD'), [{before_or_equal: moment().add(1, 'month')}], 'date')}
            {this.example('between', this.state.between, 'between:10,20')}
            {this.example('boolean')}
            {this.example('card_exp')}
            {this.example('card_num')}
            {this.example('currency')}
            {this.example('date', this.state.date && moment(this.state.date, 'YYYY-MM-DD'), 'date', 'date')}
            {this.example('date_equals', this.state.date_equals && moment(this.state.date_equals, 'YYYY-MM-DD'), [{date_equals: moment()}], 'date')}
            {this.example('email')}
            {this.example('in', this.state.in, 'in:stu,stuart,stuman')}
            {this.example('integer')}
            {this.example('max', this.state.max, 'max:20')}
            {this.example('min', this.state.min, 'min:20,num')}
            {this.example('not_in', this.state.not_in, ['required', {not_in: ['stu', 'stuart']}] )}
            {this.example('not_regex', this.state.not_regex, 'not_regex:^A*$')}
            {this.example('numeric')}
            {this.example('phone')}
            {this.example('regex', this.state.regex, 'regex:^A*$')}
            {this.example('required')}
            {this.example('size', this.state.size, 'size:20,num')}
            {this.example('string')}
            {this.example('typeof', this.state.typeof, [{typeof: 'string'}] )}
            {this.example('url')}
            {this.example('ip', this.state.ip, 'ip:127.0.0.1')}
          </div>

          {this.validator.messageWhenPresent(this.state.ajaxError, {element: message => <div className="alert alert-warning" role="alert">{message}</div>})}

          <button className="btn btn-primary" onClick={this.submitForm.bind(this)}>Submit</button>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<ExampleForm />, document.getElementById('root'));
