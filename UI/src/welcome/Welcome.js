import React, { Component } from "react";
import Navbar from "./WelcomeNav";
import LearnMoreRecruitment from "./WelcomeLearnMoreRecruit";
import LearnMoreInternship from "./WelcomeLearnMoreIntern";
import { Container } from "semantic-ui-react";
import styled from "styled-components";

const paddingYLarge = { padding: "50px 0" };
const textCyan = { color: "#486978" };

const StyledContainerTop = styled.div`
  background-color: #5f92b1;
  color: #f5f6f6;
  text-shadow: 1px 1px #000000;
`;

const StyledContainerBottom = styled.div`
  background-color: #bdd8e1;
`;

const Header1 = styled.h1`
  margin-top: 0px;
  margin-bottom: 14px;
  color: white;
  font-weight: 100;
  text-shadow: 1px 1px #000000;
`;

const Header2 = styled.h2`
  font-weight: 100;
`;

const Div = styled.div`
  margin-bottom: 50px;
  font-size: 12pt;
  font-weight: 100;
`;

const Span = styled.span`
  cursor: pointer;
`;

class WelcomePage extends Component {
  state = { openModal: 0 };

  closeModal = () => {
    this.setState({ openModal: 0 });
  };

  openRecruitInfoModal = () => {
    this.setState({ openModal: 1 });
  };

  openInternInfoModal = () => {
    this.setState({ openModal: 2 });
  };

  render() {
    const { openModal } = this.state;

    return (
      <div>
        <Navbar />
        <StyledContainerTop>
          <Container fluid>
            <Container textAlign="center" style={paddingYLarge}>
              <Header2>
                Professional full time and part-time opportunities
              </Header2>
              <Header1>Data-Driven Recruitment</Header1>
              <Div>
                <Span onClick={this.openRecruitInfoModal}>Learn more</Span>
              </Div>
              <img src="/images/woman1.png" alt="woman1.png" />
              <img src="/images/man1.png" alt="man1.png" />
              <img src="/images/woman2.png" alt="woman2.png" />
            </Container>
          </Container>
        </StyledContainerTop>

        <StyledContainerBottom>
          <Container fluid>
            <Container textAlign="center" style={paddingYLarge}>
              <Header2 style={textCyan}>Internship and part time jobs</Header2>
              <Header1>
                Find the best opportunities that matches your schedule
              </Header1>
              <Div>
                <Span style={textCyan} onClick={this.openInternInfoModal}>
                  Learn more
                </Span>
              </Div>
              <img src="/images/students_image.png" alt="students_image.png" />
            </Container>
          </Container>
        </StyledContainerBottom>

        {openModal === 1 && <LearnMoreRecruitment close={this.closeModal} />}
        {openModal === 2 && <LearnMoreInternship close={this.closeModal} />}
      </div>
    );
  }
}

export default WelcomePage;
