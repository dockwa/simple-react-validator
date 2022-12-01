import { useState } from 'react';
import * as moment from 'moment'
import SimpleReactValidator from '../src/simple-react-validator'

function ExampleFormWithHooks() {

  const initialFormState = {
    accepted: false,
    after: '',
    after_or_equal: '',
    alpha: '',
    alpha_space: '',
    alpha_num: '',
    alpha_num_space: '',
    alpha_num_dash: '',
    alpha_num_dash_space: '',
    array: '',
    before: '',
    before_or_equal: '',
    between: '',
    boolean: '',
    card_exp: '',
    card_num: '',
    currency: '',
    date: '',
    date_equals: '',
    email: '',
    in: '',
    integer: '',
    max: '',
    not_in: '',
    not_regex: '',
    numeric: '',
    phone: '',
    regex: '',
    required: '',
    size: '',
    string: '',
    typeof: '',
    url: '',
    ip: '',
    camelCase: '',
    camelCaseID: '',
    PascalCase: '',
    PascalCaseID: ''
  }

  const [formState, setFormState] = useState(initialFormState)
  const validator = new SimpleReactValidator()


  const submitForm = () => {
    if( validator.allValid() ){
      alert('You submitted the form and stuff!');
    } else {
      validator.showMessages()
    }
  }

  const handleInputChange = (event) => {
    console.log(formState)
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    setFormState({
      ...formState, [name]: value
    })
  }

  const example = (name, value, rules, type = 'text') => {
    value = value || formState[name];
    rules = rules || name;
    return (
      <div className="col-sm-6 col-md-4">
        <div className="form-group">
          <label>{name}</label>
          <input className="form-control"
                 type={type}
                 name={name}
                 value={formState[name]}
                 onChange={handleInputChange}
                 onBlur={() => validator.showMessageFor(name)}
                 />
          {validator.message(name, value, rules)}
        </div>
      </div>
    );
  }

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
                <input type="checkbox" name="accepted" className="form-check-input" checked={formState.accepted} onChange={handleInputChange} />
                <span>accepted</span>
              </label>
              {validator.message('checkbox', this.state.accepted, 'accepted')}
            </div>
          </div>

          {example('after', formState.after, [{after: moment().add(1, 'month')}], 'date')}
          {example('after_or_equal', formState.after_or_equal && moment(formState.after_or_equal, 'YYYY-MM-DD'), [{afterOrEqual: moment().add(1, 'month')}], 'date')}
          {example('alpha')}
          {example('alpha_space')}
          {example('alpha_num')}
          {example('alpha_num_space')}
          {example('alpha_num_dash')}
          {example('alpha_num_dash_space')}
          {example('array')}
          {example('before', formState.before, [{before: moment().add(1, 'month')}], 'date')}
          {example('before_or_equal', formState.before_or_equal, [{before_or_equal: moment().add(1, 'month')}], 'date')}
          {example('between', formState.between, 'between:10,20')}
          {example('boolean')}
          {example('card_exp')}
          {example('card_num')}
          {example('currency')}
          {example('date', formState.date, 'date', 'date')}
          {example('date_equals', formState.date_equals, [{date_equals: moment()}], 'date')}
          {example('email')}
          {example('in', formState.in, 'in:stu,stuart,stuman')}
          {example('integer')}
          {example('max', formState.max, 'max:20')}
          {example('min', formState.min, 'min:20,num')}
          {example('not_in', formState.not_in, ['required', {not_in: ['stu', 'stuart']}] )}
          {example('not_regex', formState.not_regex, 'not_regex:^A*$')}
          {example('numeric')}
          {example('phone')}
          {example('regex', formState.regex, 'regex:^A*$')}
          {example('required')}
          {example('size', formState.size, 'size:20,num')}
          {example('string')}
          {example('typeof', formState.typeof, [{typeof: 'string'}] )}
          {example('url')}
          {example('ip', formState.ip, 'ip:127.0.0.1')}
          {example('camelCase', formState.camelCase, 'regex:^A*$')}
          {example('camelCaseID', formState.camelCaseID, 'regex:^A*$')}
          {example('PascalCase', formState.PascalCase, 'regex:^A*$')}
          {example('PascalCaseID', formState.PascalCaseID, 'regex:^A*$')}
        </div>

        <button className="btn btn-primary" onClick={submitForm}>Submit</button>
      </div>
    </div>
  );

}

export default ExampleFormWithHooks;