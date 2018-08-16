import React, { Component } from "react";
import { Button, Icon, Modal, Progress, Transition } from "semantic-ui-react";

const inactive = { backgroundColor: "#e0e1e2" };
const active = { backgroundColor: "#1f7fc7", color: "white" };

class Form2JobCategory extends Component {
  state = {
    jobCategoryID: this.props.savedFields.jobCategoryID || null,
    jobCategoryName: this.props.savedFields.jobCategoryName || null
  };

  handleButtonClick = (jobCategoryID, jobCategoryName) => {
    this.setState({
      jobCategoryName,
      jobCategoryID
    });
  };

  handlePrevPage = () => {
    this.props.save(this.state);
    this.props.prev();
  };

  handleNextPage = () => {
    this.props.save(this.state);
    this.props.next();
  };

  render() {
    const { jobCategoryID } = this.state;

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
            percent={25}
            size="tiny"
            color="blue"
            style={{ margin: "5px 0px" }}
          />
          <Modal.Content style={{ textAlign: "center" }}>
            <Button.Group fluid>
              <Button
                content="Internship"
                onClick={() => this.handleButtonClick(1, "Internship")}
                style={jobCategoryID === 1 ? active : inactive}
              />
              <Button
                content="Part Time"
                onClick={() => this.handleButtonClick(2, "Part Time")}
                style={jobCategoryID === 2 ? active : inactive}
              />
              <Button
                content="Full Time"
                onClick={() => this.handleButtonClick(3, "Full Time")}
                style={jobCategoryID === 3 ? active : inactive}
              />
              <Button
                content="Contract"
                onClick={() => this.handleButtonClick(4, "Contract")}
                style={jobCategoryID === 4 ? active : inactive}
              />
            </Button.Group>
          </Modal.Content>
          <Modal.Actions>
            <Button icon labelPosition="left" onClick={this.handlePrevPage}>
              Previous
              <Icon name="left arrow" />
            </Button>
            <Button
              icon
              primary
              labelPosition="right"
              disabled={!!!jobCategoryID}
              onClick={this.handleNextPage}
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

export default Form2JobCategory;
