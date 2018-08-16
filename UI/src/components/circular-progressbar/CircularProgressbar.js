import React, { Component } from "react";
import PropTypes from "prop-types";
import "./circularProgressbar.css";

class CircularProgress extends Component {
  constructor(props) {
    super(props);
    const percent = props.percent;

    let leftTransformerDegree = "0deg";
    let rightTransformerDegree = "0deg";
    if (percent >= 50) {
      rightTransformerDegree = "180deg";
      leftTransformerDegree = (percent - 50) * 3.6 + "deg";
    } else {
      rightTransformerDegree = percent * 3.6 + "deg";
      leftTransformerDegree = "0deg";
    }
    this.state = {
      percent: this.props.percent,
      borderWidth:
        this.props.borderWidth < 2 || !this.props.borderWidth
          ? 2
          : this.props.borderWidth,
      leftTransformerDegree: leftTransformerDegree,
      rightTransformerDegree: rightTransformerDegree
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.percent !== this.props.percent) {
      this.updatePercent();
    }
  }

  updatePercent() {
    let leftTransformerDegree = "0deg";
    let rightTransformerDegree = "0deg";
    if (this.props.percent >= 50) {
      rightTransformerDegree = "180deg";
      leftTransformerDegree = (this.props.percent - 50) * 3.6 + "deg";
    } else {
      rightTransformerDegree = this.props.percent * 3.6 + "deg";
      leftTransformerDegree = "0deg";
    }

    this.setState({
      percent: this.props.percent,
      borderWidth:
        this.props.borderWidth < 2 || !this.props.borderWidth
          ? 2
          : this.props.borderWidth,
      leftTransformerDegree: leftTransformerDegree,
      rightTransformerDegree: rightTransformerDegree
    });
  }

  render() {
    // console.log("circular bar should change percent here", this.props.percent);
    return (
      <div
        className="circle-progress"
        style={{
          width: this.props.radius * 2,
          height: this.props.radius * 2,
          borderRadius: this.props.radius,
          backgroundColor: this.props.bgcolor
        }}
      >
        <div
          className="left-wrap"
          style={{
            width: this.props.radius,
            height: this.props.radius * 2,
            left: 0
          }}
        >
          <div
            className="loader"
            id="id1"
            style={{
              left: this.props.radius,
              width: this.props.radius,
              height: this.props.radius * 2,
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
              backgroundColor: this.props.color,
              transform: "rotate(" + this.state.leftTransformerDegree + ")"
            }}
          />
        </div>
        <div
          className="right-wrap"
          style={{
            width: this.props.radius,
            height: this.props.radius * 2,
            left: this.props.radius
          }}
        >
          <div
            className="loader2"
            id="id2"
            style={{
              left: -this.props.radius,
              width: this.props.radius,
              height: this.props.radius * 2,
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
              backgroundColor: this.props.color,
              transform: "rotate(" + this.state.rightTransformerDegree + ")"
            }}
          />
        </div>
        <div
          className="inner-circle"
          style={{
            left: this.props.borderWidth,
            top: this.props.borderWidth,
            width: (this.props.radius - this.props.borderWidth) * 2,
            height: (this.props.radius - this.props.borderWidth) * 2,
            borderRadius: this.props.radius - this.props.borderWidth,
            backgroundColor: this.props.innerColor
          }}
        >
          <div className={"text " + this.props.textStyle}>
            <span className="percent">{this.props.percent}%</span>
            <span className="subtext">{this.props.children}</span>
          </div>
        </div>
      </div>
    );
  }
}

CircularProgress.propTypes = {
  color: PropTypes.string,
  bgcolor: PropTypes.string,
  innerColor: PropTypes.string,
  radius: PropTypes.number,
  percent: PropTypes.number,
  borderWidth: PropTypes.number,
  textStyle: PropTypes.string
};

CircularProgress.defaultProps = {
  color: "#000",
  radius: 80,
  percent: 50,
  borderWidth: 10,
  bgcolor: "#e3e3e3",
  innerColor: "#fff",
  disabled: false,
  textStyle: ""
};

export default CircularProgress;
