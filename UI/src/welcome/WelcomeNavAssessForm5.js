import React, { Component } from "react";
import {
  Button,
  Form,
  Icon,
  Modal,
  Progress,
  Transition
} from "semantic-ui-react";
import stateOptions from "../assets/json/states";
import citiesStateOptions from "../assets/json/cities_in_state";

const disabledTextStyle = {
  color: "#dcdcdc",
  marginTop: "-10px"
};

const enabledTextStyle = {
  color: "black",
  marginTop: "-10px"
};

class Form5Locations extends Component {
  state = {
    prefState: this.props.savedFields.prefState || null,
    prefCities: this.props.savedFields.prefCities || []
  };

  handleChange = (e, { name, value }) => {
    const { prefState } = this.state;

    if (name === "prefState") {
      this.setState({ [name]: value });
      if (value !== prefState) this.setState({ prefCities: [] });
    } else {
      let cities = value.filter(city => city.includes(`,${prefState}`));
      this.setState({ prefCities: cities });
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

  getCitiesFromState = prefState => {
    return prefState ? citiesStateOptions[prefState] : [];
  };

  validate = ({ prefState, prefCities }) => {
    let errors = false;
    if (!prefState) {
      errors = true;
    }
    if (prefCities.length === 0) {
      errors = true;
    } else if (prefCities.length > 5) {
      errors = true;
    }
    return errors;
  };

  render() {
    const { prefState, prefCities } = this.state;
    const citiesInSelectedState = this.getCitiesFromState(prefState);

    const errors = this.validate(this.state);

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
            <h1 align="center">Locations</h1>
          </Modal.Header>
          <Progress
            percent={62.5}
            size="tiny"
            color="blue"
            style={{ margin: "5px 0px" }}
          />
          <Modal.Content>
            <p style={{ fontSize: "18px" }}>
              Seect cities you are looking to nail your internship
            </p>
            <Form>
              <Form.Dropdown
                defaultValue={prefState}
                error={!!errors.prefState}
                fluid
                name="prefState"
                onChange={this.handleChange}
                options={stateOptions}
                placeholder="State"
                search
                selection
              />
              <Form.Dropdown
                closeOnChange
                defaultValue={prefCities}
                disabled={!!!prefState}
                error={!!errors.prefCities}
                fluid
                multiple
                name="prefCities"
                onChange={this.handleChange}
                options={citiesInSelectedState}
                placeholder="Cities"
                search
                selection
              />
              <p style={prefState ? enabledTextStyle : disabledTextStyle}>
                *You can select up to five cities.
              </p>
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

export default Form5Locations;
