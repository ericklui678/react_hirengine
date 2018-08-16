/* eslint-disable no-undef */

import React from "react";
const { compose, withProps, lifecycle } = require("recompose");
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer
} = require("react-google-maps");

const MapWithADirectionsRenderer = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyCcXan7F8zWGXsRosO5JSJ6WlHQQnJtQhg&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap,
  lifecycle({
    componentDidMount() {
      console.log("did mount");
      const DirectionsService = new google.maps.DirectionsService();

      DirectionsService.route(
        {
          origin: new google.maps.LatLng(37.3352, -121.8811),
          destination: new google.maps.LatLng(40, -121),
          travelMode: google.maps.TravelMode.DRIVING
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            this.setState({
              directions: result
            });
          } else {
            console.error(`error fetching directions ${result}`);
          }
        }
      );
    },

    componentDidUpdate(prevProps) {
      console.log("old", prevProps.destLat, prevProps.destLong);
      console.log("new", this.props.destLat, this.props.destLong);
      const DirectionsService = new google.maps.DirectionsService();

      // if (prevProps.destLat !== this.props.destLat) {
      //   console.log("inside get directions");
      //   DirectionsService.route(
      //     {
      //       origin: new google.maps.LatLng(37.387, -121.848),
      //       destination: new google.maps.LatLng(40, -121.848),
      //       travelMode: google.maps.TravelMode.DRIVING
      //     },
      //     (result, status) => {
      //       if (status === google.maps.DirectionsStatus.OK) {
      //         this.setState({
      //           directions: result
      //         });
      //       } else {
      //         console.error(`error fetching directions ${result} ${status}`);
      //       }
      //     }
      //   );
      // }
    }
  })
)(props => (
  <GoogleMap
    defaultZoom={7}
    defaultCenter={new google.maps.LatLng(41.85073, -87.65126)}
  >
    {props.directions && <DirectionsRenderer directions={props.directions} />}
  </GoogleMap>
));

export default MapWithADirectionsRenderer;
