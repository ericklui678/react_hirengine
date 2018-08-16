import React, { Component } from "react";
import { Dropdown, Icon, Menu } from "semantic-ui-react";
import styled from "styled-components";
import "./dashboard.css";

const active = {
  borderLeft: "4px solid",
  borderRight: "0"
};

const inactive = {
  padding: "12px 16px 12px 20px"
};

const StyledMenuItem = styled(Menu.Item)`
  padding: 20px 16px !important;
`;

const StyledDropdown = styled(Dropdown)`
  padding: 20px 16px !important;
`;

class DashboardNav extends Component {
  state = { activeItem: "dashboard" };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;
    // width default to 240px
    return (
      <Menu
        fixed="left"
        pointing
        secondary
        vertical
        inverted
        style={{ backgroundColor: "#43415d", width: "240px" }}
        color="blue"
      >
        <StyledDropdown item text="Username Here">
          <Dropdown.Menu>
            <Dropdown.Item icon="edit" text="Edit Profile" />
            <Dropdown.Item icon="globe" text="Choose Language" />
            <Dropdown.Item icon="settings" text="Account Settings" />
          </Dropdown.Menu>
        </StyledDropdown>
        <StyledMenuItem
          name="dashboard"
          active={activeItem === "dashboard"}
          onClick={this.handleItemClick}
          style={activeItem === "dashboard" ? active : inactive}
        >
          <Icon name="chart bar" className="left" />
          Dashboard
        </StyledMenuItem>
        <StyledMenuItem
          name="inbox"
          active={activeItem === "inbox"}
          onClick={this.handleItemClick}
          style={activeItem === "inbox" ? active : inactive}
        >
          <Icon name="envelope outline" className="left" />
          Mail
        </StyledMenuItem>
        <StyledMenuItem
          name="products"
          active={activeItem === "products"}
          onClick={this.handleItemClick}
          style={activeItem === "products" ? active : inactive}
        >
          <Icon name="shopping cart" className="left" />
          Products
        </StyledMenuItem>
        <StyledMenuItem
          name="chatroom"
          active={activeItem === "chatroom"}
          onClick={this.handleItemClick}
          style={activeItem === "chatroom" ? active : inactive}
        >
          <Icon name="talk" className="left" />
          Chatroom
        </StyledMenuItem>
        <StyledMenuItem
          name="calendar"
          active={activeItem === "calendar"}
          onClick={this.handleItemClick}
          style={activeItem === "calendar" ? active : inactive}
        >
          <Icon name="calendar alternate outline" className="left" />
          Calendar
        </StyledMenuItem>
        <StyledMenuItem
          name="help center"
          active={activeItem === "help center"}
          onClick={this.handleItemClick}
          style={activeItem === "help center" ? active : inactive}
        >
          <Icon name="help circle" className="left" />
          Help Center
        </StyledMenuItem>
        <StyledMenuItem
          name="settings"
          active={activeItem === "settings"}
          onClick={this.handleItemClick}
          style={activeItem === "settings" ? active : inactive}
        >
          <Icon name="setting" className="left" />
          Settings
        </StyledMenuItem>
        <StyledMenuItem
          name="rate center"
          active={activeItem === "rate center"}
          onClick={this.handleItemClick}
          style={activeItem === "rate center" ? active : inactive}
        >
          <Icon name="star outline" className="left" />
          Rate Center
        </StyledMenuItem>
      </Menu>
    );
  }
}

export default DashboardNav;
