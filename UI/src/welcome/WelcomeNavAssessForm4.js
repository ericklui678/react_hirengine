import React, { Component } from "react";
import {
  Button,
  Form,
  Icon,
  Modal,
  Progress,
  Transition
} from "semantic-ui-react";
import cityOptions from "../assets/json/cities";
import collegeOptions from "../assets/json/colleges"; // large json bottleneck
import gradeOptions from "../assets/json/college_grades";
import highSchoolOptions from "../assets/json/high_schools"; // large json bottleneck
import majorOptions from "../assets/json/majors";
import stateOptions from "../assets/json/states";
import yearOptions from "../assets/json/years";

class Form4BasicInfo extends Component {
  state = {
    highSchoolID: this.props.savedFields.highSchoolID || null,
    highSchoolName: this.props.savedFields.highSchoolName || null,
    highSchoolState: this.props.savedFields.highSchoolState || null,
    highSchoolCity: this.props.savedFields.highSchoolCity || null,
    highSchoolGradYear: this.props.savedFields.highSchoolGradYear || null,
    collegeID: this.props.savedFields.collegeID || null,
    collegeName: this.props.savedFields.collegeName || null,
    collegeState: this.props.savedFields.collegeState || null,
    collegeCity: this.props.savedFields.collegeCity || null,
    collegeMajor: this.props.savedFields.collegeMajor || null,
    collegeCompletedGrade: this.props.savedFields.collegeCompletedGrade || null
  };

  handleChange = (e, { name, options, value }) => {
    let data = options[value];
    if (name === "highSchoolName") {
      this.setState({
        highSchoolID: data.value,
        highSchoolName: data.text,
        highSchoolState: data.state,
        highSchoolCity: data.city
      });
    } else if (name === "collegeName") {
      this.setState({
        collegeID: data.value,
        collegeName: data.text
      });
    } else {
      this.setState({ [name]: value });
    }
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
    for (let fieldName in data) {
      if (data[fieldName] === null) return true;
    }
    return false;
  };

  render() {
    const error = this.validate(this.state);
    const {
      highSchoolID,
      highSchoolState,
      highSchoolCity,
      highSchoolGradYear,
      collegeID,
      collegeState,
      collegeCity,
      collegeMajor,
      collegeCompletedGrade
    } = this.state;

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
            <h1 align="center">Basic Information</h1>
          </Modal.Header>
          <Progress
            percent={50}
            size="tiny"
            color="blue"
            style={{ margin: "5px 0px" }}
          />
          <Modal.Content>
            <p style={{ fontSize: "18px" }}>High School Information</p>
            <Form>
              <Form.Dropdown
                defaultValue={highSchoolID}
                fluid
                lazyLoad
                minCharacters={3}
                name="highSchoolName"
                onChange={this.handleChange}
                options={highSchoolOptions}
                placeholder="Search school name"
                search
                selection
              />
              <Form.Input
                fluid
                placeholder={highSchoolCity || "City (read only)"}
                readOnly
              />
              <Form.Input
                fluid
                placeholder={highSchoolState || "State (read only)"}
                readOnly
              />
              <Form.Dropdown
                defaultValue={highSchoolGradYear}
                fluid
                name="highSchoolGradYear"
                onChange={this.handleChange}
                options={yearOptions}
                placeholder="Graduation year"
                search
                selection
              />
            </Form>
            <p style={{ fontSize: "18px", marginTop: "50px" }}>
              College Information
            </p>
            <Form>
              <Form.Dropdown
                defaultValue={collegeID}
                fluid
                lazyLoad
                minCharacters={3}
                name="collegeName"
                onChange={this.handleChange}
                options={collegeOptions}
                placeholder="Search college name"
                search
                selection
              />
              <Form.Dropdown
                defaultValue={collegeCity}
                fluid
                lazyLoad
                minCharacters={3}
                name="collegeCity"
                onChange={this.handleChange}
                options={cityOptions}
                placeholder="City"
                search
                selection
              />
              <Form.Dropdown
                defaultValue={collegeState}
                fluid
                lazyLoad
                name="collegeState"
                onChange={this.handleChange}
                options={stateOptions}
                placeholder="State"
                search
                selection
              />
              <Form.Dropdown
                defaultValue={collegeMajor}
                fluid
                name="collegeMajor"
                onChange={this.handleChange}
                options={majorOptions}
                placeholder="Major"
                search
                selection
              />
              <Form.Dropdown
                defaultValue={collegeCompletedGrade}
                fluid
                name="collegeCompletedGrade"
                onChange={this.handleChange}
                options={gradeOptions}
                placeholder="Completed grade"
                search
                selection
              />
            </Form>
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

export default Form4BasicInfo;
