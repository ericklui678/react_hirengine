import React, { Component } from "react";
import NavAuth from "./WelcomeNavAuth";
import NavAssess from "./WelcomeNavAssess";
import ExitConfirmation from "./WelcomeExitConfirmation";
import { Label, Menu } from "semantic-ui-react";
import { connect } from "react-redux";
import { logout } from "../actions/auth";
import PropTypes from "prop-types";

class Navbar extends Component {
  state = {
    activeItem: "hirengine",
    openRegModal: false,
    modalType: "",
    openAssessModal: false, //remember to default to false, true for testing,
    openExitConfirmModal: false
  };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  closeRegModal = () => {
    this.setState({ openRegModal: false });
  };

  openAssessModal = () => {
    this.setState({
      openAssessModal: true,
      openRegModal: false
    });
  };

  openExitConfirmModal = () => {
    this.setState({ openExitConfirmModal: true });
  };

  cancelExitConfirmModal = () => {
    this.setState({ openExitConfirmModal: false });
  };

  confirmExitConfirmModal = () => {
    this.setState({ openExitConfirmModal: false, openAssessModal: false });
  };

  render() {
    const {
      activeItem,
      modalType,
      openAssessModal,
      openRegModal,
      openExitConfirmModal
    } = this.state;

    const { isAuthenticated } = this.props;

    return (
      <div>
        <Menu
          inverted
          pointing
          secondary
          size="large"
          style={{ backgroundColor: "#44687C" }}
        >
          <Menu.Item
            name="hirengine"
            active={activeItem === "hirengine"}
            onClick={this.handleItemClick}
          />
          <Menu.Menu position="right">
            {isAuthenticated && (
              <Menu.Item
                name="Assessment"
                active={activeItem === "Assessment"}
                onClick={this.openAssessModal}
              >
                Assessment
                <Label color="teal" size="mini">
                  1
                </Label>
              </Menu.Item>
            )}
            <Menu.Item
              name="Employers"
              active={activeItem === "Employers"}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name="Agencies"
              active={activeItem === "Agencies"}
              onClick={this.handleItemClick}
            />
            {isAuthenticated && (
              <Menu.Item
                name="Log Out"
                active={activeItem === "Log Out"}
                onClick={() => this.props.logout()}
              />
            )}
            {!isAuthenticated && (
              <Menu.Item
                name="Log In"
                active={activeItem === "Log In"}
                onClick={() =>
                  this.setState({ openRegModal: true, modalType: "Log In" })
                }
              />
            )}
            {!isAuthenticated && (
              <Menu.Item
                name="Sign Up"
                active={activeItem === "Sign Up"}
                onClick={() =>
                  this.setState({ openRegModal: true, modalType: "Register" })
                }
              />
            )}
          </Menu.Menu>
        </Menu>

        {openRegModal && (
          <NavAuth
            open={openRegModal}
            close={this.closeRegModal}
            formName={modalType}
            openAssessModal={this.openAssessModal}
          />
        )}

        {openAssessModal && <NavAssess close={this.openExitConfirmModal} />}

        {openExitConfirmModal && (
          <ExitConfirmation
            cancel={this.cancelExitConfirmModal}
            confirm={this.confirmExitConfirmModal}
          />
        )}
      </div>
    );
  }
}

Navbar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.token
  };
}

export default connect(mapStateToProps, { logout })(Navbar);
