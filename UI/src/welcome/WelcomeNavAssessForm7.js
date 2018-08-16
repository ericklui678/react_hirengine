import React, { Component } from "react";
import {
  Button,
  Icon,
  Form,
  Modal,
  Progress,
  Radio,
  Transition
} from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";

const paddingLeft = { paddingLeft: "30px" };
const paddingBottom = { paddingBottom: "15px" };
const marginBottom = { marginBottom: "7px" };

const StyledFormGroup = styled.div`
  padding-left: 20px;
`;

class Form7Answers extends Component {
  state = {
    answers: this.props.savedFields.answers || [null, null, null, null]
  };

  handleChange = (e, { name, value }) => {
    const { answers } = this.state;
    const idx = Number(name);
    let newAnswers = answers.slice();
    newAnswers[idx] = value;
    this.setState({ answers: newAnswers });
  };

  handlePrevPage = () => {
    this.props.save(this.state);
    this.props.prev();
  };

  handleNextPage = () => {
    this.props.save(this.state);
    // will need to call action to send assessment data
    this.props.history.push("/dashboard");
  };

  validate = ({ answers }) => {
    return answers.indexOf(null) !== -1 ? true : false;
  };

  render() {
    const { answers } = this.state;
    const errors = this.validate(this.state);

    return (
      <Transition animation="fade" duration={1000} transitionOnMount>
        <Modal
          open
          closeIcon
          closeOnEscape={false}
          closeOnDimmerClick={false}
          dimmer={true}
          onClose={this.props.close}
          size="small"
        >
          <Modal.Header style={{ border: 0, paddingBottom: "10px" }}>
            <h1 align="center">Assessment</h1>
          </Modal.Header>
          <Progress
            percent={87.5}
            size="tiny"
            color="blue"
            style={{ margin: "5px 0px" }}
          />
          <Modal.Content style={paddingLeft}>
            <p style={{ fontSize: "18px" }}>
              Please answer the following questions.
            </p>
            <Form style={paddingBottom}>
              <Form.Field style={marginBottom}>
                1. How do typically deal with stress from a challenging task?
              </Form.Field>
              <StyledFormGroup>
                <Form.Field style={marginBottom}>
                  <Radio
                    checked={answers[0] === "A"}
                    label="Take a short break"
                    name="0"
                    onChange={this.handleChange}
                    value="A"
                  />
                </Form.Field>
                <Form.Field style={marginBottom}>
                  <Radio
                    checked={answers[0] === "B"}
                    label="Talk it out to myself or another person"
                    name="0"
                    onChange={this.handleChange}
                    value="B"
                  />
                </Form.Field>
                <Form.Field style={marginBottom}>
                  <Radio
                    checked={answers[0] === "C"}
                    label="Sleep on it and attempt again the next day"
                    name="0"
                    onChange={this.handleChange}
                    value="C"
                  />
                </Form.Field>
                <Form.Field style={marginBottom}>
                  <Radio
                    checked={answers[0] === "D"}
                    label="Keep at the problem until there's a breakthrough"
                    name="0"
                    onChange={this.handleChange}
                    value="D"
                  />
                </Form.Field>
              </StyledFormGroup>
            </Form>

            <Form style={paddingBottom}>
              <Form.Field style={marginBottom}>
                2. When would you usually seek assistance upon a challenging
                task?
              </Form.Field>
              <StyledFormGroup>
                <Form.Field style={marginBottom}>
                  <Radio
                    checked={answers[1] === "A"}
                    label="Immediately"
                    name="1"
                    onChange={this.handleChange}
                    value="A"
                  />
                </Form.Field>
                <Form.Field style={marginBottom}>
                  <Radio
                    checked={answers[1] === "B"}
                    label="After being stuck for at least 15 min"
                    name="1"
                    onChange={this.handleChange}
                    value="B"
                  />
                </Form.Field>
                <Form.Field style={marginBottom}>
                  <Radio
                    checked={answers[1] === "C"}
                    label="After being stuck for at least 30 min"
                    name="1"
                    onChange={this.handleChange}
                    value="C"
                  />
                </Form.Field>
                <Form.Field style={marginBottom}>
                  <Radio
                    checked={answers[1] === "D"}
                    label="After being stuck for at least an hour"
                    name="1"
                    onChange={this.handleChange}
                    value="D"
                  />
                </Form.Field>
              </StyledFormGroup>
            </Form>

            <Form style={paddingBottom}>
              <Form.Field style={marginBottom}>
                3. How often do you prefer communicating with your team?
              </Form.Field>
              <StyledFormGroup>
                <Form.Field style={marginBottom}>
                  <Radio
                    checked={answers[2] === "A"}
                    label="Daily"
                    name="2"
                    onChange={this.handleChange}
                    value="A"
                  />
                </Form.Field>
                <Form.Field style={marginBottom}>
                  <Radio
                    checked={answers[2] === "B"}
                    label="Every other day"
                    name="2"
                    onChange={this.handleChange}
                    value="B"
                  />
                </Form.Field>
                <Form.Field style={marginBottom}>
                  <Radio
                    checked={answers[2] === "C"}
                    label="Once a week"
                    name="2"
                    onChange={this.handleChange}
                    value="C"
                  />
                </Form.Field>
                <Form.Field style={marginBottom}>
                  <Radio
                    checked={answers[2] === "D"}
                    label="Only when a large problem needs to be addressed"
                    name="2"
                    onChange={this.handleChange}
                    value="D"
                  />
                </Form.Field>
              </StyledFormGroup>
            </Form>
            <Form style={paddingBottom}>
              <Form.Field style={marginBottom}>
                4. How would you rate your own overall confidence in finding new
                opportunities?
              </Form.Field>
              <StyledFormGroup>
                <Form.Field style={marginBottom}>
                  <Radio
                    checked={answers[3] === "A"}
                    label="Needs much improvement"
                    name="3"
                    onChange={this.handleChange}
                    value="A"
                  />
                </Form.Field>
                <Form.Field style={marginBottom}>
                  <Radio
                    checked={answers[3] === "B"}
                    label="Some confidence"
                    name="3"
                    onChange={this.handleChange}
                    value="B"
                  />
                </Form.Field>
                <Form.Field style={marginBottom}>
                  <Radio
                    checked={answers[3] === "C"}
                    label="Confident enough"
                    name="3"
                    onChange={this.handleChange}
                    value="C"
                  />
                </Form.Field>
                <Form.Field style={marginBottom}>
                  <Radio
                    checked={answers[3] === "D"}
                    label="Extremely confident"
                    name="3"
                    onChange={this.handleChange}
                    value="D"
                  />
                </Form.Field>
              </StyledFormGroup>
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button icon labelPosition="left" onClick={this.handlePrevPage}>
              Previous
              <Icon name="left arrow" />
            </Button>
            <Button
              disabled={errors}
              icon
              onClick={this.handleNextPage}
              primary
              labelPosition="right"
            >
              Next
              <Icon name="right arrow" />
            </Button>
          </Modal.Actions>
        </Modal>
      </Transition>
    );
  }
}

export default withRouter(Form7Answers);
