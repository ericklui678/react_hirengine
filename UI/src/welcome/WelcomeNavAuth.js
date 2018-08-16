import React, { Component } from "react";
import LoginForm from "./WelcomeNavAuthLoginForm";
import RegisterForm from "./WelcomeNavAuthRegisterForm";
import { Menu, Modal, Segment } from "semantic-ui-react";

class UserRegistrationModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.formName
    };
  }

  handleTabClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <Modal
        closeIcon
        dimmer={"blurring"}
        open={true}
        onClose={this.props.close}
        size="mini"
      >
        <Menu attached="top" tabular size="massive">
          <Menu.Item
            name="Log In"
            active={activeItem === "Log In"}
            onClick={this.handleTabClick}
          />
          <Menu.Item
            name="Register"
            active={activeItem === "Register"}
            onClick={this.handleTabClick}
          />
        </Menu>
        <Segment active={""} attached="bottom">
          {activeItem === "Log In" && <LoginForm />}
          {activeItem === "Register" && (
            <RegisterForm openAssessModal={this.props.openAssessModal} />
          )}
        </Segment>
      </Modal>
    );
  }
}

export default UserRegistrationModal;
