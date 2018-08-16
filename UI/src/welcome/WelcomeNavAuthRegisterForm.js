import React, { Component } from "react";
import Validator from "validator";
import PropTypes from "prop-types";
import {
  Button,
  Divider,
  Form,
  Grid,
  Icon,
  Label,
  Message
} from "semantic-ui-react";
import { connect } from "react-redux";
import { signup } from "../actions/auth";

class RegisterForm extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirm: "",
    touched: {
      firstName: false,
      lastName: false,
      email: false,
      password: false,
      confirm: false
    },
    isLoading: false,
    serverErrors: ""
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  validate = ({ firstName, lastName, email, password, confirm }) => {
    let errors = {};

    if (!firstName) errors.firstName = "First name cannot be empty";
    if (!lastName) errors.lastName = "Last name cannot be empty";
    if (!Validator.isEmail(email)) errors.email = "Invalid email format";
    if (password.length < 8)
      errors.password = "Password must be at least 8 characters";
    if (confirm.length < 8)
      errors.confirm = "Password must be at least 8 characters";
    else if (confirm !== password) errors.confirm = "Passwords must match";

    return errors;
  };

  handleBlur = ({ target: { name } }) => {
    this.setState({ touched: { ...this.state.touched, [name]: true } });
  };

  onSubmit = () => {
    const { firstName, lastName, email, password, confirm } = this.state;
    const errors = this.validate({
      firstName,
      lastName,
      email,
      password,
      confirm
    });

    if (Object.keys(errors).length === 0) {
      this.setState({ isLoading: true });

      const data = { firstName, lastName, email, password };

      // data flow of userAuth
      // 1. this.props.userAuth action is called from auth.js
      // 2. api.user.signup is called from api.js and makes axios request
      // 3. axios returns data from server then dispatches userLoggedIn action
      // with server data
      // 4. userLoggedIn action is dispatched to all reducers
      // 5. user.js reducer is hit and returns server data back to Register form

      // if successful register, open modal assessment modal view
      // otherwise stay on register form with error

      this.props
        .signup(data)
        .then(() => this.props.openAssessModal())
        .catch(err =>
          this.setState({
            serverErrors: err.response.data.errors,
            isLoading: false
          })
        );
    }
  };

  render() {
    const {
      firstName,
      lastName,
      email,
      password,
      confirm,
      touched,
      isLoading,
      serverErrors
    } = this.state;

    const errors = this.validate(this.state);
    const displayError = name => {
      const fieldTouched = touched[name];
      const hasError = errors[name];
      return fieldTouched && hasError ? true : false;
    };

    return (
      <div id="registerForm">
        <Form onSubmit={this.onSubmit} loading={isLoading}>
          {serverErrors && (
            <Message negative>
              <p>{serverErrors}</p>
            </Message>
          )}
          <Form.Field error={displayError("firstName")}>
            {displayError("firstName") && (
              <Label color="red" pointing="below" content={errors.firstName} />
            )}
            <Form.Input
              name="firstName"
              icon="user"
              iconPosition="left"
              placeholder="First name"
              value={firstName}
              onBlur={this.handleBlur}
              onChange={this.handleChange}
            />
          </Form.Field>

          <Form.Field error={displayError("lastName")}>
            {displayError("lastName") && (
              <Label color="red" pointing="below" content={errors.lastName} />
            )}
            <Form.Input
              name="lastName"
              icon="user outline"
              iconPosition="left"
              placeholder="Last name"
              value={lastName}
              onBlur={this.handleBlur}
              onChange={this.handleChange}
            />
          </Form.Field>

          <Form.Field error={displayError("email")}>
            {displayError("email") && (
              <Label color="red" pointing="below" content={errors.email} />
            )}
            <Form.Input
              name="email"
              icon="mail"
              iconPosition="left"
              placeholder="Email"
              value={email}
              onBlur={this.handleBlur}
              onChange={this.handleChange}
            />
          </Form.Field>

          <Form.Field error={displayError("password")}>
            {displayError("password") && (
              <Label color="red" pointing="below" content={errors.password} />
            )}
            <Form.Input
              name="password"
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
              value={password}
              onBlur={this.handleBlur}
              onChange={this.handleChange}
            />
          </Form.Field>

          <Form.Field error={displayError("confirm")}>
            {displayError("confirm") && (
              <Label color="red" pointing="below" content={errors.confirm} />
            )}
            <Form.Input
              name="confirm"
              icon="lock"
              iconPosition="left"
              placeholder="Confirm password"
              type="password"
              value={confirm}
              onBlur={this.handleBlur}
              onChange={this.handleChange}
            />
          </Form.Field>

          <Form.Button
            animated
            disabled={!!Object.keys(errors).length}
            fluid
            primary
            size="large"
          >
            <Button.Content visible>Create Account</Button.Content>
            <Button.Content hidden>
              <Icon name="user plus" />
            </Button.Content>
          </Form.Button>
        </Form>
        <Divider horizontal>Or sign in with</Divider>
        <Grid columns={3}>
          <Grid.Row>
            <Grid.Column style={{ paddingRight: 0 }}>
              <Button fluid color="red" size="tiny">
                <Icon name="google plus g" />
                Google
              </Button>
            </Grid.Column>
            <Grid.Column style={{ padding: "0 7px" }}>
              <Button fluid color="blue" size="tiny">
                <Icon name="facebook" />
                Facebook
              </Button>
            </Grid.Column>
            <Grid.Column style={{ paddingLeft: 0 }}>
              <Button fluid color="violet" size="tiny">
                <Icon name="linkedin" />
                LinkedIn
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

RegisterForm.propTypes = {
  signup: PropTypes.func.isRequired
};

export default connect(null, { signup })(RegisterForm);
