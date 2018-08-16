import React, { Component } from "react";
import { Button, Icon, Modal, Progress, Transition } from "semantic-ui-react";

class Form1Welcome extends Component {
  render() {
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
            <h1 align="center">Ready?</h1>
          </Modal.Header>
          <Progress
            percent={12.5}
            size="tiny"
            color="blue"
            style={{ margin: "5px 0px" }}
          />
          <Modal.Content style={{ fontSize: "1.1em" }}>
            <p>Howdy!</p>
            <p>My name is Kelly, and I am the Engine. It's great to see you!</p>
            <p>
              I can help you to browse and find the best matched opportunities.
            </p>
            <p>
              In order to get started, I need to collect some information to get
              to know you better.
            </p>
          </Modal.Content>
          <Modal.Actions>
            <Button icon labelPosition="left" onClick={this.props.close}>
              Home
              <Icon name="home" />
            </Button>
            <Button
              icon
              primary
              labelPosition="right"
              onClick={this.props.next}
            >
              Start
              <Icon name="right arrow" />
            </Button>
          </Modal.Actions>
        </Modal>
      </Transition>
    );
  }
}

export default Form1Welcome;
