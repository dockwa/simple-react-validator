var ExampleForm = React.createClass({

  getInitialState: function() {
    return {};
  },

  componentWillMount: function() {
    this.validator = new SimpleReactValidator({
      ip: {
        message: 'The :attribute must be a valid IP address.',
        rule: function(val, options){
          return this._testRegex(val,/^(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/i) && options.indexOf(val) === -1
        }
      }
    });
  },

  submitForm: function() {
    if( this.validator.allValid() ){
      alert('You submitted the form and stuff!');
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  },

  setStateFromInput: function(event) {
    var obj = {};
    obj[event.target.name] = event.target.value;
    this.setState(obj);
  },

  setStateFromCheckbox: function(event) {
    var obj = {};
    obj[event.target.name] = event.target.checked;
    this.setState(obj);
  },

  render: function() {
    return (
      <div className="container card my-4">
        <div className="card-block">
          <h3>Example Form</h3>
          <small className="text-muted">hit submit to view messages</small>
          <hr />

          <div className="form-check">
            <label className="form-check-label">
              <input type="checkbox" name="accepted" className="form-check-input" checked={this.state.accepted} onChange={this.setStateFromCheckbox} />
              <span>accepted</span>
            </label>
            {this.validator.message('checkbox', this.state.accepted, 'accepted')}
          </div>

          <div className="form-group">
            <label>alpha</label>
            <input className="form-control" name="alpha" value={this.state.alpha} onChange={this.setStateFromInput} />
            {this.validator.message('alpha', this.state.alpha, 'required|alpha')}
          </div>

          <div className="form-group">
            <label>alpha_num</label>
            <input className="form-control" name="alpha_num" value={this.state.alpha_num} onChange={this.setStateFromInput} />
            {this.validator.message('alpha_num', this.state.alpha_num, 'required|alpha_num')}
          </div>

          <div className="form-group">
            <label>alpha_num_dash</label>
            <input className="form-control" name="alpha_num_dash" value={this.state.alpha_num_dash} onChange={this.setStateFromInput} />
            {this.validator.message('alpha_num_dash', this.state.alpha_num_dash, 'required|alpha_num_dash')}
          </div>

          <div className="form-group">
            <label>card_exp</label>
            <input className="form-control" name="card_exp" value={this.state.card_exp} onChange={this.setStateFromInput} />
            {this.validator.message('card_exp', this.state.card_exp, 'required|card_exp')}
          </div>

          <div className="form-group">
            <label>card_num</label>
            <input className="form-control" name="card_num" value={this.state.card_num} onChange={this.setStateFromInput} />
            {this.validator.message('card_num', this.state.card_num, 'required|card_num')}
          </div>

          <div className="form-group">
            <label>email</label>
            <input className="form-control" name="email" value={this.state.email} onChange={this.setStateFromInput} />
            {this.validator.message('email', this.state.email, 'required|email')}
          </div>

          <div className="form-group">
            <label>gt</label>
            <input className="form-control" name="gt" value={this.state.gt} onChange={this.setStateFromInput} />
            {this.validator.message('greater_than', this.state.gt, 'required|gt:30')}
          </div>

          <div className="form-group">
            <label>gte</label>
            <input className="form-control" name="gte" value={this.state.gte} onChange={this.setStateFromInput} />
            {this.validator.message('greater_than_or_equal', this.state.gte, 'required|gte:30')}
          </div>

          <div className="form-group">
            <label>in</label>
            <input className="form-control" name="in" value={this.state.in} onChange={this.setStateFromInput} />
            {this.validator.message('in', this.state.in, 'required|in:stu,stuart,stuman')}
          </div>

          <div className="form-group">
            <label>integer</label>
            <input className="form-control" name="integer" value={this.state.integer} onChange={this.setStateFromInput} />
            {this.validator.message('integer', this.state.integer, 'required|integer')}
          </div>

          <div className="form-group">
            <label>lt</label>
            <input className="form-control" name="lt" value={this.state.lt} onChange={this.setStateFromInput} />
            {this.validator.message('less_than', this.state.lt, 'required|lt:30')}
          </div>

          <div className="form-group">
            <label>lte</label>
            <input className="form-control" name="lte" value={this.state.lte} onChange={this.setStateFromInput} />
            {this.validator.message('less_than_or_equal', this.state.lte, 'required|lte:30')}
          </div>

          <div className="form-group">
            <label>max</label>
            <input className="form-control" name="max" value={this.state.max} onChange={this.setStateFromInput} />
            {this.validator.message('max', this.state.max, 'required|max:20')}
          </div>

          <div className="form-group">
            <label>min</label>
            <input className="form-control" name="min" value={this.state.min} onChange={this.setStateFromInput} />
            {this.validator.message('min', this.state.min, 'required|min:20')}
          </div>

          <div className="form-group">
            <label>not_in</label>
            <input className="form-control" name="not_in" value={this.state.not_in} onChange={this.setStateFromInput} />
            {this.validator.message('not_in', this.state.not_in, 'required|not_in:stu,stuart')}
          </div>

          <div className="form-group">
            <label>numeric</label>
            <input className="form-control" name="numeric" value={this.state.numeric} onChange={this.setStateFromInput} />
            {this.validator.message('numeric', this.state.numeric, 'required|numeric:20')}
          </div>

          <div className="form-group">
            <label>phone</label>
            <input className="form-control" name="phone" value={this.state.phone} onChange={this.setStateFromInput} />
            {this.validator.message('phone', this.state.phone, 'required|phone')}
          </div>

          <div className="form-group">
            <label>required</label>
            <input className="form-control" name="required" value={this.state.required} onChange={this.setStateFromInput} />
            {this.validator.message('required', this.state.required, 'required')}
          </div>

          <div className="form-group">
            <label>IP Address (custom example)</label>
            <input className="form-control" name="ip" value={this.state.ip} onChange={this.setStateFromInput} />
            {this.validator.message('ip_address', this.state.ip, 'required|ip:127.0.0.1')}
          </div>

          <button className="btn btn-primary" onClick={this.submitForm}>Submit</button>
        </div>
      </div>
    );
  }
});

ReactDOM.render(<ExampleForm />, document.getElementById('root'));
