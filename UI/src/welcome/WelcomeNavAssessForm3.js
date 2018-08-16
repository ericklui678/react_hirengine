import React, { Component } from "react";
import {
  Button,
  Checkbox,
  Dropdown,
  Form,
  Divider,
  Icon,
  Input,
  Modal,
  Progress,
  Transition
} from "semantic-ui-react";
import companyOptions from "../assets/json/companies";
import yearOptions from "../assets/json/years";

const inactive = {
  backgroundColor: "#e0e1e2",
  margin: "0px 30px"
};

const active = {
  backgroundColor: "#1f7fc7",
  color: "white",
  margin: "0px 30px"
};

class Form3JobCategory extends Component {
  state = {
    internExp:
      this.props.savedFields.internExp === null
        ? null
        : this.props.savedFields.internExp,
    internCompanyID: this.props.savedFields.internCompanyID || null,
    internCompanyName: this.props.savedFields.internCompanyName || null,
    internStartYear: this.props.savedFields.internStartYear || null,
    internEndYear: this.props.savedFields.internEndYear || null,
    internDescription: this.props.savedFields.internDescription || "",
    internRecommend: !this.props.savedFields.internRecommend ? false : true
  };

  handleButtonClick = buttonValue => {
    this.setState({ internExp: buttonValue });
  };

  handleChange = (e, { name, options, value }) => {
    if (name === "internRecommend") {
      this.setState({ [name]: !this.state.internRecommend });
    } else if (name === "internCompany") {
      this.setState({
        internCompanyID: value,
        internCompanyName: options[value - 1].text
      });
    } else this.setState({ [name]: value });
  };

  handlePrevPage = () => {
    this.props.save(this.state);
    this.props.prev();
  };

  handleNextPage = () => {
    this.props.save(this.state);
    this.props.next();
  };

  validate = data => {
    if (data.internExp === false) return false;
    for (let fieldName in data) {
      if (fieldName === "internRecommend") continue;
      if (data[fieldName] === null || data[fieldName] === "") return true;
    }
    return false;
  };

  render() {
    const {
      internExp,
      internCompanyID,
      internStartYear,
      internEndYear,
      internDescription,
      internRecommend
    } = this.state;

    const error = this.validate(this.state);

    return (
      <Transition animation="fade" duration={1000} transitionOnMount>
        <Modal
          open={true}
          closeIcon
          closeOnEscape={false}
          closeOnDimmerClick={false}
          dimmer={true}
          onClose={this.props.close}
          size="tiny"
        >
          <Modal.Header style={{ border: 0, paddingBottom: "10px" }}>
            <h1 align="center">Job Category</h1>
          </Modal.Header>
          <Progress
            percent={37.5}
            size="tiny"
            color="blue"
            style={{ margin: "5px 0px" }}
          />
          <Modal.Content style={{ textAlign: "center" }}>
            <p style={{ fontSize: "18px" }}>
              Cool, tell me if you already have any internship experiences?
            </p>
            <Button
              content="Yes"
              style={internExp === true ? active : inactive}
              onClick={() => this.handleButtonClick(true)}
            />
            <Button
              content="No"
              style={internExp === false ? active : inactive}
              onClick={() => this.handleButtonClick(false)}
            />
            {internExp && (
              <div>
                <Divider />
                <Form>
                  <Form.Field
                    control={Dropdown}
                    defaultValue={internCompanyID}
                    fluid
                    name="internCompany"
                    onChange={this.handleChange}
                    options={companyOptions}
                    placeholder="Company name"
                    search
                    selection
                  />
                  <Form.Group widths="equal">
                    <Form.Field
                      control={Dropdown}
                      defaultValue={internStartYear}
                      fluid
                      name="internStartYear"
                      onChange={this.handleChange}
                      options={yearOptions}
                      placeholder="Start year"
                      search
                      selection
                    />
                    <Form.Field
                      control={Dropdown}
                      defaultValue={internEndYear}
                      fluid
                      name="internEndYear"
                      onChange={this.handleChange}
                      options={yearOptions}
                      placeholder="End year"
                      search
                      selection
                    />
                  </Form.Group>
                  <Form.Field
                    control={Input}
                    fluid
                    name="internDescription"
                    onChange={this.handleChange}
                    placeholder="Short description of your role"
                    value={internDescription}
                  />
                  <Form.Field style={{ textAlign: "left" }}>
                    <Checkbox
                      checked={internRecommend}
                      name="internRecommend"
                      label="Recommend this company to others?"
                      onChange={this.handleChange}
                    />
                  </Form.Field>
                </Form>
              </div>
            )}
          </Modal.Content>
          <Modal.Actions>
            <Button icon labelPosition="left" onClick={this.handlePrevPage}>
              Previous
              <Icon name="left arrow" />
            </Button>
            <Button
              disabled={error}
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

export default Form3JobCategory;
