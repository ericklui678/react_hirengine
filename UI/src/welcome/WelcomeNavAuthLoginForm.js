import React, { Component } from "react";
import Validator from "validator";
import {
  Button,
  Divider,
  Form,
  Grid,
  Icon,
  Label,
  Message
} from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../actions/auth";

class LoginForm extends Component {
  state = {
    email: "",
    password: "",
    errors: {},
    loading: false
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  validate = ({ email, password }) => {
    const errors = {};

    if (!Validator.isEmail(email)) errors.email = "Invalid email format";
    // later add check for whether email exists in database
    if (password.length < 8) errors.password = "Must be at least 8 characters";
    // later add check for whether password hash matches in database
    return errors;
  };

  onSubmit = () => {
    const { email, password } = this.state;
    const errors = this.validate({ email, password });
    this.setState({ errors });

    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      this.props
        .login({ email, password })
        .then(() => {
          this.setState({ loading: false });
          // you'll either go to welcome page if unfinished assessment
          // or dashboard if assessment is finished
          // for now, we'll route to dashboard
          this.props.history.push("/dashboard");
        })
        .catch(err =>
          this.setState({
            errors: { server: err.response.data.errors },
            loading: false
          })
        );
    }
  };

  render() {
    const { email, password, errors, loading } = this.state;

    return (
      <div>
        <Form onSubmit={this.onSubmit} loading={loading}>
          {errors.server && (
            <Message negative>
              <p>{errors.server}</p>
            </Message>
          )}
          <Form.Field error={!!errors.email}>
            {errors.email && (
              <Label color="red" pointing="below" content={errors.email} />
            )}
            <Form.Input
              name="email"
              icon="mail"
              iconPosition="left"
              placeholder="Email"
              value={email}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field error={!!errors.password}>
            {errors.password && (
              <Label color="red" pointing="below" content={errors.password} />
            )}
            <Form.Input
              name="password"
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
              value={password}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Button primary animated fluid size="large">
            <Button.Content visible>Log In</Button.Content>
            <Button.Content hidden>
              <Icon name="right arrow" />
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

export default connect(null, { login })(withRouter(LoginForm));
