import React, { Component } from "react";
import { connect } from "react-redux";
import { registerUser } from "../../actions/user_actions";

class Register extends Component {
  state = {
    email: "",
    password: "",
    name: "",
    lastName: "",
    confirmPassword: "",
    errors: [],
  };

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  submitForm(e) {
    e.preventDefault();

    const dataToSubmit = {
      email: this.state.email,
      password: this.state.password,
      name: this.state.name,
      lastName: this.state.lastName,
    };

    if (this.isFormValid(dataToSubmit)) {
      this.setState({ errors: [] });
      this.props
        .dispatch(registerUser(dataToSubmit))
        .then((response) => {
          console.log(response);
          if (response.payload.success) {
            this.props.history.push("/login");
          } else {
            this.setState({
              errors: this.state.errors.concat(response.payload.err.message),
            });
          }
        })
        .catch((err) => {
          this.setState({
            errors: this.state.errors.concat(err),
          });
        });
    } else {
      this.setState({
        errors: this.state.errors.concat("Form Not Valid!"),
      });
    }
  }

  isFormValid({ email, password, name, lastName, confirmPassword }) {
    //! Change this ---===---
    let errors = [];
    if (password !== confirmPassword) {
      errors.push("Passwords Dont match.");
    }
    if (email === "") {
      errors.push("Please enter an email.");
    }
    this.setState({ errors });
    return email && password && name && lastName;
  }

  render() {
    return (
      <div className='container'>
        <h2>Register</h2>
        <div className='row'>
          <form className='col s12'>
            <div className='row'>
              <div className='input-field col s12'>
                <input
                  type='text'
                  name='name'
                  value={this.state.name}
                  onChange={(e) => this.handleChange(e)}
                  id='name'
                  className='validate'
                />
                <label htmlFor='name'>Name</label>
                <span
                  className='helper-text'
                  data-error='Type a right name!'
                  data-success='Right!'
                />
              </div>
            </div>

            <div className='row'>
              <div className='input-field col s12'>
                <input
                  type='text'
                  name='lastName'
                  value={this.state.lastName}
                  onChange={(e) => this.handleChange(e)}
                  id='lastName'
                  className='validate'
                />
                <label htmlFor='lastName'>lastName</label>
                <span
                  className='helper-text'
                  data-error='Type a right lastName!'
                  data-success='Right!'
                />
              </div>
            </div>
            <div className='row'>
              <div className='input-field col s12'>
                <input
                  type='email'
                  name='email'
                  value={this.state.email}
                  onChange={(e) => this.handleChange(e)}
                  id='email'
                  className='validate'
                />
                <label htmlFor='email'>Email</label>
                <span
                  className='helper-text'
                  data-error='Type a right email!'
                  data-success='Right!'
                />
              </div>
            </div>
            <div className='row'>
              <div className='input-field col s12'>
                <input
                  type='password'
                  name='password'
                  value={this.state.password}
                  onChange={(e) => this.handleChange(e)}
                  id='password'
                  className='validate'
                />
                <label htmlFor='password'>password</label>
                <span
                  className='helper-text'
                  data-error='Type a right password!'
                  data-success='Right!'
                />
              </div>
            </div>
            <div className='row'>
              <div className='input-field col s12'>
                <input
                  type='password'
                  name='confirmPassword'
                  value={this.state.confirmPassword}
                  onChange={(e) => this.handleChange(e)}
                  id='confirmPassword'
                  className='validate'
                />
                <label htmlFor='confirmPassword'>Confirm Password</label>
                <span
                  className='helper-text'
                  data-error='Type a right password!'
                  data-success='Right!'
                />
              </div>
            </div>

            {this.state.errors && (
              <div>
                {this.state.errors.map((error, index) => {
                  return <p key={index}>{error}</p>;
                })}
              </div>
            )}

            <div className='row'>
              <div className='col'>
                <button
                  className='btn waves-effect purple lighten-2'
                  type='submit'
                  name='action'
                  onClick={(e) => this.submitForm(e)}
                >
                  Create An Account
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(Register);
