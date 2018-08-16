import React, { Component } from "react";
import Form1Ready from "./WelcomeNavAssessForm1";
import Form2JobType from "./WelcomeNavAssessForm2";
import Form3JobCategory from "./WelcomeNavAssessForm3";
import Form4BasicInfo from "./WelcomeNavAssessForm4";
import Form5Locations from "./WelcomeNavAssessForm5";
import Form6Assessment from "./WelcomeNavAssessForm6";
import Form7Answers from "./WelcomeNavAssessForm7";

class WelcomeNavAssess extends Component {
  state = {
    step: 1,
    formData: {
      jobCategoryName: null,
      jobCategoryID: null,
      internExp: null,
      internCompanyID: null,
      internCompanyName: null,
      internStartYear: null,
      internEndYear: null,
      internDescription: null,
      internRecommend: null,
      highSchoolID: null,
      highSchoolName: null,
      highSchoolState: null,
      highSchoolCity: null,
      highSchoolGradYear: null,
      collegeID: null,
      collegeName: null,
      collegeState: null,
      collegeCity: null,
      collegeMajor: null,
      collegeCompletedGrade: null,
      prefState: null,
      prefCities: null,
      answers: null
    }
  };

  nextStep = () => {
    this.setState({ step: this.state.step + 1 });
  };

  prevStep = () => {
    this.setState({ step: this.state.step - 1 });
  };

  saveFieldData = objFromChildForm => {
    let updatedFormData = Object.assign({}, this.state.formData);
    for (let fieldName in objFromChildForm) {
      let fieldValue = objFromChildForm[fieldName];
      updatedFormData[fieldName] = fieldValue;
    }
    this.setState({ formData: updatedFormData });
  };

  render() {
    console.log(this.state.formData);

    const {
      formData: {
        jobCategoryName,
        jobCategoryID,
        internExp,
        internCompanyID,
        internCompanyName,
        internStartYear,
        internEndYear,
        internDescription,
        internRecommend,
        highSchoolID,
        highSchoolName,
        highSchoolState,
        highSchoolCity,
        highSchoolGradYear,
        collegeID,
        collegeName,
        collegeState,
        collegeCity,
        collegeMajor,
        collegeCompletedGrade,
        prefState,
        prefCities,
        answers
      },
      step
    } = this.state;

    switch (step) {
      case 1:
        return <Form1Ready close={this.props.close} next={this.nextStep} />;
      case 2:
        return (
          <Form2JobType
            close={this.props.close}
            prev={this.prevStep}
            next={this.nextStep}
            save={this.saveFieldData}
            savedFields={{ jobCategoryID, jobCategoryName }}
          />
        );
      case 3:
        const internData = {
          internExp,
          internCompanyID,
          internCompanyName,
          internStartYear,
          internEndYear,
          internDescription,
          internRecommend
        };
        return (
          <Form3JobCategory
            close={this.props.close}
            prev={this.prevStep}
            next={this.nextStep}
            save={this.saveFieldData}
            savedFields={internData}
          />
        );
      case 4:
        const schoolData = {
          highSchoolID,
          highSchoolName,
          highSchoolState,
          highSchoolCity,
          highSchoolGradYear,
          collegeID,
          collegeName,
          collegeState,
          collegeCity,
          collegeMajor,
          collegeCompletedGrade
        };
        return (
          <Form4BasicInfo
            close={this.props.close}
            prev={this.prevStep}
            next={this.nextStep}
            save={this.saveFieldData}
            savedFields={schoolData}
          />
        );
      case 5:
        const locationData = { prefState, prefCities };
        return (
          <Form5Locations
            close={this.props.close}
            prev={this.prevStep}
            next={this.nextStep}
            save={this.saveFieldData}
            savedFields={locationData}
          />
        );
      case 6:
        return (
          <Form6Assessment
            close={this.props.close}
            prev={this.prevStep}
            next={this.nextStep}
          />
        );
      case 7:
        return (
          <Form7Answers
            close={this.props.close}
            prev={this.prevStep}
            next={this.nextStep}
            save={this.saveFieldData}
            savedFields={{ answers }}
          />
        );
      default:
        return;
    }
  }
}

export default WelcomeNavAssess;
