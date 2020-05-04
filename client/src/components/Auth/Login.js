import React, { Component } from "react";
import { connect } from "react-redux";
import { loginUser } from "../../actions/user_actions";
import { Link } from "react-router-dom";

class Login extends Component {
  state = {
    email: "",
    password: "",
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
    };

    if (this.isFormValid(dataToSubmit)) {
      this.setState({ errors: [] });
      this.props.dispatch(loginUser(dataToSubmit)).then((response) => {
        if (response.payload.loginSuccess) {
          this.props.history.push("/");
        }
      });
    }
  }

  isFormValid({ email, password }) {
    return email && password;
    //! Change this ---===---
  }

  render() {
    return (
      <div className='container'>
        <h2>Login</h2>
        <div className='row'>
          <form className='col s12'>
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
                  Login
                </button>
              </div>
              <div className='col'>
                <Link to='/register'>
                  <button
                    className='btn waves-effect purple lighten-2'
                    type='submit'
                    name='action'
                  >
                    Register
                  </button>
                </Link>
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

export default connect(mapStateToProps)(Login);
