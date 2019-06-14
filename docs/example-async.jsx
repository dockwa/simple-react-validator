class ExampleAsyncForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      processing: false
    };
    this.validator = new SimpleReactValidator({
      className: 'text-danger',
      validators: {
        unique: {
          message: 'Not a unique email.',
          asyncRule: function(val, params, validator, completion) {
            setTimeout(() => validator.fail(completion), 1000);
          }
        }
      }
    });
  }

  submitForm() {
    this.setState({processing: true});
    this.validator.asyncValid({
      pass: () => {
        alert('You submitted the form and stuff!');
        this.setState({processing: false});
      },
      fail: () => {
        console.log(this.validator);
        this.validator.showMessages();
        this.setState({processing: false});
      }
    });
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
          <h3>Example Async Form</h3>
          <small className="text-muted">Click submit to view messages.</small>
          <hr />
          <div className="row">
            <div className="col-sm-6 col-md-4">
              <div className="form-group">
                <label>Email</label>
                <input className="form-control" type="email" name="email" value={this.state.email} onChange={this.handleInputChange.bind(this)} />
                {this.validator.message('email', this.state.email, 'email|unique')}
              </div>
            </div>
          </div>
          <button className="btn btn-primary" onClick={this.submitForm.bind(this)} disabled={this.state.processing}>Submit</button>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<ExampleAsyncForm />, document.getElementById('exampleAsyncForm'));
