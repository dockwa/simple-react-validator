class ExampleForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.validator = new SimpleReactValidator({
      element: (message, className) => <div className="invalid-feedback d-block">{message}</div>,
      className: 'text-danger',
      messages: {
        email: 'That is not an email.',
        default: 'Good stuff!'
      },
      validators: {
        ip: { // name the rule
          message: 'The :attribute must be a valid IP address.', // give a message that will display when there is an error. :attribute will be replaced by the name you supply in calling it.
          rule: function(val, options) { // return true if it is succeeds and false it if fails validation. the testRegex method is available to give back a true/false for the regex and given value
            // check that it is a valid IP address and is not blacklisted
            return this.helpers.testRegex(val,/^(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/i) && options.indexOf(val) === -1
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
      this.forceUpdate();
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

  render() {
    return (
      <div className="container card my-4">
        <div className="card-body">
          <h3>Example Form</h3>
          <small className="text-muted">hit submit to view messages</small>
          <hr />
          <div className="form-check">
            <label className="form-check-label">
              <input type="checkbox" name="accepted" className="form-check-input" checked={this.state.accepted} onChange={this.handleInputChange.bind(this)} />
              <span>accepted</span>
            </label>
            {this.validator.message('checkbox', this.state.accepted, 'accepted')}
          </div>

          <div className="form-group">
            <label>alpha</label>
            <input className="form-control" name="alpha" value={this.state.alpha} onChange={this.handleInputChange.bind(this)} />
            {this.validator.message('alpha', this.state.alpha, 'alpha')}
          </div>

          <div className="form-group">
            <label>alpha_num</label>
            <input className="form-control" name="alpha_num" value={this.state.alpha_num} onChange={this.handleInputChange.bind(this)} />
            {this.validator.message('alpha_num', this.state.alpha_num, 'alpha_num')}
          </div>

          <div className="form-group">
            <label>alpha_num_dash</label>
            <input className="form-control" name="alpha_num_dash" value={this.state.alpha_num_dash} onChange={this.handleInputChange.bind(this)} />
            {this.validator.message('alpha_num_dash', this.state.alpha_num_dash, 'alpha_num_dash')}
          </div>

          <div className="form-group">
            <label>card_exp</label>
            <input className="form-control" name="card_exp" value={this.state.card_exp} onChange={this.handleInputChange.bind(this)} />
            {this.validator.message('card_exp', this.state.card_exp, 'card_exp')}
          </div>

          <div className="form-group">
            <label>card_num</label>
            <input className="form-control" name="card_num" value={this.state.card_num} onChange={this.handleInputChange.bind(this)} />
            {this.validator.message('card_num', this.state.card_num, 'card_num')}
          </div>

          <div className="form-group">
            <label>currency</label>
            <input className="form-control" name="currency" value={this.state.currency} onChange={this.handleInputChange.bind(this)} />
            {this.validator.message('currency', this.state.currency, 'currency')}
          </div>

          <div className="form-group">
            <label>email</label>
            <input className="form-control" name="email" value={this.state.email} onChange={this.handleInputChange.bind(this)} />
            {this.validator.message('email', this.state.email, 'email')}
          </div>

          <div className="form-group">
            <label>gt</label>
            <input className="form-control" name="gt" value={this.state.gt} onChange={this.handleInputChange.bind(this)} />
            {this.validator.message('greater_than', this.state.gt, 'gt:30')}
          </div>

          <div className="form-group">
            <label>gte</label>
            <input className="form-control" name="gte" value={this.state.gte} onChange={this.handleInputChange.bind(this)} />
            {this.validator.message('greater_than_or_equal', this.state.gte, 'gte:30')}
          </div>

          <div className="form-group">
            <label>in</label>
            <input className="form-control" name="in" value={this.state.in} onChange={this.handleInputChange.bind(this)} />
            {this.validator.message('in', this.state.in, 'in:stu,stuart,stuman')}
          </div>

          <div className="form-group">
            <label>integer</label>
            <input className="form-control" name="integer" value={this.state.integer} onChange={this.handleInputChange.bind(this)} />
            {this.validator.message('integer', this.state.integer, 'integer')}
          </div>

          <div className="form-group">
            <label>lt</label>
            <input className="form-control" name="lt" value={this.state.lt} onChange={this.handleInputChange.bind(this)} />
            {this.validator.message('less_than', this.state.lt, 'lt:30')}
          </div>

          <div className="form-group">
            <label>lte</label>
            <input className="form-control" name="lte" value={this.state.lte} onChange={this.handleInputChange.bind(this)} />
            {this.validator.message('less_than_or_equal', this.state.lte, 'lte:30')}
          </div>

          <div className="form-group">
            <label>max</label>
            <input className="form-control" name="max" value={this.state.max} onChange={this.handleInputChange.bind(this)} />
            {this.validator.message('max', this.state.max, 'max:20')}
          </div>

          <div className="form-group">
            <label>min</label>
            <input className="form-control" name="min" value={this.state.min} onChange={this.handleInputChange.bind(this)} />
            {this.validator.message('min', this.state.min, 'min:20')}
          </div>

          <div className="form-group">
            <label>not_in</label>
            <input className="form-control" name="not_in" value={this.state.not_in} onChange={this.handleInputChange.bind(this)} />
            {this.validator.message('not_in', this.state.not_in, 'not_in:stu,stuart')}
          </div>

          <div className="form-group">
            <label>numeric</label>
            <input className="form-control" name="numeric" value={this.state.numeric} onChange={this.handleInputChange.bind(this)} />
            {this.validator.message('numeric', this.state.numeric, 'numeric:20')}
          </div>

          <div className="form-group">
            <label>phone</label>
            <input className="form-control" name="phone" value={this.state.phone} onChange={this.handleInputChange.bind(this)} />
            {this.validator.message('phone', this.state.phone, 'phone')}
          </div>

          <div className="form-group">
            <label>required</label>
            <input className="form-control" name="required" value={this.state.required} onChange={this.handleInputChange.bind(this)} />
            {this.validator.message('required', this.state.required, 'required')}
          </div>

          <div className="form-group">
            <label>url</label>
            <input className="form-control" name="url" value={this.state.url} onChange={this.handleInputChange.bind(this)} />
            {this.validator.message('url', this.state.url, 'url')}
          </div>

          <div className="form-group">
            <label>IP Address (custom example)</label>
            <input className="form-control" name="ip" value={this.state.ip} onChange={this.handleInputChange.bind(this)} />
            {this.validator.message('ip_address', this.state.ip, 'ip:127.0.0.1')}
          </div>

          <button className="btn btn-primary" onClick={this.submitForm.bind(this)}>Submit</button>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<ExampleForm />, document.getElementById('root'));
